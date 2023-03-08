import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import "antd/dist/antd-with-locales";
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
    {
        label: 'Home',
        key: 'Home',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Login',
        key: 'Login',
        icon: <UserOutlined />,
    },
    {
        label: 'Register',
        key: 'Register',
        icon: <UserAddOutlined />,
    },
    {
        label: 'Username',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            
        {

                label: 'Option 1',
                key: 'setting:1',
            },

            {

                label: 'Option 2',
                key: 'setting:2',
            },
          
        
      

],
  },

];
function Header() {
    const [current, setCurrent] = useState('home');
    function onClick(e) {
        // console.log(e);
        setCurrent(e.key)
    };
    return <Menu style={{float: "right"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};


export default Header;