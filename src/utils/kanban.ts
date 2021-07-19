import { useHttp } from './http';
import { Kanban } from './../types/kanban';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { useAddConfig, useDeleteConfig, useReorderConfig } from './use-optimistic-options';
export const useKanbans = (param?:Partial<Kanban>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<Kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}))  //这里的泛型定义返回值的类型
}

export const useAddKanban=(queryKey:QueryKey)=>{
    const client = useHttp()
    //useMutation执行某个方法，成功或者失败之后让缓存某些数据失效
    return useMutation(
        (params:Partial<Kanban>)=>client(`kanbans`,{
            data:params,
            method:'POST'
        }),  
        useAddConfig(queryKey)
    )
}

export const useDeleteKanban=(queryKey:QueryKey)=>{
    const client = useHttp()
    //useMutation执行某个方法，成功或者失败之后让缓存某些数据失效
    return useMutation(
        ({id}:{id:number})=>client(`kanbans/${id}`,{
            method:'DELETE' 
        }),  
        useDeleteConfig(queryKey)
    )
}

export interface SortProps{
    type:'before'|'after';
    referenceId:number;
    fromId:number,

    
    fromKanbanId?:number,
    toKanbanId?:number
}

export const useRecorderKanban=(queryKey:QueryKey)=>{
    const client = useHttp()
    return useMutation(
        (params:SortProps)=>{
            return client('kanbans/recorder',{
                data:params,
                method:'POST'
            })
        },
        useReorderConfig(queryKey)
    )
}