import React from "react";
import { fireEvent, render, RenderResult, cleanup, waitFor } from "@testing-library/react";

import Menu, { MenuProps } from "./Menu"
import MenuItem, { MenuItemProps } from "./MenuItem"
import SubMenu from "./SubMenu";


const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: "test"
}
const testVerticalProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical",
    onSelect: jest.fn()
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={"0"}>
                active
            </MenuItem>
            <MenuItem index={"1"}>
                cool link
            </MenuItem>
            <MenuItem index={"2"} disabled={true}>
                disabled
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    dropdown1
                </MenuItem>
            </SubMenu>
        </ Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .viking-submenu{
            display: none;
        }
        .viking-submenu.menu-open{
            display: block;
        }
    `
    const style = document.createElement("style")
    // style.type = "text/css"
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe("menu test", () => {
    // 在开始每个test之前都会执行一遍这个钩子
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())     // 由于submenu是通过css样式来控制显示和隐藏的，因此需要这样追加css样式
        menuElement = wrapper.getByTestId("menu-test")
        activeElement = wrapper.getByText("active")
        disabledElement = wrapper.getByText("disabled")
    })

    it("does the correct base props of menu and menuItem works", () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("viking-menu test")      //检测组件上是否有默认的className和自定义的classname
        expect(menuElement.getElementsByTagName("li").length).toBe(5)       // 会把全部子节点都找出来
        expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)       //只会找到第一层
        expect(activeElement).toHaveClass("is-active")
        expect(disabledElement).toHaveClass("is-disabled")
    })

    it("does call function called and the active changed when menuItem clicked", () => {
        const secondItem = wrapper.getByText("cool link")

        fireEvent.click(secondItem)
        expect(secondItem).toHaveClass("is-active")
        expect(activeElement).not.toHaveClass("is-active")
        expect(testProps.onSelect).toHaveBeenCalled()
        expect(testProps.onSelect).toHaveBeenCalledWith("1")      // 判断函数执行时候的参数index是否为1


        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass("is-active")
        expect(testProps.onSelect).not.toHaveBeenCalledWith("2")
    })

    it("does render the correct mode when mode is vertical", () => {
        cleanup()       // 由于在beforeEach中，渲染了一遍wrapper， 因此需要手动清除
        const wrapper = render(generateMenu(testVerticalProps))
        const menuElement = wrapper.getByTestId("menu-test")
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("menu-vertical")

    })

    it("IS the dropdown opened when the mode is horizontal", async () => {
        expect(wrapper.queryByText("dropdown1")).not.toBeVisible()      // 对于有可能不存在的内容，可以使用queryByText 
        const dropdownElement = wrapper.getByText("dropdown")

        fireEvent.mouseEnter(dropdownElement)
        // expect(wrapper.queryByText("dropdown1")).toBeVisible()    但由于代码中使用了异步任务，默认测试的时候不等待异步
        await waitFor(() => {
            expect(wrapper.queryByText("dropdown1")).toBeVisible()      // 会反复执行，直到通过，或者timeou报错
        })

        fireEvent.click(wrapper.getByText("dropdown1"))
        expect(testProps.onSelect).toHaveBeenCalled()
        expect(testProps.onSelect).toHaveBeenCalledWith("3-0")

        fireEvent.mouseLeave(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText("dropdown1")).not.toBeVisible()
        })
    })

    it("does the clcik function works when the mode is vertical", ()=>{
        cleanup()
        const wrapper = render(generateMenu(testVerticalProps))
        const menuElement = wrapper.getByTestId("menu-test")
        const dropdownElement = wrapper.getByText("dropdown")
        expect(menuElement).toBeInTheDocument()

        fireEvent.click(dropdownElement)
        expect(wrapper.queryByText("dropdown1")).toBeVisible()

        fireEvent.click(wrapper.getByText("dropdown1"))
        expect(testVerticalProps.onSelect).toBeCalledWith("3-0")
    })
})
