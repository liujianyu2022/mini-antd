import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button, {ButtonProps, ButtonType, ButtonSize, } from "./Button";

const defaultProps = {
    onClick: jest.fn()      //mock function
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: "test--"
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

test("button test", () => {
    const wrapped = render(<Button>Nice</Button>)
    const element = wrapped.queryByText("Nice")
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()     // 判断文件是否已经添加在document
})

describe("button test 2", () => {
    it("should render the correct default button", () => {
        const wrapped = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapped.getByText("Nice")
        expect(element).toBeTruthy()
        expect(element).toBeInTheDocument()     // 判断文件是否已经添加在document
        expect(element.tagName).toEqual("BUTTON")
        expect(element).toHaveClass("btn btn-default")

        fireEvent.click(element)        // 触发element元素身上的click事件
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it("should render the correct default button based on diffrent props", () => {
        const wrapped = render(<Button {...defaultProps} {...testProps}>Nice</Button>)
        const element = wrapped.getByText("Nice")
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass("btn-primary btn-lg test--")

    })
    it("should render a link when btnType equals link and href is provided", () => {
        const wrapped = render(<Button btnType={ButtonType.Link} href="http:\\www.baidu.com">Link</Button>) 
        const element = wrapped.getByText("Link")
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("A")
        expect(element).toHaveClass("btn btn-link")
    })
    it("does the disabled works", () => {
        const wrapped = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapped.getByText("Nice") as HTMLButtonElement      //类型断言，getByText() 返回的类型是HTMLElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()

        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})
