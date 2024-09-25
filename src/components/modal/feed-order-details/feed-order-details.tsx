import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./feed-order-details.module.css";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { useLocation } from "react-router-dom";

const FeedOrderDetails = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // const getFeedModalWindowState = useAppSelector(
  //   feedSelectors.getFeedModalWindowState
  // );

  return (
    <div className={cl.page_id} style={{ paddingTop: true ? "0" : "120px" }}>
      <p className={`text text_type_digits-default ${cl.order_num}`}>#034533</p>

      <p className={`text text_type_main-medium ${cl.title}`}>
        Black Hole Singularity острый бургер
      </p>

      <p className={`text text_type_main-small ${cl.text__done}`}>Выполнен</p>

      <p className={`text text_type_main-medium ${cl.text__composition}`}>
        Состав:
      </p>

      <div className={cl.composition_wrapper}>
        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={cl.composition__card}>
          <img
            src="https://code.s3.yandex.net/react/code/meat-01-mobile.png"
            alt=""
          />
          <p className={`text text_type_main-default ${cl.card__title}`}>
            Флюоресцентная булка R2-D3111
          </p>

          <div className={cl.card__amount}>
            <div className={cl.amount__item}>
              <span className="text text_type_digits-default">2</span>
              <span className="text text_type_digits-default">X</span>
              <span className="text text_type_digits-default">20</span>
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>

      <div className={cl.total__wrapper}>
        <p className="text text_type_main-small text_color_inactive">
          Вчера, 13:50
        </p>

        <div className={cl.total__nums}>
          <span className="text text_type_digits-default">510</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetails;
