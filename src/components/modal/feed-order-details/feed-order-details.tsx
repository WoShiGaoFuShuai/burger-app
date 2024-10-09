import React, { useEffect, useState } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./feed-order-details.module.css";
import { useAppSelector } from "../../../services/hooks";
import { useParams, useLocation } from "react-router-dom"; // Добавил useNavigate
import { ordersFeedAllSelectors } from "../../../services/orders-feed-all/reducer";
import { ingredientsSelectors } from "../../../services/ingredients/reducer";
import { IngredientsData } from "../../../types/interface.ingredients";
import { calculateTotalPrice } from "../../../utils/calculate-total-price";
import { FeedOrder } from "../../../types/interface.orders-feed";
import Loader from "../../../components/ui/loader/loader";

const FeedOrderDetails: React.FC = () => {
  const { id: paramsOrderNumber } = useParams<{ id: string }>();
  const { orders } = useAppSelector(ordersFeedAllSelectors.getOrdersFeedState);
  const { ingredients } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );

  const location = useLocation();

  // Используем useState для хранения item
  const [item, setItem] = useState<FeedOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  interface ResponseExactOrder {
    success: boolean;
    orders: FeedOrder[];
  }

  const fetchExactOrder = async (
    orderNumber: number
  ): Promise<FeedOrder | undefined> => {
    try {
      const res = await fetch(
        `https://norma.nomoreparties.space/api/orders/${orderNumber}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error(
          `Error fetching order ${orderNumber}: ${res.statusText}`
        );
      }

      const data: ResponseExactOrder = await res.json();
      return data.orders[0];
    } catch (err) {
      console.error(err);
      setError(`Не удалось загрузить заказ: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    const orderNumber = Number(paramsOrderNumber);
    const existingOrder = orders.find((order) => order.number === orderNumber);

    if (existingOrder) {
      setItem(existingOrder);
    } else {
      // Если заказ не найден в существующих, загружаем его
      if (orderNumber) {
        setLoading(true);
        fetchExactOrder(orderNumber)
          .then((fetchedOrder) => {
            if (fetchedOrder) {
              setItem(fetchedOrder);
            } else {
              setError("Заказ не найден.");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [orders, paramsOrderNumber]);

  if (loading) {
    return <Loader text="Загружаем данные из заказа"></Loader>;
  }

  if (error) {
    return <div className={cl.error}>{error}</div>;
  }

  if (!item) return null;

  let itemIngredients: IngredientsData[] = [];
  let buns = 0;

  item.ingredients.forEach((itemIngredientId) => {
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === itemIngredientId
    );

    if (!targetIngredient) return;

    if (targetIngredient.type === "bun" && buns > 0) return;

    if (targetIngredient.type === "bun" && buns === 0) {
      buns += 1;
      itemIngredients.push(targetIngredient);
    } else {
      itemIngredients.push(targetIngredient);
    }
  });

  return (
    <div
      className={cl.page_id}
      style={{ paddingTop: location.state ? "" : "120px" }}
    >
      <p className={`text text_type_digits-default ${cl.order_num}`}>
        #{item.number}
      </p>

      <p className={`text text_type_main-medium ${cl.title}`}>{item.name}</p>

      <p className={`text text_type_main-small ${cl.text__done}`}>
        {item.status}
      </p>

      <p className={`text text_type_main-medium ${cl.text__composition}`}>
        Состав:
      </p>

      <div className={cl.composition_wrapper}>
        {itemIngredients.map((ingredient, index) => (
          <div key={index} className={cl.composition__card}>
            <div className={cl.img__wrapper}>
              <img src={ingredient.image_mobile} alt={ingredient.name} />
            </div>
            <p className={`text text_type_main-default ${cl.card__title}`}>
              {ingredient.name}
            </p>

            <div className={cl.card__amount}>
              <div className={cl.amount__item}>
                <span className="text text_type_digits-default">
                  {ingredient.type === "bun" ? 2 : 1}
                </span>
                <span className="text text_type_digits-default">X</span>
                <span className="text text_type_digits-default">
                  {ingredient.price}
                </span>
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>

      <div className={cl.total__wrapper}>
        <p className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(item.createdAt)} />
        </p>

        <div className={cl.total__nums}>
          <span className="text text_type_digits-default">
            {calculateTotalPrice(ingredients, item.ingredients)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetails;
