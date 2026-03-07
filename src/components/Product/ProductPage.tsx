import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../api/product";
import type { IProductCard } from "../../hooks/useProductFilter";
import Layout from "../Layout/Layout";
import s from "./ProductPage.module.css";
import { useCartActions } from "../../hooks/useCartAction";
import PopularProduct from "../common/popularProduct/PopularProduct";
import Ceo from "../common/ceo/Ceo";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { handleAddToBasket } = useCartActions();

  const addToBasket = (product: IProductCard) => {
    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
    } as React.MouseEvent<HTMLButtonElement>;

    handleAddToBasket(mockEvent, product);
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const productData = await fetchProductById(Number(id));
          if (productData) {
            setProduct(productData);
            setSelectedImage(productData.image);
          } else {
            setError("Товар не найден.");
          }
        } catch {
          setError("Ошибка при загрузке товара.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Загрузка...">
        <div className={s.loading_container}>
          <div className={s.loading_spinner}></div>
          <p>Загружаем информацию о товаре...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Ошибка">
        <div className={s.errorContainer}>
          <h2>⚠️ {error}</h2>
          <button
            className={s.retryButton}
            onClick={() => window.history.back()}
          >
            Вернуться назад
          </button>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Товар не найден">
        <div className={s.errorContainer}>
          <h2>🔍 Товар не найден</h2>
          <button
            className={s.retryButton}
            onClick={() => window.history.back()}
          >
            Вернуться к каталогу
          </button>
        </div>
      </Layout>
    );
  }

  const handleAccordionToggle = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };



  const accordionSections = [
    {
      id: "payment",
      title: "💳 Оплата",
      content:
        "Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении",
    },
    {
      id: "installation",
      title: "🚚 Монтаж и доставка",
      content:
        "Бесплатная доставка по городу при заказе от 5000₽. Стоимость доставки за пределы города - 500₽. Профессиональная установка - 1500₽. Выезд мастера в течение 24 часов после получения заказа.",
    },
    {
      id: "guarantee",
      title: "🛡️ Гарантия и выгода",
      content:
        "Гарантия на товар - 1 год. Обмен и возврат в течение 14 дней. При покупке комплекта замок + установка - скидка 10%. На все замки распространяется гарантия производителя.",
    },
  ];

  return (
    <Layout title={product.title}>
      <div className={s.product_page}>
        <div className={s.product_page_container}>
          <div className={s.product_images}>
            <div className={s.product_info}>
              <img
                className={s.product_main_image}
                src={selectedImage}
                alt={product.title}
              />
            </div>
          </div>

          <div className={s.product_details}>
            <div className={s.rating_block}>
              <div className={s.rating_stars}>
                {"★".repeat(Math.round(product.rating?.rate || 0))}
                {"☆".repeat(5 - Math.round(product.rating?.rate || 0))}
              </div>
              <span className={s.rating_text}>
                {product.rating?.rate || 0} / 5
              </span>
              <span className={s.reviews_count}>
                ({product.rating?.count || 0} отзывов)
              </span>
            </div>

            <h1 className={s.product_title}>{product.title}</h1>

            <div className={s.product_category}>
              Категория: <span>{product.category}</span>
            </div>

            <div className={s.availability}>
              <span className={s.availability_dot}>●</span>
              <span className={s.availability_text}>В наличии</span>
            </div>

            <div className={s.installation_options}>
              <h3 className={s.installation_title}>
                Подходит для установки на:
              </h3>
              <div className={s.checkbox_group}>
                <label className={s.checkbox_label}>
                  <input type="checkbox" />
                  <span>Деревянная дверь</span>
                </label>
                <label className={s.checkbox_label}>
                  <input type="checkbox" />
                  <span>Металлическая дверь</span>
                </label>
                <label className={s.checkbox_label}>
                  <input type="checkbox" />
                  <span>Межкомнатная дверь</span>
                </label>
              </div>
            </div>

            <div className={s.complection}>
              <h3 className={s.complection_title}>Комплектация:</h3>
              <div className={s.complection_options}>
                <button
                  className={`${s.complection_button} ${s.complection_active}`}
                >
                  Smart замок без приложения
                </button>
                <button className={s.complection_button}>
                  Smart замок с приложением +1000₽
                </button>
                <button className={s.complection_button}>
                  Комплект с Wi-Fi модулем +2000₽
                </button>
              </div>
            </div>

            <div className={s.price_section}>
              <div className={s.current_price}>{product.price} ₽</div>
              <div className={s.old_price}>
                {Math.round(product.price * 1.3)} ₽
              </div>
              <div className={s.discount_badge}>-30%</div>
            </div>

            <div className={s.action_buttons}>
              <button className={s.buy_button}>Купить сейчас</button>
              <button
                className={s.cart_button}
                onClick={() => addToBasket(product)}
              >
                В корзину
              </button>
              <button className={s.favorite_button}>♡ В избранное</button>
            </div>

            <div className={s.accordion_section}>
              {accordionSections.map((section) => (
                <div key={section.id} className={s.accordion_item}>
                  <button
                    onClick={() => handleAccordionToggle(section.id)}
                    className={`${s.accordion_button} ${activeAccordion === section.id ? s.accordion_button_active : ""}`}
                  >
                    <span className={s.accordion_title}>{section.title}</span>
                    <span className={s.accordion_icon}>
                      {activeAccordion === section.id ? "−" : "+"}
                    </span>
                  </button>
                  {activeAccordion === section.id && (
                    <div className={s.accordion_content}>
                      <p className={s.accordion_text}>{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.additional_blocks}></div>
      </div>
      <PopularProduct/>
      <Ceo/>
    </Layout>
  );
};

export default ProductPage;