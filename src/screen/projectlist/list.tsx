import { Dropdown, Table, TableProps,Menu } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {User} from './searchPanel'
import {Link} from 'react-router-dom'
import { Pin } from '../../components/pin'
import { useEditProject } from '../../utils/project'
import { ButtonNoPadding } from '../../components/lib'

export interface Project{
    id:number
    name:string
    personId:number
    pin:boolean
    organization:string
    created:string
}

interface ListProps extends TableProps<Project>{
    users:User[],
    refresh?:()=>void,
    projectButton:JSX.Element
}

export const List = ({users,...props}:ListProps) =>{
    const {mutate} = useEditProject()
    return <Table pagination={false} columns={[
        {
            title:<Pin checked={true} disabled={true} />,
            render(value,project){
                return<Pin checked={project.pin} onCheckedChange={
                    pin=>{mutate({id:project.id,pin}).then(props.refresh)}
                }/>
            }

        },
        {
            title:'名称',
            sorter:(a,b)=>a.name.localeCompare(b.name),
            render(value,project){
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title:'部门',
            dataIndex:'organization'
        },{
            title:'负责人',
            render(value,project){
                return <span>{users.find(ele=>ele.id === project.personId)?.name|| "未知"}</span>

            }
        },
        {
            title:'创建时间',
            render(value,project){
                return <span>{project.created?dayjs(project.created).format('YYYY-MM-DD'):'无'}</span>

            }
        },{
            render(value,project){
                return <Dropdown overlay={
                    <Menu>
                        <Menu.Item key={'edit'}>
                            {/* <ButtonNoPadding type={'link'} onClick={()=>props.setProjectModalOpen(true)}>编辑</ButtonNoPadding> */}
                        </Menu.Item>
                    </Menu>}>
                    <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                </Dropdown>
            }
        }
    ]} {...props}>
      
    </Table>
}