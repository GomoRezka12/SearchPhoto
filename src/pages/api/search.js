export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Метод не разрешен" });
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Поисковый запрос обязателен" });
    }

    try {
        console.log("🔍 Запрос к Unsplash с query:", query);

        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;

        console.log("📡 URL запроса к Unsplash:", unsplashUrl);

        const response = await fetch(unsplashUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Ошибка Unsplash:", response.status, errorText);
            return res.status(response.status).json({ error: `Ошибка Unsplash: ${response.status}`, details: errorText });
        }

        const data = await response.json();
        console.log("✅ Данные получены от Unsplash:", data);

        return res.status(200).json(data);
    } catch (error) {
        console.error("❌ Ошибка сервера:", error);
        return res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
}
