import React,{useEffect, useState} from 'react'
import { Card, Input } from "antd"
import { useProjectIdInUrl, useTasksQueryKey } from "./util"
import { Container } from './kanban-column'
import { useAddTask } from '../../utils/task'


export const CreateTask = ({kanbanId}:{kanbanId:number})=>{
    const [name,setName] = useState('')
    const projectId = useProjectIdInUrl()
    const {mutateAsync:addTask} = useAddTask(useTasksQueryKey())
    const [inputMode,setInputMode] = useState(false)
    const submit = async ()=>{
        await addTask({name,projectId,kanbanId})
        setInputMode(false)
        setName('')
    }

    const toggle = ()=>setInputMode(mode=>!mode)

    useEffect(()=>{
        if(!inputMode) setName('')
    },[inputMode])

    if(!inputMode){
        return <div onClick={toggle}>+创建事务</div>
    }



    return <Card> 
                <Input onBlur={toggle} 
                    size={'large'} 
                    autoFocus={true} 
                    placeholder={'需要做些什么'} 
                    onPressEnter={submit} 
                    value={name} 
                    onChange={evt=>setName(evt.target.value)} />    
            </Card>
    
}

