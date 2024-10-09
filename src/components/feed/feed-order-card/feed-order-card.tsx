import React, { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./feed-order-card.module.css";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { FeedOrder } from "../../../types/interface.orders-feed";
import { calculateTotalPrice } from "../../../utils/calculate-total-price";
import { getAccessToken } from "../../../utils/local-storage";
import { ingredientsSelectors } from "../../../services/ingredients/reducer";
import { ordersFeedAllSelectors } from "../../../services/orders-feed-all/reducer";
import { ordersFeedProfileSelectors } from "../../../services/orders-feed-profile/reducer";
import {
  URL_FEED_ORDERS_PROFILE,
  wsConnectProfile,
  wsDisconnectProfile,
} from "../../../services/orders-feed-profile/actions";

interface FeedOrderCardProps {
  mw?: string;
}

const FeedOrderCard: React.FC<FeedOrderCardProps> = ({ mw }) => {
  const visibleImagesAmount = 5;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );

  const inProfile = useMatch({
    path: "/profile/orders",
    end: true,
    caseSensitive: true,
  });

  const ordersSelector = !inProfile
    ? ordersFeedAllSelectors.getOrdersFeedState
    : ordersFeedProfileSelectors.getOrdersFeedProfileState;

  const { orders } = useAppSelector(ordersSelector);

  useEffect(() => {
    if (inProfile) {
      const accessToken = getAccessToken();
      dispatch(
        wsConnectProfile(`${URL_FEED_ORDERS_PROFILE}?token=${accessToken}`)
      );
    }

    return () => {
      if (inProfile) {
        dispatch(wsDisconnectProfile());
      }
    };
  }, [dispatch]);

  if (!orders.length) {
    return (
      <p className="text text_type_main-middle">
        Загружаем вашу ленту заказов...
      </p>
    );
  }

  let uniqueIngredients = new Set();

  ingredients.forEach((ingredient) =>
    uniqueIngredients.add(ingredient.image_mobile)
  );

  const handleOrderCardClick = (orderNumber: number) => {
    const linkPath = location.pathname.includes("/profile")
      ? `/profile/orders/${orderNumber}`
      : `/feed/${orderNumber}`;
    // dispatch(addItemToFeedModal({ a: "a" }));
    navigate(linkPath, { state: { bg: location } });
  };

  const findIngredientImages = (item: FeedOrder) => {
    const images: string[] = [];
    const hiddenImages: string[] = [];

    for (let i = 0; i < item.ingredients.length - 1; i++) {
      const findIngredient = ingredients.find(
        (ing) => ing._id === item.ingredients[i]
      );
      if (!findIngredient) return;

      if (i > visibleImagesAmount - 1) {
        hiddenImages.push(findIngredient.image_mobile);
      } else {
        images.push(findIngredient.image_mobile);
      }
    }

    return (
      <div className={cl.feed_order_info_imgs}>
        {images.map((imageSrc, index) => (
          <div
            key={index}
            className={cl.img__wrapper}
            style={{ left: `${index * -30}px`, zIndex: 10 - index }}
          >
            <img src={imageSrc} alt={`image-${index}`} />
          </div>
        ))}
        {hiddenImages.length > 0 && (
          <div
            className={`${cl.img__wrapper} ${cl.last__img_wrapper}`}
            style={{
              left: `${visibleImagesAmount * -30}px`,
              zIndex: 10 - visibleImagesAmount,
            }}
          >
            {hiddenImages.length === 1 ? (
              <span
                className={`text text_type_digits-default ${cl.extra__amount}`}
              ></span>
            ) : (
              <span
                className={`text text_type_digits-default ${cl.extra__amount}`}
              >
                +{hiddenImages.length - 1}
              </span>
            )}
            <img src={hiddenImages[0]} alt={`image-6}`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cl.feed_orders} style={{ maxWidth: `${mw}px` }}>
      {orders
        .filter((order) => {
          // Проверяем, что order существует и не пустой
          if (!order) {
            return false;
          }

          // Проверяем, что _id не null и не undefined
          if (!order._id) {
            return false;
          }

          if (!order.ingredients.length) return false;

          return true;
        })
        .map((order, index) => (
          <div
            key={order._id}
            className={cl.link__wrapper}
            onClick={() => handleOrderCardClick(order.number)}
          >
            <div className={cl.feed__order}>
              <div className={cl.feed_order_num}>
                <span className="text text_type_digits-default">
                  #{order.number}
                </span>
                <span className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(`${order.createdAt}`)} />
                </span>
              </div>
              <div className="feed__order-title">
                <p className="text text_type_main-medium">{order.name}</p>
              </div>
              {inProfile && (
                <p
                  className="text text_type_main-small"
                  style={{
                    color: order.status === "done" ? "var(--green)" : "",
                  }}
                >
                  {order.status}
                </p>
              )}

              <div className={cl.feed_order_info}>
                {findIngredientImages(order)}
                <div className={cl.order__info_price}>
                  <span className="text text_type_digits-default">
                    {calculateTotalPrice(ingredients, order.ingredients)}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeedOrderCard;
