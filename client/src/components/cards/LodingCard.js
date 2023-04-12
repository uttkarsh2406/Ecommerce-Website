import React from "react";
import { Card, Skeleton } from "antd";
const LoadingCard = (props) => {
  const { count } = props;

  const displaySkelton = () => {

    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4 md-3">
          <Skeleton active></Skeleton>
        </Card>
      );

    }
    return totalCards;
  };

  return <div className="row pb-5">{displaySkelton()}</div>;
};

export default LoadingCard;
