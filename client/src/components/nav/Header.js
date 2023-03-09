import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import "antd/dist/antd-with-locales";
import { Menu } from 'antd';
import { useState } from 'react';
import {Link} from "react-router-dom"

// const items1 = [
//     {
//         label: 'Home',
//         key: 'Home',
//         icon: <AppstoreOutlined />,
//     },
//     {
//         label: 'Username',
//         key: 'SubMenu',
//         icon: <SettingOutlined />,
//         children: [

//             {

//                 label: 'Option 1',
//                 key: 'setting:1',
//             },

//             {

//                 label: 'Option 2',
//                 key: 'setting:2',
//             },




//         ],
//     },

// ];

// const items2 = [
//     {
//         label: 'Login',
//         key: 'Login',
//         icon: <UserOutlined />,
//     },
//     {
//         label: 'Register',
//         key: 'Register',
//         icon: <UserAddOutlined />,
//     },

// ];
function Header() {
    const [current, setCurrent] = useState('home');
    function onClick(e) {
        // console.log(e);
        setCurrent(e.key)
    };
    return (
        <Menu mode='horizontal' onClick={onClick} selectedKeys={[current]}>

            <Menu.Item key="Home" icon={<AppstoreOutlined />}>
                <Link Link to="/">Home</Link>
                </Menu.Item>
            <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title={<span>Username</span>}  >

                <Menu.Item key="Option1">
                <Link Link to="/option1">option1</Link>
                    

                </Menu.Item>

                <Menu.Item key="Option2">
                <Link Link to="/option2">Option2</Link>

                    
                </Menu.Item>
            </Menu.SubMenu>
            {/* <Menu.Item key='search' className='mt-2 ms-auto'>
                Search
            </Menu.Item> */}
            <Menu.Item className='ms-auto' key={"Login"} icon={<UserOutlined />}>
            <Link Link to="/login">Login</Link>
                
                </Menu.Item>
            <Menu.Item key="Register" icon={<UserAddOutlined />} >
            <Link Link to="/register">Register</Link>
                </Menu.Item>
        </Menu>
    );
};


export default Header;