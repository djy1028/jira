import { QueryKey } from 'react-query';
import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic-options';
import { useProjectSearchParms } from './../screen/projectlist/util';
import { useHttp } from './http';
import { Project } from "../types/project";
import React from "react"
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useProjects = (param?:Partial<Project>)=>{
   
    const client = useHttp()

    //利用react-query改造原来的请求
    //useQuery的第一个参数可以为一个tuple，意思里面的值变化时，就会重新出发后面的请求
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}))  //这里的泛型定义返回值的类型
}


export const useEditProject=(queryKey:QueryKey)=>{
    const client = useHttp()
    return useMutation(
        (params:Partial<Project>)=>client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }),
        useEditConfig(queryKey)
    )
}



export const useAddProject=(queryKey:QueryKey)=>{
    const client = useHttp()
    //useMutation执行某个方法，成功或者失败之后让缓存某些数据失效
    return useMutation(
        (params:Partial<Project>)=>client(`projects`,{
            data:params,
            method:'POST'
        }),  
        useAddConfig(queryKey)
    )
}

export const useDeleteProject=(queryKey:QueryKey)=>{
    const client = useHttp()
    //useMutation执行某个方法，成功或者失败之后让缓存某些数据失效
    return useMutation(
        ({id}:{id:number})=>client(`projects/${id}`,{
            method:'DELETE'
        }),  
        useDeleteConfig(queryKey)
    )
}

export const useProject = (id?:number) =>{
    const client = useHttp()
    //useQuery中第三个参数为配置参数，在此处表示只有当id有意义时候才执行请求
    return useQuery<Project>(
        ['project',{id}],
        ()=>client(`projects/${id}`),
        {enabled:Boolean(id)}
    )
}