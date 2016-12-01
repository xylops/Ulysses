var list = [
    {
        "name":"aaa"
    },
    {
        "name":"bbb"
    },
    {
        "name":"ccc"
    }
]

console.log(list)

console.log(list.filter(()=>{
    return "name" === "aaa"
}))
