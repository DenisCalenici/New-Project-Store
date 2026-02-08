import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import s from "./Layout.module.css";
interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <nav className={s.nav_link}>
        <ul style={{ display: "flex", padding: "0px" }}>
          <li className={s.li_layout}>
            <Link className={s.link_layout} to="/">
              Главная
            </Link>
          </li>
          /
          <li className={s.li_layout}>
            <Link className={s.link_layout} to="/catalog">
              Каталог
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
