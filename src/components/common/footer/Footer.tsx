import s from "./Footer.module.css";
import logoF from "../../../../public//image/LogoF.png";
import facebook from "../../../../public/image/facebook.png";
import twitter from "../../../../public/image/twitter.png";
import vk from "../../../../public/image/vk.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.footer_container}>
        <div className={s.footer_logo}>
          <div className={s.footer_logo_logo}>
            <img src={logoF} alt="Golden Soft logo" />
          </div>
          <div className={s.footer_logo_icon}>
            <img src={vk} alt="VK" title="VK" />
            <img src={twitter} alt="Twitter" title="Twitter" />
            <img src={facebook} alt="Facebook" title="Facebook" />
          </div>
        </div>

        <div className={s.footer_body}>
          <div className={s.footer_information_1}>
            <h3>Навигация</h3>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/wholesale">Оптовая продажа</Link>
              </li>
              <li>
                <Link to="/about">О нас</Link>
              </li>
            </ul>
          </div>

          <div className={s.footer_information_2}>
            <h3>Наши контакты</h3>
            <ul>
              <h4>Телефоны</h4>
              <li>
                <a href="tel:+79885650038">+7 (988) 565 00 38</a>
              </li>
              <li>
                <a href="tel:+375336628256">+375 33 662 82 56</a>
              </li>
              <h4>Email</h4>
              <li>
                <a href="mailto:vladpertcev@mail.ru">vladpertcev@mail.ru</a>
              </li>
              <li>
                <a href="mailto:korobko416@gmail.com">korobko416@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className={s.footer_information_3}>
            <h3>Наш адрес</h3>
            <ul>
              <li>Россия, Ростов-на-Дону<br />ул. Богачева, 16</li>
            </ul>
          </div>

          <div className={s.footer_information_4}>
            <h3>Информация</h3>
            <ul>
              <li>Доставка и оплата</li>
              <li>Гарантии</li>
              <li>Возврат товара</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={s.footer_text}>
        © {currentYear} Golden Soft All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;