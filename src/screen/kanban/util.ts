import { useDebounce } from './../../utils/index';
import { useTask } from './../../utils/task';
import { useUrlQueryParam } from './../../utils/url';
import { useProject } from './../../utils/project';
import { useLocation } from "react-router"
import React,{useCallback, useMemo} from 'react'

export const useProjectIdInUrl = ()=>{
    const {pathname} = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl = ()=> useProject(useProjectIdInUrl())


export const useKanbanSearchParams = ()=>({projectId:useProjectIdInUrl()})

export const useKanbansQueryKey = ()=>['kanbans',useKanbanSearchParams()]

export const useTasksSearchParams = ()=>{
    const [param,setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()

    const debounceName = useDebounce(param.name,200)

    return useMemo(()=>({
        projectId,
        typeId:Number(param.typeId) || undefined,
        processorId:Number(param.processorId) || undefined,
        tagId:Number(param.tagId)||undefined,
        name:debounceName
    }),[projectId,param])
}

export const useTasksQueryKey = ()=>['tasks',useTasksSearchParams()]


export const useTasksModal = ()=>{
    const [{editingTaskId},setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    const {data:editingTask,isLoading} = useTask(Number(editingTaskId))
    const startEdit = useCallback((id:number)=>{
        setEditingTaskId({editingTaskId:id})
    },[setEditingTaskId])

    const close = useCallback(()=>{
        setEditingTaskId({editingTaskId:''})
    },[setEditingTaskId])

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}