"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudyHubRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/practice");
  }, [router]);

  return null;
}
