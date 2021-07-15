import { ObjectCleanEmpty } from './index';
import { useAsync } from './use-async';
import { useHttp } from './http';
import React,{useEffect} from 'react'
import { User } from "../types/user";
export const  useUsers = (param?:Partial<User>)=>{
    const {run,...result} = useAsync<User[]>()
    const client = useHttp()
    //渲染列表
    useEffect(()=>{
        run(client('users',{data:ObjectCleanEmpty(param||{})}))
    },[param])
    return result
}