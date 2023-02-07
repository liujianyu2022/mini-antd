test("common test", ()=>{
    expect(2 + 2).toBe(4)
    expect(2 + 3).not.toBe(6)
}) 


test("boolean test", ()=>{
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})


test("greater test", ()=>{
    expect(3).toBeGreaterThan(2)
})

test("object", ()=>{
    expect({name: "666"}).toBe({name: "666"})       //完全相同判断
    expect({name: "666"}).toEqual({name: "666"})       //值相同判断
})


test("object", ()=>{
    expect([1, 2]).toBe([1,2])           //完全相同判断
    expect([1, 2]).toEqual([1, 2])       //值相同判断
})

