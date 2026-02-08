import s from "./Footer.module.css";
 import logoF from "../../../../public//image/LogoF.png";
 import facebook from "../../../../public/image/facebook.png";
 import twitter from "../../../../public/image/twitter.png";
 import vk from "../../../../public/image/vk.png";
import { Link } from "react-router-dom";
const  Footer=()=> {
  return (
    <footer className={s.footer}>
      <div className={s.footer_container}>
        <div className={s.footer_logo}>
          <div className={s.footer_logo_logo}>
            <img src={logoF} alt="logo" />
          </div>
          <div className={s.footer_logo_icon}>
            <img src={vk} alt="vk" />
            <img src={twitter} alt="twitter" />
            <img src={facebook} alt="facebook" />
          </div>
        </div>
        <div className={s.footer_body}>
          <div className={s.footer_information_1}>
            <h3>Навигация</h3>
            
             <ul >
                <li >
                  <Link to="/" >
                    Главная
                  </Link>
                </li>
                <li >
                  <Link to="/catalog">
                    Каталог
                  </Link>
                </li>
                <li >
                  <Link to="/wholesale" >
                    Оптовая продажа
                  </Link>
                </li>
                <li >
                  <Link to="/about">
                    О нас
                  </Link>
                </li>
              </ul>
          </div>
          <div className={s.footer_information_2}>
            <h3>Наши контакты</h3>
            <ul>
              <h4>Телефоны</h4>
              <li>+7 (988) 565 00 38</li>
              <li>+375 33 662 82 56</li>
              <h4>Email</h4>
              <li>vladpertcev@mail.ru</li>
              <li>korobko416@gmail.com</li>
            </ul>
          </div>
          <div className={s.footer_information_3}>
            <h3>Наш адрес</h3>
            <ul>
              <li>Россия, Ростов-на-Дону ул. Богачева, 16</li>
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
        © 2021 Golden Soft All rights reserved.
      </div>
    </footer>
  );
}
export default Footer