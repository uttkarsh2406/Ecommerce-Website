import React from "react";
import laptop from "./../../images/lapp.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = (props) => {
  const { product,handleRemove } = props;
  const { title, description, images,slug } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "auto", width: "400px", objectFit: "cover" }}
          className="p-2"
        />
      }
      actions={[
        <EditOutlined className="text-danger" />,
        <DeleteOutlined className="text-danger" onClick={()=>handleRemove(slug)} />,
      ]}
    >
      <Meta
        title={title}
        description={` ${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
