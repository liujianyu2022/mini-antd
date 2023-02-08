import React from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";


export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?: "horizontal" | "vertical"
    style?: React.CSSProperties
    onSelect?: (selectedIndex: string) => void
    children?: React.ReactNode
    defaultOpenSubMenus?: string[]
}

interface IMenuContext{
    index: string
    onSelected?: (selectedIndex: string) => void
    mode?:  "horizontal" | "vertical"
    defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({index: "0"})

const Menu: React.FC<MenuProps> = (props)=>{
    let {className, defaultIndex, mode, style, children, onSelect, defaultOpenSubMenus} = props

    const [currentActive, setCurrentActive] = React.useState<string | undefined>(defaultIndex)

    const classes = classNames("viking-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical"
    })

    const handleClick = (index: string)=>{
        setCurrentActive(index)
        onSelect && onSelect(index)
    }

    // 传给子组件的内容
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : "0",
        onSelected: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = ()=>{
        return React.Children.map(children, (child, index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>      // FunctionComponent的实例
            let {displayName} = childElement.type

            if(displayName === "MenuItem" || displayName === "SubMenu"){
                // return child
                return React.cloneElement(childElement, {index: String(index)})        //给每个childElement 添加index属性
            }else{
                console.error("warning: the child of Menu is not the type of MenuItem")
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="menu-test">
            <MenuContext.Provider value={passedContext}>
                {/* {children}    如果直接使用children，那么children的类型可能不满足MenuItem的规定 */}
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: []
}

export default Menu