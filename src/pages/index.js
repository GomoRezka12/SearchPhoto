import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";

export default function Home() {
  const [images, setImages] = useState([]);

  const fetchImages = async (query) => {
    console.log("API Key:", process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY);
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, per_page: 12 },
        headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            "Accept-Version": "v1",
          }
      });
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="container">
      <h1>Image Search</h1>
      <SearchBar onSearch={fetchImages} />
      <ImageGrid images={images} />
    </div>
  );
}