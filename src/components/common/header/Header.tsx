import { FaShoppingCart, FaHeart, FaPhone } from "react-icons/fa";
import logo from "../../../../public/image/Logo.png";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <section>
        <header className={s.header}>
          <div className={s.stock}>
            <p className={s.stock_p}>
              Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09{" "}
            </p>
            <a className={s.stock_a} href="#">
              Обратный звонок
            </a>
          </div>

          <div className={s.logo_container}>
            <div className={s.logo_img}>
              <Link to="/" className={s.nav_link}>
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <nav className={s.nav_menu}>
              <ul className={s.nav_list}>
                <li className={s.nav_item}>
                  <Link to="/" className={s.nav_link}>
                    Главная
                  </Link>
                </li>
                <li className={s.nav_item}>
                  <Link to="/catalog" className={s.nav_link}>
                    Каталог
                  </Link>
                </li>
                <li className={s.nav_item}>
                  <Link to="/wholesale" className={s.nav_link}>
                    Оптовая продажа
                  </Link>
                </li>
                <li className={s.nav_item}>
                  <Link to="/about" className={s.nav_link}>
                    О нас
                  </Link>
                </li>
              </ul>
            </nav>

            <div className={s.container_information}>
              <div className={s.information_number}>
                <FaPhone className={s.FaPhone} size={16} />
                <a href="tel:+79665588499">+7 (966) 55 88 499</a>
              </div>

              <div className={s.information_icon}>
                <Link
                  to="/favorites"
                  aria-label="Избранное"
                  className={s.icon_link}
                >
                  <FaHeart size={20} style={{ color: "black" }} />
                </Link>
                <Link to="/cart" aria-label="Корзина" className={s.icon_link}>
                  <FaShoppingCart size={20} style={{ color: "black" }} />
                  <span className={s.cart_count}>0</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
};
export default Header;
