import imgReturn from "../../../../public/image/product-return 1.png";
import evaluate from "../../../../public/image/evaluate 1.png";
import s from "./WhyChooseUs.module.css";
const WhyChooseUs = () => {
  return (
    <>
      <h1 className={s.WhyChooseUs_h1}>Почему GoldenService? </h1>
      <div className={s.WhyChooseUs_container}>
        <div className={s.WhyChooseUs_body}>
          <div className={s.WhyChooseUs_item}>
            <img src={imgReturn} alt="imgReturn" />
            <p>Возврат удвоенной стоимости каждого замка в случае брака. </p>
          </div>
          <div className={s.WhyChooseUs_item}>
            <img src={evaluate} alt="evaluate" />
            <p>Наносим ваш логотип компании на наш продукт</p>
          </div>
          <div className={s.WhyChooseUs_item}>
            <img src={imgReturn} alt="imgReturn" />
            <p>Возврат удвоенной стоимости каждого замка в случае брака. </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default WhyChooseUs;
