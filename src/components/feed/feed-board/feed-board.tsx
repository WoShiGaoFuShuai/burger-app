import React from "react";
import cl from "./feed-board.module.css";

interface FeedBoardProps {
  title: string;
  numColor?: string;
  numbers: number[];
}

const FeedBoard: React.FC<FeedBoardProps> = ({ title, numColor, numbers }) => {
  return (
    <div className={cl.feed_info_nums}>
      <div className={cl.nums_ready}>
        <p className={`text text_type_main-medium ${cl.title}`}>{title}</p>
        <div className={cl.nums_columns}>
          {numbers.map((number) => (
            <span
              key={number}
              className="text text_type_digits-default"
              style={{ color: numColor }}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedBoard;
