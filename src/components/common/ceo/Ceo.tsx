import s from "./Ceo.module.css";
import castle from "../../../../public/image/замок.png";
import castle_2 from "../../../../public/image/замок2.png";
const Ceo = () => {
  return (
    <div className={s.seo_container}>
      <div className={s.seo_body}>
        <div className={s.seo_block}>
          <div className={s.seo_informants}>
            <h1 className={s.seo_block_h1}>
              Eget quis quam metus, scelerisque.
            </h1>
            <p className={s.seo_block_p}>
              Odio felis sit leo, massa, mauris, at pulvinar ultrices. Eu
              porttitor molestie massa porttitor. Quisque at turpis ut proin eu
              et magna etiam rhoncus.
            </p>
         <form className={s.seo_block_form} action="">
              <div>
                <input type="checkbox" id="option1" />
                <label htmlFor="option1">Межкомнатую дверь</label>
              </div>
              <div>
                <input type="checkbox" id="option2" />
                <label htmlFor="option2">Межкомнатую дверь</label>
              </div>
              <div>
                <input type="checkbox" id="option3" />
                <label htmlFor="option3">Деревянную дверь</label>
              </div>
              <div>
                <input type="checkbox" id="option4" />
                <label htmlFor="option4">Деревянную дверь</label>
              </div>
            </form>
            <p className={s.seo_block_p}>
              Ac risus neque pulvinar tincidunt est. Tristique imperdiet viverra
              interdum in leo. Nullam ullamcorper id enim fermentum integer
              praesent bibendum. In ullamcorper purus scelerisque malesuada et
              egestas. Ac dictumst mauris sed facilisis.
            </p>
          </div>
        </div>

        <img className={s.seo_block} src={castle} alt="castle" />

        <img className={s.seo_block} src={castle_2} alt="castle_2" />

        <div className={s.seo_block}>
         
          <div className={s.seo_informants}>
            <h1 className={s.seo_block_h1}>
              Eget quis quam metus, scelerisque.
            </h1>
            <p className={s.seo_block_p}>
              Odio felis sit leo, massa, mauris, at pulvinar ultrices. Eu
              porttitor molestie massa porttitor. Quisque at turpis ut proin eu
              et magna etiam rhoncus.
            </p>
            <p className={s.seo_block_p}>
              Ac risus neque pulvinar tincidunt est. Tristique imperdiet viverra
              interdum in leo. Nullam ullamcorper id enim fermentum integer
              praesent bibendum. In ullamcorper purus scelerisque malesuada et
              egestas. Ac dictumst mauris sed facilisis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ceo;
