import { FaShoppingCart, FaHeart, FaPhone } from "react-icons/fa";
import logo from "../../../../public/image/Logo.png";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <header className={s.header}>
      {/* Затемняющий оверлей */}
      {isMenuOpen && (
        <div
          className={`${s.menu_overlay} ${isMenuOpen ? s.open : ""}`}
          onClick={closeMenu}
        />
      )}

      <div className={s.stock}>
        <p className={s.stock_p}>
          Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09
        </p>
        <a className={s.stock_a} href="#">
          Обратный звонок
        </a>
      </div>

      <div className={s.logo_container}>
        {/* Бургер-меню слева */}
        <div className={s.burger_menu} onClick={toggleMenu}>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
        </div>

        {/* Логотип по центру */}
        <div className={s.logo_img}>
          <Link to="/" className={s.nav_link} onClick={closeMenu}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Десктопное меню */}
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

        {/* Контейнер с иконками справа */}
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
              <FaHeart size={20} />
            </Link>
            <Link to="/cart" aria-label="Корзина" className={s.icon_link}>
              <FaShoppingCart size={20} />
              <span className={s.cart_count}>0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`${s.mobile_menu} ${isMenuOpen ? s.open : ""}`}>
        <ul className={s.mobile_nav_list}>
          <li className={s.mobile_nav_item}>
            <Link to="/" className={s.mobile_nav_link} onClick={closeMenu}>
              Главная
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link
              to="/catalog"
              className={s.mobile_nav_link}
              onClick={closeMenu}
            >
              Каталог
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link
              to="/wholesale"
              className={s.mobile_nav_link}
              onClick={closeMenu}
            >
              Оптовая продажа
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link to="/about" className={s.mobile_nav_link} onClick={closeMenu}>
              О нас
            </Link>
          </li>
        </ul>

        <div className={s.mobile_contacts}>
          <div className={s.mobile_phone}>
            <FaPhone size={18} />
            <a href="tel:+79665588499" onClick={closeMenu}>
              +7 (966) 55 88 499
            </a>
          </div>

          <div className={s.mobile_icons}>
            <Link
              to="/favorites"
              aria-label="Избранное"
              className={s.icon_link}
              onClick={closeMenu}
            >
              <FaHeart size={24} />
            </Link>
            <Link
              to="/cart"
              aria-label="Корзина"
              className={s.icon_link}
              onClick={closeMenu}
            >
              <FaShoppingCart size={24} />
              <span className={s.cart_count}>0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
