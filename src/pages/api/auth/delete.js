import prisma from "../../../lib/prisma"; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Не указан email" });
  }

  try {
    // Проверяем, существует ли пользователь
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Удаляем пользователя
    await prisma.user.delete({
      where: { email },
    });

    return res.status(200).json({ message: "Пользователь успешно удалён" });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
