import s from './RequestCall.module.css';
const RequestCall = () => {
  return (
  <div className={s.callback}>
  <h1 className={s.callback_title}>Мы Вам перезвоним</h1>
  <h3 className={s.callback_subtitle}>
    Если у вас возникли какие-то вопросы или проблемы, заполните форму и мы
    Вам перезвоним.
  </h3>
  <form className={s.callback_form}>
    <input 
      type="text" 
      placeholder="Ваше имя" 
      className={s.callback_input}
    />
    <input 
      type="email" 
      placeholder="Ваше Email" 
      className={s.callback_input}
    />
    <button className={s.callback_button}>Отправить</button>
  </form>
</div>
  );
};
export default RequestCall;
