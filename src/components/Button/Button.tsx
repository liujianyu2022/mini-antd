import React from "react";
import classNames from "classnames";

export enum ButtonSize {
    large = "large",
    small = "small"
}

export enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}

interface BaseButtonProps {
    className?: string
    disabled?: boolean
    size?: ButtonSize
    btnType?: ButtonType
    children: React.ReactNode
    href?: string       //针对link标签，需要添加href属性才生效
}

const Button: React.FC<BaseButtonProps> = (props)=>{
    let {btnType, size, disabled, children, href} = props

    let classes = classNames("btn", {
        [`btn-${btnType}`]: btnType,     //属性名可以是btn-primary  btn-default  btn-danger。属性值是一个boolean，true就添加这个属性
        [`btn-${size}`]: size,
        "disabled": btnType === ButtonType.Link && disabled     //因为link标签没有disable属性
    })

    if(btnType === ButtonType.Link && href){
        return <a className={classes} href={href}> {children} </a>
    }else{
        return <button className={classes} disabled={disabled} >{children}</button>
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button
