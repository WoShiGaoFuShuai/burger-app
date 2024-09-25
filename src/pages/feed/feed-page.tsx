import React, { useEffect, useState } from "react";
import FeedOrderCard from "@/components/feed/feed-order-card/feed-order-card";
import cl from "./feed-page.module.css";
import FeedInfo from "@/components/feed/feed-info/feed-info";
// import {
//   connectWebsocket,
//   sendMessage,
//   closeWebsocket,
// } from "@/services/websocket/wsService";

const FeedPage = () => {
  // useEffect(() => {
  //   connectWebsocket();

  //   return () => {
  //     closeWebsocket();
  //   };
  // }, []);

  const images = [
    "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  ];

  return (
    <div className={cl.feed_page_wrapper}>
      <p className={`text text_type_main-large ${cl.feed_page_title}`}>
        Лента заказов
      </p>

      <div className={cl.feed_content}>
        <div className={cl.feed_orders}>
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
          <FeedOrderCard images={images} />
        </div>

        <FeedInfo />
      </div>
    </div>
  );
};

export default FeedPage;
