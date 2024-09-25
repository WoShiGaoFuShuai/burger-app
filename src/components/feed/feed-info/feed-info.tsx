import React from "react";
import cl from "./feed-info.module.css";
import FeedBoard from "../feed-board/feed-board";

const FeedInfo = () => {
  return (
    <div className={cl.feed_info}>
      <div className={cl.board_wrapper}>
        <FeedBoard title="Готовы:" numColor="#00CCCC" />
        <FeedBoard title="В работе:" />
      </div>
      <div className="feed_info_all">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">12345</p>
      </div>
      <div className="feed_info_today">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">512</p>
      </div>
    </div>
  );
};

export default FeedInfo;
