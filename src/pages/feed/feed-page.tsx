import React, { useEffect } from "react";
import FeedOrderCard from "@/components/feed/feed-order-card/feed-order-card";
import cl from "./feed-page.module.css";
import FeedInfo from "@/components/feed/feed-info/feed-info";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { ordersFeedAllSelectors } from "@/services/orders-feed-all/reducer";
import {
  URL_FEED_ORDERS_ALL,
  wsConnect,
  wsDisconnect,
} from "@/services/orders-feed-all/actions";
import { ingredientsSelectors } from "@/services/ingredients/reducer";

const FeedPage = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector(ordersFeedAllSelectors.getOrdersFeedState);

  useEffect(() => {
    dispatch(wsConnect(URL_FEED_ORDERS_ALL));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const { ingredients } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );

  let uniqueIngredients = new Set();

  ingredients.forEach((ingredient) =>
    uniqueIngredients.add(ingredient.image_mobile)
  );

  if (!orders.length) {
    return (
      <p className="text text_type_main-large">Загружаем ленту заказов...</p>
    );
  }

  return (
    <div className={cl.feed_page_wrapper}>
      <p className={`text text_type_main-large ${cl.feed_page_title}`}>
        Лента заказов
      </p>

      <div className={cl.feed_content}>
        <FeedOrderCard orders={orders} ingredients={ingredients} />

        <FeedInfo />
      </div>
    </div>
  );
};

export default FeedPage;