import { useEffect, useState } from "react"

const Falsy = (value:unknown) => value ===0?false:!value

export const ObjectCleanEmpty = (obj:object)=>{
    //一个函数方法不要改变传入的对象值
    const result = {...obj}
    Reflect.ownKeys(result).forEach(item=>{
        //@ts-ignore
        if(Falsy(result[item]))
            //delete方法删除对象属性
             //@ts-ignore
            delete result[item]
    })
    return result
}
//箭头函数泛型声明放在箭头函数之前
//普通函数泛型声明放在函数名之后 funtion setState <S>
export const useDebounce = <V>(value:V,delay?:number)=>{
    const [debouncedValue,setDebouncedValue] = useState(value);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebouncedValue(value)
        },delay)
        //清楚上一次useEffect产生的副作用
        return ()=>{clearTimeout(timeout)}
    },[value,delay])

    return debouncedValue
}

// export const useArray = <T>(initialArray:T[])=>{
//     const [value,setValue] = useState(initialArray)
//     return {
//         value,
//         setValue,
//         add:(item:T)=>setValue([...value,item]),
//         clear:()=>setValue([]),
//         removeImte:(index:number)=>{
//             const copy = [...value]
//             copy.splice(index,1)
//             setValue(copy)
//         }  
//     }
// }