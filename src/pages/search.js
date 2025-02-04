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
    if (typeof window === "undefined") return; // Предотвращаем ошибку на сервере
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
        localStorage.removeItem("user"); // Удаляем некорректные данные
        router.push("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Удаляем поврежденные данные
      router.push("/login");
    }
  }, [router]);

  const fetchImages = async (query) => {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ""}`,
          "Accept-Version": "v1",
        },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
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
