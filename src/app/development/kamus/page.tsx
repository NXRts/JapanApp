import { redirect } from "next/navigation";

export default function KamusDevelopmentPage() {
  redirect("/characters?tab=kamus");
}
