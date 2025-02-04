import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      router.push("/search");
    } else {
      router.push("/register");
    }
  }, [router.isReady]);

  return null;
}
