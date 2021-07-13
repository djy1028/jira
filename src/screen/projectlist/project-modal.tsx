import React from 'react'
import { Drawer } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = ()=>{
    const dispatch = useDispatch()
    //useSelector用来读取总(根)的状态树里面的状态
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (
        <Drawer onClose={()=>dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}></Drawer>
    )
}