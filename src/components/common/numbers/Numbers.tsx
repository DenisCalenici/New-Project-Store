import s from "./Numbers.module.css";
const Numbers = () => {
  return (
    <div className={s.number_container}>
      <ol className={s.number_body}>
        <li className={s.number_item1}>
          <td>5,567</td>
          <p>Счастливых клиентов</p>
        </li>
        <li className={s.number_item2}>
          <td>1245</td>
          <p>Продуктов на выбор</p>
        </li>
        <li className={s.number_item3}>
          <td>372</td>
          <p>Продаж в день</p>
        </li>
        <li className={s.number_item4}>
          <td>20</td>
          <p>Лет на рынке</p>
        </li>
      </ol>
    </div>
  );
};

export default Numbers;
