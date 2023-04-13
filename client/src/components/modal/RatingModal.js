import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {useHistory, useParams} from "react-router-dom";


const RatingModal = (props) => {
  const { children } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModelVisible] = useState(false);
  let history=useHistory();
  let {slug}=useParams();
  const handleModal=()=>{
    if(user && user.token){
        setModelVisible(true);
    }
    else{
        history.push({
            pathname:'/login',
            state:{from:`/product/${slug}`},
        });
    }
  }
  return (
    <div>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>

      <Modal
        title="Leave your Rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModelVisible(false);
          toast.success("Thanks for Your review. It will appear soon");
        }}
        onCancel={() => setModelVisible(false)}
      >
        {children}
      </Modal>
    </div>
  );
};


export default RatingModal;