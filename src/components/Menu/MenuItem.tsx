import React from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export interface MenuItemProps{
    index?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props)=>{
    let {index, disabled, className, style, children} = props
    let context = React.useContext(MenuContext)

    const classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index
    })

    const handleClick = ()=>{
        if(context.onSelected && !disabled && typeof index === "string") context.onSelected(index)
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = "MenuItem"

export default MenuItem