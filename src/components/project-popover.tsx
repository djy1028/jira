import React from 'react'
import { Divider, List, Popover, Typography} from "antd"
import { useProjects } from '../utils/project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from '../screen/projectlist/project-list.slice'

export const ProjectPopover = ()=>{
    const dispatch = useDispatch()
    const {data:projects,isLoading} = useProjects()
    const pinnedProjects = projects?.filter(project=>project.pin)
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>{
            pinnedProjects?.map(project=>{
                return <List.Item key={project.id} title={project.name}>{project.name}</List.Item>
            })
            }</List>
            <Divider></Divider>
          {
            <ButtonNoPadding onClick={()=>dispatch(projectListActions.openProjectModal())} type={"link"}>创建项目</ButtonNoPadding>
            }
    </ContentContainer>
    return (
        <Popover placement={"bottom"} content={content}>项目</Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`