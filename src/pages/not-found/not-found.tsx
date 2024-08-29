import React from "react";
import cl from "./not-found.module.css";
import { Link } from "react-router-dom";

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
          <Link className="link__accent" to="/">
            на главную
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
