import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage=(p)=>{
    if(p && p.ratings){
        let ratingsArray=p.ratings;
        let total=[];
        let length=ratingsArray.length;

        ratingsArray.map((rating)=> total.push(rating.star));
        let totalReduce=total.reduce((p,v)=> p+v,0);
        let highest=length*5;
        let result=(totalReduce*5)/highest;



        return (
            <div className="text-center pt-2 pb-3" >
                <span>
                    <StarRatings starDimension="20px" starSpacing="3px" starRatedColor="red" editing={false} rating={result} />  ({p.ratings.length})
                </span>
            </div>
        );
    }
}