import { Kanban } from "../../types/kanban";
import React from 'react'
import { useTasks } from "../../utils/task";
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from '../../assets/task.svg'
import bugIcon from '../../assets/bug.svg'
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu,Modal} from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteKanban } from "../../utils/kanban";
import { Row } from "../../components/lib";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";


const TaskTypeIcon = ({id}:{id:number})=>{
    const {data:taskTypes} = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id===id)?.name
    if(!name) return null

    return <img src={name === 'task'? taskIcon:bugIcon} alt=''/>

}


const TaskCard = ({task}:{task:Task})=>{
    const {startEdit} = useTasksModal()
    const {name:keyword} = useTasksSearchParams()
    return  <Card onClick={()=>startEdit(task.id)} style={{marginBottom:'0.5rem',cursor:'pointer'}} key={task.id}>
           
                <p><Mark keyword={keyword} name={task.name}></Mark></p>
                <TaskTypeIcon  id={task.typeId}/>
            </Card>
}


export const KanbanColumn = React.forwardRef<HTMLDivElement,{kanban:Kanban}>(({kanban,...props},ref)=>{

    const {data:allTasks} = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task=>task.kanbanId === kanban.id)
   
    return <Container {...props} ref={ref}>
        <Row between={true}>
            <h3>{kanban.name}</h3>
            <More kanban={kanban} key={kanban.id}></More>
        </Row>
       
        <TasksContainer>
            <Drop type={"ROW"} direction={'vertical'} droppableId={String('task'+kanban.id)}>
                <DropChild style={{minHeight:'5px'}}>
                    {
                        tasks?.map((task,taskIndex)=>
                            <Drag key={task.id} index={taskIndex} draggableId = {'task'+task.id}>
                                <div style={{width:'100%'}} ref={ref}>
                                    <TaskCard key={task.id} task={task}></TaskCard>
                                </div>
                            </Drag>
                        )
                            
                    }
                </DropChild>
            </Drop>
        <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
})

const More = ({kanban}:{kanban:Kanban})=>{
    const {mutateAsync} = useDeleteKanban(useKanbansQueryKey())
    const startEdit = ()=>{
        Modal.confirm({
            okText:'??????',
            cancelText:'??????',
            title:'?????????????????????',
            onOk(){
                return mutateAsync({id:kanban.id})
            }
        })
    }
    const overlay=<Menu>
        <Menu.Item>
            <Button type={'link'} onClick={startEdit}>??????</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overlay} >
        <Button type={'link'}>...</Button>
    </Dropdown>
}



export const Container = styled.div`

    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding:0.7rem 0.7rem 1rem;
    margin-right:1.5rem
`

const TasksContainer = styled.div`
    overflow: scroll;
    flex:1;
    ::-webkit-scrollbar{
        display: none;
    }
`