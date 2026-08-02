import crypto from 'crypto';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DEFAULT_SHEETS_RANGE = 'Orders!A:Z';
const DEFAULT_NOTIFY_EMAIL = 'vanyllagodzylla@gmail.com';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function readRawBody(req) {
  // Stripe signature verification needs the exact incoming payload.
  // Do not read Vercel's req.body helper here; it parses/mutates JSON.
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function formatMoney(amount, currency = 'usd') {
  if (typeof amount !== 'number') return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function normalizeAddress(address = {}) {
  return [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postal_code,
    address.country,
  ].filter(Boolean).join(', ');
}

function buildOrderSummary(session, lineItems) {
  const customer = session.customer_details || {};
  const shipping = session.shipping_details || {};
  const currency = session.currency || 'usd';
  const items = lineItems.data.map((lineItem) => {
    const product = lineItem.price?.product;
    const metadata = typeof product === 'object' ? product.metadata || {} : {};
    const details = [
      metadata.size ? `Size: ${metadata.size}` : '',
      metadata.color ? `Color: ${metadata.color}` : '',
    ].filter(Boolean);

    return {
      name: lineItem.description || 'Merch item',
      quantity: lineItem.quantity || 1,
      unitAmount: lineItem.price?.unit_amount || null,
      total: lineItem.amount_total || null,
      size: metadata.size || '',
      color: metadata.color || '',
      details: details.join(' | '),
    };
  });

    return {
    sessionId: session.id,
    paymentIntent: typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || '',
    paymentStatus: session.payment_status || '',
    mode: session.metadata?.pickup === 'true' ? 'Pickup' : 'Shipping',
    createdAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    customerName: customer.name || shipping.name || '',
    customerEmail: customer.email || '',
    customerPhone: customer.phone || '',
    shippingAddress: normalizeAddress(shipping.address || customer.address),
    subtotal: formatMoney(session.amount_subtotal, currency),
    shippingCost: formatMoney(session.total_details?.amount_shipping || 0, currency),
    total: formatMoney(session.amount_total, currency),
    currency: currency.toUpperCase(),
    items,
  };
}

function orderText(order) {
  const itemLines = order.items.map((item) => {
    const detailText = item.details ? ` (${item.details})` : '';
    return `- ${item.quantity}x ${item.name}${detailText} - ${formatMoney(item.total, order.currency)}`;
  }).join('\n');

  return [
    'New Vanylla Godzylla merch order',
    '',
    `Customer: ${order.customerName || 'Unknown'}`,
    `Email: ${order.customerEmail || 'Unknown'}`,
    `Phone: ${order.customerPhone || 'Not provided'}`,
    `Fulfillment: ${order.mode}`,
    `Shipping address: ${order.shippingAddress || 'Not provided'}`,
    '',
    'Items:',
    itemLines,
    '',
    `Subtotal: ${order.subtotal}`,
    `Shipping: ${order.shippingCost}`,
    `Total: ${order.total}`,
    '',
    `Stripe session: ${order.sessionId}`,
    `Payment intent: ${order.paymentIntent}`,
  ].join('\n');
}

function orderHtml(order) {
  const rows = order.items.map((item) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(item.name)}</td>
      <td style="padding:8px;border-bottom:1px solid #ddd;">${item.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(item.size)}</td>
      <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(item.color)}</td>
      <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(formatMoney(item.total, order.currency))}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
      <h1 style="margin:0 0 16px;">New merch order</h1>
      <p><strong>Customer:</strong> ${escapeHtml(order.customerName || 'Unknown')}</p>
      <p><strong>Email:</strong> ${escapeHtml(order.customerEmail || 'Unknown')}</p>
      <p><strong>Phone:</strong> ${escapeHtml(order.customerPhone || 'Not provided')}</p>
      <p><strong>Fulfillment:</strong> ${escapeHtml(order.mode)}</p>
      <p><strong>Shipping address:</strong> ${escapeHtml(order.shippingAddress || 'Not provided')}</p>
      <table style="border-collapse:collapse;width:100%;margin:20px 0;">
        <thead>
          <tr>
            <th align="left" style="padding:8px;border-bottom:2px solid #111;">Item</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #111;">Qty</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #111;">Size</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #111;">Color</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #111;">Total</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${escapeHtml(order.subtotal)}</p>
      <p><strong>Shipping:</strong> ${escapeHtml(order.shippingCost)}</p>
      <p><strong>Total:</strong> ${escapeHtml(order.total)}</p>
      <p><strong>Stripe session:</strong> ${escapeHtml(order.sessionId)}</p>
      <p><strong>Payment intent:</strong> ${escapeHtml(order.paymentIntent)}</p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendOrderEmail(order) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn('Skipping order email: RESEND_API_KEY or ORDER_EMAIL_FROM is not configured.');
    return;
  }

  const to = process.env.ORDER_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New merch order: ${order.total} from ${order.customerName || 'customer'}`,
      text: orderText(order),
      html: orderHtml(order),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${body}`);
  }
}

function base64Url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getGoogleAccessToken() {
  const clientEmail = requireEnv('GOOGLE_SHEETS_CLIENT_EMAIL');
  const privateKey = requireEnv('GOOGLE_SHEETS_PRIVATE_KEY').replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsignedToken = `${header}.${payload}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .end()
    .sign(privateKey)
    .toString('base64url');

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsignedToken}.${signature}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google auth failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function appendOrderToSheet(order) {
  const spreadsheetId = requireEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
  const range = process.env.GOOGLE_SHEETS_ORDERS_RANGE || DEFAULT_SHEETS_RANGE;
  const accessToken = await getGoogleAccessToken();
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append`);
  url.searchParams.set('valueInputOption', 'USER_ENTERED');
  url.searchParams.set('insertDataOption', 'INSERT_ROWS');

  const itemsSummary = order.items.map((item) => {
    const details = [item.size, item.color].filter(Boolean).join('/');
    return `${item.quantity}x ${item.name}${details ? ` (${details})` : ''}`;
  }).join('; ');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [[
        order.createdAt,
        order.sessionId,
        order.paymentIntent,
        order.paymentStatus,
        order.mode,
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.shippingAddress,
        itemsSummary,
        order.subtotal,
        order.shippingCost,
        order.total,
        order.currency,
      ]],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Sheets append failed: ${response.status} ${body}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ error: 'Missing Stripe signature' });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      requireEnv('STRIPE_WEBHOOK_SECRET')
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: event.type });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: [],
    });
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ['data.price.product'],
    });
    const order = buildOrderSummary(session, lineItems);

    await appendOrderToSheet(order);
    await sendOrderEmail(order);

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Order notification failed:', error);
    return res.status(500).json({
      error: 'Order notification failed',
      detail: error.message,
    });
  }
}
