import { useProject } from './../../utils/project';
import { Project } from "../../types/project";
import {useMemo} from 'react'
import { useUrlQueryParam } from './../../utils/url';
export const useProjectSearchParms = ()=>{
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    // const [param] = useUrlQueryParam(['name','personId'])

    return [
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        setParam] as const
}
export const useProjectsQueryKey = ()=>{
    const [params] = useProjectSearchParms();
    return ['projects',params]
}

export const useProjectModal = ()=>{
    const [{projectCreate},setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])

    const {data:editingProject,isLoading} = useProject(Number(editingProjectId))

    const open = ()=> setProjectCreate({projectCreate:true})
    const close = ()=> {
        setProjectCreate({projectCreate:undefined})
        setEditingProjectId({editingProjectId:undefined})
    }

    const startEdit = (id:number)=>setEditingProjectId({editingProjectId:id})

    //返回tuple的好处是，其他hooK调用时候，可以自定义命名
    //一般变量数目小于三个时候返回tuple,更多时候返回对象
    return {
        projectModalOpen:projectCreate === 'true'||Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
     } 
}