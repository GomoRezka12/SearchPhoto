import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(localStorage.getItem("token"));
  }, [router.pathname]); // Обновляем при каждом изменении маршрута

  return (
    <nav className="navbar">
      {user ? (
        <>
          <Link href="/search">Search</Link> | <Link href="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link href="/register">Register</Link> | <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
}