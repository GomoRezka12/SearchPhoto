import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      router.push("/search");
    } catch ({ response }) {
      setErrorMessage(
        response?.data?.message === "Invalid credentials"
          ? ["Ошибка пароля", "Пароль не верный"][Math.floor(Math.random() * 2)]
          : "Ошибка входа. Попробуйте снова."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {["email", "password"].map((field) => (
          <input
            key={field}
            type={field}
            name={field}
            placeholder={field === "email" ? "Email" : "Пароль"}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
