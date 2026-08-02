// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { cartItems, pickup } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid' });
    }

    const line_items = cartItems.map((item) => {
      const descriptionParts = [
        item.size ? `Size: ${item.size}` : '',
        item.color ? `Color: ${item.color}` : '',
      ].filter(Boolean);
      const description = descriptionParts.length ? descriptionParts.join(' | ') : undefined;
    
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [`https://vanyllagodzylla.com${item.image}`],
            ...(description && { description }),
            metadata: {
              ...(item.size && { size: item.size }),
              ...(item.color && { color: item.color }),
            }
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      };
    });
    

    const sessionConfig = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        pickup: pickup ? 'true' : 'false',
      },
    };

    if (!pickup) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['US'],
      };
      sessionConfig.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 500, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: 'Stripe session failed' });
  }
}
