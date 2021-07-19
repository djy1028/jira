import { useHttp } from './http';
import React from 'react'
import { User } from "../types/user";
import { useQuery } from 'react-query';

export const useUsers = (param?:Partial<User>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<User[]>(['users',param],()=>client('users',{data:param}))  //这里的泛型定义返回值的类型
}