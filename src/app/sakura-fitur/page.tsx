"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SakuraFiturRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/development");
  }, [router]);

  return null;
}
