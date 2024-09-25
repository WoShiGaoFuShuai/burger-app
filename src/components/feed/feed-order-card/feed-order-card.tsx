import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./feed-order-card.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/services/hooks";
// import { addItemToFeedModal } from "@/services/feed/reducer";

interface FeedOrderCardProps {
  images: Array<string>;
}

const FeedOrderCard: React.FC<FeedOrderCardProps> = ({ images }) => {
  const visibleImagesAmount = 5;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const linkPath = location.pathname.includes("/profile")
    ? `/profile/orders/${1}`
    : `/feed/${1}`;

  // const images = [
  //   "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  //   "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  // ];

  const visibleImages = images.slice(0, visibleImagesAmount);

  const handleOrderCardClick = () => {
    // dispatch(addItemToFeedModal({ a: "a" }));
    navigate(linkPath, { state: { bg: location } });
  };

  return (
    <div className={cl.link__wrapper} onClick={handleOrderCardClick}>
      <div className={cl.feed__order}>
        <div className={cl.feed_order_num}>
          <span className="text text_type_digits-default">#034535</span>
          <span className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20
          </span>
        </div>
        <div className="feed__order-title">
          <p className="text text_type_main-medium">
            Death Star Starship Main бургер
          </p>
        </div>
        <div className={cl.feed_order_info}>
          <div className={cl.feed_order_info_imgs}>
            {visibleImages.map((item, index) => (
              <div
                className={cl.img__wrapper}
                style={{ left: `${index * -30}px`, zIndex: 10 - index }}
              >
                <img src={item} alt="" />
              </div>
            ))}

            {visibleImagesAmount < images.length && (
              <div
                className={cl.img__wrapper}
                style={{
                  left: `${visibleImagesAmount * -30}px`,
                  zIndex: 10 - visibleImagesAmount,
                }}
              >
                <span
                  className={`text text_type_digits-default ${cl.extra__amount}`}
                >
                  +{images.slice(visibleImagesAmount).length}
                </span>
                <img
                  className={cl.img__last}
                  src={images[visibleImagesAmount]}
                  alt=""
                />
              </div>
            )}
          </div>

          <div className={cl.order__info_price}>
            <span className="text text_type_digits-default">480</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedOrderCard;
