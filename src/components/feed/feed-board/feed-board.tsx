import React from "react";
import cl from "./feed-board.module.css";

interface FeedBoardProps {
  title: string;
  numColor?: string;
}

const FeedBoard: React.FC<FeedBoardProps> = ({ title, numColor }) => {
  return (
    <div className={cl.feed_info_nums}>
      <div className={cl.nums_ready}>
        <p className={`text text_type_main-medium ${cl.title}`}>{title}</p>
        <div className={cl.nums_columns}>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
          <span
            className="text text_type_digits-default"
            style={{ color: numColor }}
          >
            034533
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedBoard;
