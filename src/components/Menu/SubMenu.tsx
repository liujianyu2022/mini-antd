import React from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
    children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (props)=>{
    let {index, title, className, children} = props
    let context = React.useContext(MenuContext)

    let openSubMenu: string[] = context.defaultOpenSubMenus!
    let isOpen = (index && context.mode === "vertical") ? openSubMenu.includes(index) : false       // 是否需要展示vertical的subMenu

    let [menuOpen, setMenuOpen] = React.useState<boolean>(isOpen)

    

    let classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index
    })

    // 对于横向菜单，直接hover就能弹出子菜单
    let timer: any
    const handleMouse = (event: React.MouseEvent, toggle: boolean)=>{
        clearTimeout(timer)
        event.preventDefault()
        timer = setTimeout(()=>{
            setMenuOpen(toggle)
        }, 300)
    }
    const handleClick = (event: React.MouseEvent)=>{
        event.preventDefault()
        setMenuOpen(!menuOpen)
    }

    const clickEvents = context.mode === "vertical" ? {
        onClick: handleClick
    } : {}

    const hoverEvents = context.mode !== "vertical" ? {
        onMouseEnter: (event: React.MouseEvent) => {handleMouse(event, true)},
        onMouseLeave: (event: React.MouseEvent) => {handleMouse(event, false)}
    } : {}

    const renderChildren = ()=>{
        const subMenuClasses = classNames("viking-submenu", {
            "menu-open": menuOpen
        })

        let childrenComponent =  React.Children.map(children, (child, i)=>{

            let childElement = child as React.FunctionComponentElement<SubMenuProps>
            let {displayName} = childElement.type

            if(displayName === "MenuItem" || displayName === "SubMenu"){
                // return childElement
                return React.cloneElement(childElement, {index: `${index}-${i}`})
            }else{
                console.error("warning: the child of Menu is not the type of MenuItem")
            }
        })

        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        // 对于横向的菜单，hover的时候弹出下拉菜单
        // 对于纵向的菜单，单击的时候弹出下拉菜单
        <li className={classes} key={index} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = "SubMenu"

export default SubMenu
