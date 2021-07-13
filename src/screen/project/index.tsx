import React from 'react'
import {Link} from 'react-router-dom'
import {Routes,Route,Navigate} from 'react-router'
import { KanbanScreen } from '../kanban'
import { EpicScreen } from '../epic'
export const ProjectScreen = ()=>{
    return <div>
       <Link to={'kanban'}>{'看板'}</Link>
       <Link to={'Epic'}>{'Epic'}</Link>
       <Routes>
        <Route path={'/kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={'/epic'} element={<EpicScreen></EpicScreen>}></Route>
        <Navigate to={ window.location.pathname+ '/kanban'}/>
       </Routes>
    </div>
}