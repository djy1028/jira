import { ObjectCleanEmpty } from './index';
import { useAsync } from './use-async';
import { useHttp } from './http';
import { Project } from './../screen/projectlist/list';
import React,{useCallback, useEffect} from "react"

export const useProjects = (param?:Partial<Project>)=>{
    const {run,...result} = useAsync<Project[]>()
    const client = useHttp()
    //渲染列表
    const fetchProjects = useCallback(
        ()=>client('projects',{data:ObjectCleanEmpty(param||{})}),
        [client,param])
    useEffect(()=>{
        run(fetchProjects(),{
            retry:fetchProjects
        })
    },[param,run,fetchProjects])
    return result
}

export const useEditProject=()=>{
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params:Partial<Project>)=>{
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}
export const useAddProject=()=>{
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params:Partial<Project>)=>{
        run(client(`projects/${params.id}`,{
            data:params,
            method:'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}
