import React from 'react'
import {User} from './searchPanel'

interface Project{
    id:string
    name:string
    personId:string
    pin:boolean
    organization:string
}

interface ListProps{
    list:Project[]
    users:User[]
}

export const List = ({list,users}:ListProps) =>{
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
          
        </thead>
        <tbody>
           {
               list.map(project=><tr key={project.id}>
                   <td>{project.name}</td>
                   {/* 返回为undefined时候，配合?.表示有的时候返回值，没有时候返回或后面的 */}
                   <td>{users.find(ele=>ele.id === project.personId)?.name|| "未知"}</td>
               </tr>)
           }
        </tbody>
    </table>
}