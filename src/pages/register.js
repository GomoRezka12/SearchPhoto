import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для ошибки
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Очищаем ошибку перед запросом

    try {
      const response = await axios.post("/api/auth/register", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({ email: response.data.email }));
        router.push("/search");
      }
    } catch (error) {
      if (error.response?.data?.error === "User already exists") {
        // Выбираем случайное сообщение
        const messages = ["Почта занята", "Почта используется"];
        setErrorMessage(messages[Math.floor(Math.random() * messages.length)]);
      } else {
        setErrorMessage("Ошибка регистрации. Попробуйте снова.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Блок ошибки */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
