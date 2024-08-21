import React from "react";
import cl from "./not-found.module.css";

const NotFoundPage = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.content}>
        <p className={`text text_type_main-large ${cl.title}`}>
          Упс! 404 Ошибка
        </p>

        <p className={`text text_type_main-small `}>
          Запрошенная вами страница не существует
        </p>

        <p className="text text_type_main-small">
          проверьте адрес или перейдите{" "}
          <a className="link__accent" href="">
            на главную
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
