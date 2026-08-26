import { NextResponse } from "next/server";
import webPush from "@/lib/vapid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, url, subscription } = body;

    const payload = JSON.stringify({
      title: title || "JapanApp",
      body: message || "Waktunya Latihan Kana & Kanji!",
      url: url || "/practice",
      tag: `japanapp_push_${Date.now()}`,
    });

    if (subscription) {
      await webPush.sendNotification(subscription, payload);
      return NextResponse.json({ success: true, message: "Push sent to single subscription" });
    }

    // Otherwise fetch saved subscriptions from /api/push/subscribe
    const origin = new URL(request.url).origin;
    const subRes = await fetch(`${origin}/api/push/subscribe`, { cache: "no-store" });
    const subData = await subRes.json();

    if (!subData.subscriptions || subData.subscriptions.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No active push subscriptions found",
      });
    }

    const results = await Promise.allSettled(
      subData.subscriptions.map((sub: any) =>
        webPush.sendNotification(sub, payload)
      )
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;

    return NextResponse.json({
      success: true,
      sentCount: successful,
      totalCount: subData.subscriptions.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to send push notification" },
      { status: 500 }
    );
  }
}
