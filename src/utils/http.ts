import {logout} from '../auth-provider'
import qs from 'qs'
import { useAuth } from '../context/auth-context'
import { useCallback } from 'react'
const apiUrl = process.env.REACT_APP_API_URL

interface paraConfig extends RequestInit{
    //定义token,data为可选属性
    token?:string,
    data?:object 
}


//通用的http异步请求方法。未登录状态下使用,封装http，方便每次调用时候带上token
export const http = (endpoint:string,{data,token,headers,...customConfig}:paraConfig={})=>{

    const config = {
        //method默认为get
        method:"GET",
        headers:{
            Authorization:token?`Bearer ${token}`:'',
            'Content-Type': data?'application/json':''
        },
        ...customConfig
    }
    //区分fetch 在get 和post下的请求头
    if(config.method.toUpperCase() === 'GET'){
        endpoint += `?${qs.stringify(data)}`
    }
    else{
        config.body = JSON.stringify(data || {})
    }

    //axios和fetch的表现不一样，axios可以直接返回不为2xx的异常，而fetch只有在网络异常时候才会抛出，其余异常代码情况不会抛出异常

    return fetch(`${apiUrl}/${endpoint}`,config).then(async response=>{
        //没有权限的情况下
        if(response.status === 401){
            await logout();
            window.location.reload()
            return Promise.reject({message:"请重新登录"})
        }
        const data = await response.json()
        if(response.ok){
            return data
        }
        //fetch的api 返回数据不ok时候并不会抛出异常，需要手动抛出异常
        else{
            return Promise.reject(data)
        }

    })
}



//http封装fetch，但是仍然需要手动写入token,这里需要一个自动带入token的方法,读取user中的token

//已经登录状态下使用

//返回一个函数，外部直接调用这个函数，再对调用的结果进行传参
export const useHttp = ()=>{

    //利用context,整个程序中都可以获取user
    const {user} = useAuth()   



    //这里的typeof是ts中静态的typeof而不是js中runtime的typeof
    //每次调用返回一个新的函数，其他地方存在对这个hooks的依赖，需要用useCallback对其返回函数进行包裹

    return useCallback((...[endpoint,config]:Parameters<typeof http>)=>http(endpoint,{...config,token:user?.token}),[user?.token])
}

//复用参数类型的方法,ts中的utility types
//utility type用法：用泛型给它传入一个其他类型，然后utility type 对这个类型进行某种操作


//类型别名可以有助于复用类型定义
// type Person = {   
//     name:string
//     age:number
// }


//interface可以在很多情况下和类型别名互换,区别type可以用作联合、交叉类型及utility type，interface做不到
// type Person = {
//     name:string
//     age:number
// }
// const xiaom:Partial<Person>={name:'ss'}







// type PersonKeys = keyof Person

// type PersonOnlyName = Pick<Person,'name'>

// type Age = Exclude<Person,'name'>
// //Partial使Person内所有属性可选
// const xiaoming : Partial<Person> ={name:'11'}

// //Omit从第一个类型中删除第二个属性
// const shenmiren:Omit<Person,'name'> = {age:2}

// //如果需要删除多个类型,则第二个参数用联合类型进行处理

// const shemirens:Omit<Person,'name'|'age'> = {}