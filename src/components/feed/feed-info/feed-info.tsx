import React from "react";
import cl from "./feed-info.module.css";
import FeedBoard from "../feed-board/feed-board";
import { useAppSelector } from "../../../services/hooks";
import { ordersFeedAllSelectors } from "../../../services/orders-feed-all/reducer";

const FeedInfo = () => {
  const { orders, total, totalToday } = useAppSelector(
    ordersFeedAllSelectors.getOrdersFeedState
  );
  const doneOrderNumbers: number[] = [];
  const prepareOrderNumbers: number[] = [];

  orders.forEach((orderItem) => {
    if (orderItem.status === "done" && doneOrderNumbers.length < 10) {
      doneOrderNumbers.push(orderItem.number);
    } else if (
      orderItem.status === "pending" &&
      prepareOrderNumbers.length < 10
    ) {
      prepareOrderNumbers.push(orderItem.number);
    }
  });

  return (
    <div className={cl.feed_info}>
      <div className={cl.board_wrapper}>
        <FeedBoard
          numbers={doneOrderNumbers}
          title="Готовы:"
          numColor="#00CCCC"
        />
        <FeedBoard numbers={prepareOrderNumbers} title="В работе:" />
      </div>
      <div className="feed_info_all">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className="feed_info_today">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
};

export default FeedInfo;
