import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const plans = await stripe.prices.list();

  return NextResponse.json(plans.data, { status: 200 });
}
