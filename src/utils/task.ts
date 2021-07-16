import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from '../types/task';
import { useAddConfig, useEditConfig } from './use-optimistic-options';
export const useTasks = (param?:Partial<Task>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<Task[]>(['tasks',param],()=>client('tasks',{data:param}))  //这里的泛型定义返回值的类型
}

export const useAddTask=(queryKey:QueryKey)=>{
    const client = useHttp()
    //useMutation执行某个方法，成功或者失败之后让缓存某些数据失效
    return useMutation(
        (params:Partial<Task>)=>client(`tasks`,{
            data:params,
            method:'POST'
        }),  
        useAddConfig(queryKey)
    )
}

export const useTask = (id?:number) =>{
    const client = useHttp()
    //useQuery中第三个参数为配置参数，在此处表示只有当id有意义时候才执行请求
    return useQuery<Task>(
        ['task',{id}],
        ()=>client(`tasks/${id}`),
        {enabled:Boolean(id)}
    )
}


export const useEditTask=(queryKey:QueryKey)=>{
    const client = useHttp()
    return useMutation(
        (params:Partial<Task>)=>client(`tasks/${params.id}`,{
            data:params,
            method:'PATCH'
        }),
        useEditConfig(queryKey)
    )
}