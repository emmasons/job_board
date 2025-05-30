// lib/paypal.ts

import paypal from "@paypal/checkout-server-sdk";

// (for Sandbox) const environment = new paypal.core.SandboxEnvironment(
const environment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(environment);

export { client };
