import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../../api/product";
import type { IProductCard } from "../../catalog/product/ProductCard.type";
import Layout from "../layout/Layout";
import s from "./Product.module.css";
import { useCartActions } from "../../../hooks/useCartAction";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<IProductCard | null>(null);
  const [product, setProduct] = useState<IProductCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewHistoryOpen, setIsViewHistoryOpen] = useState<boolean>(true);

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

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



  if (error) {
    return (
      <div className={s.errorContainer}>
        <h2> {error}</h2>
        <button className={s.retryButton} onClick={() => window.history.back()}>
          Вернуться назад
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <Layout title="Товар не найден">
        <div className={s.errorContainer}>
          <h2>Товар не найден</h2>
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
      title: "Оплата",
      content:
        "Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении",
    },
    {
      id: "installation",
      title: "Монтаж и доставка",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente esse rerum eum quo accusantium soluta animi reprehenderit ratione explicabo odit nihil sint beatae quae nostrum, totam, a ab at! Dignissimos.",
    },
    {
      id: "guarantee",
      title: "Гарантия и выгода",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sequi labore enim ullam, aut eligendi eum culpa consequatur beatae eos molestiae error quos excepturi quasi sint odit alias, cumque eveniet?",
    },
  ];

  return (
    <div>
      <div className={s.product_page_container}>
        <div className={s.product_info}>
          <img
            className={s.product_image}
            src={product.image}
            alt={product.title}
          />
          <div className={s.image_nev}>
            <img
              className={s.product_image_nev}
              src={product.image}
              alt="Миниатюра 1"
            />
            <img
              className={s.product_image_nev}
              src={product.image}
              alt="Миниатюра 2"
            />
            <img
              className={s.product_image_nev}
              src={product.image}
              alt="Миниатюра 3"
            />
            <img
              className={s.product_image_nev}
              src={product.image}
              alt="Миниатюра 4"
            />
          </div>
        </div>

        <div>
          <div>
            <h2 className={s.rating}>
              {product.rating.rate}
              <br />({product.rating.count})Отзывы
            </h2>
            <h1 className={s.title_name}>{product.title}</h1>
            <div className={s.installation}>
              Подходит для установки на:
              <br />
              <label className={s.checkbox_label}>
                <input type="checkbox" />
                <span className={s.wooden_door}>Деревянная дверь</span>
              </label>
              <label className={s.checkbox_label}>
                <input type="checkbox" />
                <span className={s.interior_door}>Межкомнатная дверь</span>
              </label>
            </div>
            <div className={s.product_filter}>
              <div className={s.product_complection}>
                Комплектация <br />
                <button className={s.product_complection_button}>
                  Smart замок без приложения <img alt="Off" />
                </button>
              </div>
              <div className={s.product_color}>
                Цвет <br />
                <button className={s.p_color_1}>
                  <img alt="Color 1" />
                </button>
                <button className={s.p_color_2}></button>
                <button className={s.p_color_3}></button>
              </div>
            </div>
            <div className={s.price}>{product.price}$</div>
            <div className={s.button_add}>
              <button className={s.purchase_button}>Купить</button>

              <button
                className={s.like_button}
                onClick={(e) => handleAddToBasket(e, product)}
              >
                <img className={s.like_img} alt="Like" />
                <p className={s.like_p}>В избранное</p>
              </button>
            </div>

            <div className={s.information}>
              {accordionSections.map((section) => (
                <div key={section.id} className={s.accordion_item}>
                  <button
                    onClick={() => handleAccordionToggle(section.id)}
                    className={`${s.accordion_button} ${activeAccordion === section.id ? s.accordion_button_active : ""}`}
                  >
                    {section.title}
                    <img
                      className={s.accordion_img}
                      alt={activeAccordion === section.id ? "On" : "Off"}
                    />
                  </button>
                  {activeAccordion === section.id && (
                    <div className={s.accordion_content}>
                      <p className={s.accordion_p}>{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
