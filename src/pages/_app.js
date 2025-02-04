import "../styles/globals.css"; // Подключение стилей
import Navbar from "../components/Navbar"; // Импортируем Navbar

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;