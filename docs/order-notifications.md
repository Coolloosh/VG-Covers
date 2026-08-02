# Order Notifications

This site sends merch fulfillment notifications from the Stripe webhook at:

```txt
/api/stripe-webhook
```

Configure the production webhook in Stripe:

```txt
https://YOUR_DOMAIN.com/api/stripe-webhook
```

Listen for this event:

```txt
checkout.session.completed
```

## Required Environment Variables

Stripe:

```txt
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

Optional email notification via Resend:

```txt
RESEND_API_KEY
ORDER_EMAIL_FROM
ORDER_NOTIFY_EMAIL=vanyllagodzylla@gmail.com
```

If `RESEND_API_KEY` or `ORDER_EMAIL_FROM` is missing, the webhook skips the custom email and still logs the order to Google Sheets.

Google Sheets order log:

```txt
GOOGLE_SHEETS_SPREADSHEET_ID
GOOGLE_SHEETS_ORDERS_RANGE=Orders!A:Z
GOOGLE_SHEETS_CLIENT_EMAIL
GOOGLE_SHEETS_PRIVATE_KEY
```

## Google Sheet Setup

Create a sheet tab named `Orders` with these columns:

```txt
Created At
Stripe Session
Payment Intent
Payment Status
Fulfillment
Customer Name
Customer Email
Customer Phone
Shipping Address
Items
Subtotal
Shipping
Total
Currency
```

Create a Google Cloud service account, generate a JSON key, then share the Google Sheet with the service account email as an editor.

Use the JSON key values for:

```txt
GOOGLE_SHEETS_CLIENT_EMAIL
GOOGLE_SHEETS_PRIVATE_KEY
```
