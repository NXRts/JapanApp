import { NextResponse } from "next/server";

// Memory storage for push subscriptions
const subscriptions = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription object" },
        { status: 400 }
      );
    }

    subscriptions.set(subscription.endpoint, subscription);

    return NextResponse.json({
      success: true,
      message: "Push subscription saved successfully",
      count: subscriptions.size,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save subscription" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: subscriptions.size,
    subscriptions: Array.from(subscriptions.values()),
  });
}
