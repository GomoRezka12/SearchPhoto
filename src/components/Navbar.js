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
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Image Search</h1>
        <nav className="nav-links">
          {user ? (
            <>
              <Link href="/search">Поиск</Link>
              <Link href="/profile">Профиль</Link>
            </>
          ) : (
            <>
              <Link href="/register">Регистрация</Link>
              <Link href="/login">Логин</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
