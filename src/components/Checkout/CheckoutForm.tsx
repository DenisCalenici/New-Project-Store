import s from "./CheckoutForm.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { IProductCard } from "../catalog/product/ProductCard.type";
import { fetchProductById } from "../../api/product";
import Layout from "../Layout/Layout";
interface CheckoutFormProps {
  surname: string;
  name: string;
  email: string;
  delivery: string;
  payment: string;
  software: string;
  phone?: number | null;
}

const CheckoutForm = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<IProductCard | null>(null);
  const [product, setProduct] = useState<IProductCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState<CheckoutFormProps>({
    surname: "",
    name: "",
    email: "",
    delivery: "",
    payment: "",
    software: "",
    phone: null,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = () => {
    console.log("data", formState);
  };

  useEffect(() => {
    const loadCheckoutForm = async () => {
      if (id) {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const productData = await fetchProductById(Number(id));
          if (productData) {
            setProduct(productData);
          }
        } catch {
          setError("Ошибка при загрузке.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadCheckoutForm();
  }, [id]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return (
      <div className={s.errorContainer}>
        <h2>😕 {error}</h2>
        <button className={s.retryButton} onClick={() => window.history.back()}>
          Вернуться назад
        </button>
      </div>
    );
  }
  return (
    <Layout>
      <div className={s.body_form_container}>
        <div className={s.name_form_body}>
          <h1 className={s.name_form_h1}>Оформление заказа </h1>
          <div className={s.name_form_body_container}>
            <h2 className={s.name_form_2}>1. Контактные данные</h2>
            <form className={s.form_container}>
              <div className={s.input_container}>
                <h2 className={s.name_form}>Фамилия</h2>
                <input
                  className={s.input_form}
                  type="text"
                  placeholder="Фамилия"
                  name="surname"
                  value={formState.surname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h2 className={s.name_form}>Имя</h2>
                <input
                  className={s.input_form}
                  type="text"
                  placeholder="Имя"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h2 className={s.name_form}>Телефон</h2>
                <input
                  className={s.input_form}
                  type="phone"
                  placeholder="+7 (___) ___ __ __"
                  name="phone"
                  value={formState.phone || undefined}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h2 className={s.name_form}> E-mail</h2>
                <input
                  className={s.input_form}
                  type="email"
                  placeholder="example@mail.ru"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
        <div className={s.name_form_body}></div>
      </div>
    </Layout>
  );
};
export default CheckoutForm;
