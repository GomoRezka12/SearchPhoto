import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({ old: "", new: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    storedUser ? setUser(JSON.parse(storedUser)) : router.push("/login");
  }, [router]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError({ old: "", new: "" });
    if (!user || oldPassword === newPassword) return setError({ new: "Новый пароль не должен совпадать со старым" });
    
    try {
      await axios.post("/api/auth/change-password", { email: user.email, oldPassword, newPassword });
      alert("Пароль успешно изменен!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError({ old: err.response?.data?.error === "Incorrect old password" ? "Старый пароль не верный" : "Ошибка при смене пароля" });
    }
  };

  const handleDeleteAccount = async () => {
    if (user && confirm("Вы уверены, что хотите удалить аккаунт?")) {
      try {
        await axios.post("/api/auth/delete", { email: user.email });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Аккаунт успешно удалён!");
        router.push("/");
      } catch {
        alert("Не удалось удалить аккаунт. Попробуйте снова.");
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {user && <p>Email: {user.email}</p>}
      <h3>Смена пароля</h3>
      <form onSubmit={handleChangePassword}>
        {error.old && <p className="error-message">{error.old}</p>}
        <input type="password" placeholder="Старый пароль" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        {error.new && <p className="error-message">{error.new}</p>}
        <input type="password" placeholder="Новый пароль" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button type="submit">Сменить пароль</button>
      </form>
      <button onClick={() => (localStorage.clear(), setUser(null), router.push("/"))}>Выйти</button>
      <button onClick={handleDeleteAccount} className="delete-button">Удалить аккаунт</button>
    </div>
  );
}
