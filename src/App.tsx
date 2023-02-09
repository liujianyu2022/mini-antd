import React from "react";
import Icon from "./components/Icon/Icon";

// 按需引入
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"    // 导入容器
// import {faCoffee} from "@fortawesome/free-solid-svg-icons"    //导入具体的图标


import { library } from '@fortawesome/fontawesome-svg-core'     // 全局引入所有图标
import { fas } from '@fortawesome/free-solid-svg-icons'          // 全局引入所有图标
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
library.add(fas)             // 全局引入所有图标


function App(){
    return (
        <div>
            <Icon icon="coffee" theme="danger" size="10x" />
            <Menu>
               <MenuItem>
                    link
               </MenuItem> 
               <SubMenu title="submenu">
                    <MenuItem>
                        submenu 1
                    </MenuItem>
               </SubMenu>
            </Menu>

            <Menu mode="vertical">
               <MenuItem>
                    link
               </MenuItem> 
               <SubMenu title="submenu">
                    <MenuItem>
                        submenu 1
                    </MenuItem>
               </SubMenu>
            </Menu>
        </div>
    )
}

export default App
