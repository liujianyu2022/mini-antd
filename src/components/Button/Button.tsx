import React from "react";
import classNames from "classnames";

export enum ButtonSize {
    Large = "lg",
    Small = "sm"
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

// | 联合类型 也就是并集   & 交叉类型 也就是交集
// 由于Button按钮上还需要很多属性，类似于点击事件等，不能再BaseButtonProps中一一列举，因此借用React.ButtonHTMLAttriubutes<>
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> 
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>            //Partial<K>  泛型k中所有参数都变成可选参数

const Button: React.FC<ButtonProps> = (props)=>{        // React.FC<BaseButtonProps>
    let {className, btnType, size, disabled, children, href, ...restProps} = props

    let classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,     //属性名可以是btn-primary  btn-default  btn-danger。属性值是一个boolean，true就添加这个属性
        [`btn-${size}`]: size,
        "disabled": btnType === ButtonType.Link && disabled     //因为link标签本身是没有disable属性的，手动添加一个disabled属性
    })

    if(btnType === ButtonType.Link && href){
        return <a className={classes} href={href} {...restProps}> {children} </a>
    }else{
        return <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button



interface A{
    name: string
    age: number
}

interface B{
    address: string
}

type C = A | B      // 可以是A的类型，也可以是B的类型
type D = A & B

let obj1: C = {
    address: ""
}
let obj2: C = {
    name: "",
    age: 12
}

let obj3: D = {     // A和B必须满足
    name: "",
    age: 12,
    address: ""
}

