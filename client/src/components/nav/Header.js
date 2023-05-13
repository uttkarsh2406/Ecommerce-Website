import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,ShoppingCartOutlined
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "antd/dist/antd-with-locales";
import { Badge, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Forms/Search";



function Header() {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user,cart } = useSelector((state) => ({ ...state }));
  function onClick(e) {
    // console.log(e);
    setCurrent(e.key);
  }

  function logout() {

    Auth.signOut().then(()=>{

      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      // history.push("/login");
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <Menu mode="horizontal" onClick={onClick} selectedKeys={[current]}>
      <Menu.Item key="Home" icon={<AppstoreOutlined />}>
        <Link Link to="/">
          Home
        </Link>
      </Menu.Item>

      <Menu.Item key="Shop" className="float-start" icon={<ShoppingOutlined />}>
        <Link Link to="/shop">
          Shop
        </Link>
      </Menu.Item>
      <Menu.Item key="Cart" className="float-start" icon={<ShoppingCartOutlined />}>
        <Link Link to="/Cart">
          <Badge count={cart.length} offset={[9,0 ]}>Cart</Badge>
        </Link>
      </Menu.Item>

      <Menu.Item key="Search" className="ms-auto p-1">
        <Search />
      </Menu.Item>
      {user && (
        <Menu.SubMenu
          className=""
          key="SubMenu"
          icon={<SettingOutlined />}
          title={<span>{user.email && user.email.split("@")[0]}</span>}
        >

          {user && user.role==="subscriber" && <Menu.Item>
            <Link to="/user/history">Dashboard</Link>
            </Menu.Item>}
            {user && user.role==="admin" && <Menu.Item>
            <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>}

          <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
            {/* <Link Link to="/option2"></Link> */}
          </Menu.Item>
        </Menu.SubMenu>
      )}

      {!user && (
        <Menu.Item className="" key="Login" icon={<UserOutlined />}>
          <Link Link to="/login">
            Login
          </Link>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key="Register" icon={<UserAddOutlined />} >
          <Link Link to="/register">
            Register
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Header;
