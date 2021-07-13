import { useEffect, useState,useRef} from "react"

//Falsy无法判断当键值的值为false情况，这种情况下会误删
const Falsy = (value:unknown) => value ===0?false:!value

const isVoid = (value:unknown) => value===undefined || value === null || value === ''

// 通过类型{[key:string]:unknown}来限制键值对

export const ObjectCleanEmpty = (obj:{[key:string]:unknown})=>{
    //一个函数方法不要改变传入的对象值
    const result = {...obj}
    Object.keys(result).forEach(item=>{
        
        if(isVoid(result[item]))
            //delete方法删除对象属性
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
//自定义title的hooks
export const useDocumentTitle = (title:string,keepOnUmount:boolean=true)=>{
    const oldTitle = useRef(document.title).current

    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        return ()=>{
            if(!keepOnUmount){
                document.title = oldTitle
            }
        }
    },[oldTitle,keepOnUmount])
}

export const resetRouter = ()=>window.location.href = window.location.origin

/* 

返回组件的挂载状态，如果还没有挂载或者已经卸载，返回false；反之，返回true
 */

export const useMountedRef = ()=>{
    const mountedRef = useRef(false)
    useEffect(()=>{
        mountedRef.current = true
        return ()=>{
            mountedRef.current = false
        }
    })
    return mountedRef
}