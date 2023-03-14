import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "antd/dist/antd-with-locales";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function Header() {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  let history = useHistory();
  function onClick(e) {
    // console.log(e);
    setCurrent(e.key);
  }

  function logout() {
    Auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  }
  return (
    <Menu mode="horizontal" onClick={onClick} selectedKeys={[current]}>
      <Menu.Item key="Home" icon={<AppstoreOutlined />}>
        <Link Link to="/">
          Home
        </Link>
      </Menu.Item>

      {user && (
        <Menu.SubMenu
          className="ms-auto"
          key="SubMenu"
          icon={<SettingOutlined />}
          title={<span>{user.email && user.email.split('@')[0]}</span>}
        >
          <Menu.Item key="Option1">
            {/* <Link Link to="/option1"></Link> */}
            option1
          </Menu.Item>

          <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
            {/* <Link Link to="/option2"></Link> */}
          </Menu.Item>
        </Menu.SubMenu>
      )}

      {!user  && (
        <Menu.Item className="ms-auto" key="Login" icon={<UserOutlined />}>
          <Link Link to="/login">
            Login
          </Link>
        </Menu.Item>
      )}

      {!user  && (
        <Menu.Item key="Register" icon={<UserAddOutlined />} onClick={logout()}>
          <Link Link to="/register">
            Register
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Header;
