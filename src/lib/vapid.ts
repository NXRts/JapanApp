import webPush from "web-push";

export const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  "BIVSA8NnL4fsEBBNUrAgwqk569vaAH_34j80Y_L_T8UoDsBn4mOKzv3ZIc9YB05uesHZ16H24YYkhoGWiEruJaM";

export const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ||
  "JNUwr5afBV1Y5rpqMAIrT4NotY03c3tq9JMDRcx9ibk";

try {
  webPush.setVapidDetails(
    "mailto:support@japanapp.com",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
} catch (e) {
  console.error("VAPID setup error", e);
}

export default webPush;
