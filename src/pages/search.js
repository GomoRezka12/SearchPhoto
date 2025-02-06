import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";

export default function SearchPage() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.email) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const fetchImages = async (query) => {
    try {
        console.log("📡 Отправляем запрос на сервер:", `/api/search?query=${query}`);
        
        const response = await axios.get(`/api/search`, { params: { query } });

        console.log("✅ Получены данные:", response.data);
        
        setImages(response.data.results);
    } catch (error) {
        console.error("❌ Ошибка при получении изображений:", error);
    }
};

  return (
    <div className="container">
      <h1>Image Search</h1>
      {user ? <p>Welcome, {user.email}!</p> : <p>Loading user...</p>}
      <SearchBar onSearch={fetchImages} />
      <ImageGrid images={images} />
    </div>
  );
}
