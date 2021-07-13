import React ,{ useState} from "react"
import { SearchPanel } from "./searchPanel"
import { List } from "./list"
import {useDebounce} from '../../utils/index'
import styled from "@emotion/styled"
import { Button, Typography } from "antd"
import { useProjects } from "../../utils/project"
import { useUsers } from "../../utils/user"
import { useProjectSearchParms } from "./util"
import { ButtonNoPadding, Row } from "../../components/lib"
import { useDispatch } from "react-redux"
import { projectListActions } from "./project-list.slice"

export const ProjectListScreen = () =>{

    const dispatch = useDispatch()

    //渲染用户
    const [param,setParam] = useProjectSearchParms()
    //利用自定义节流hook处理输入
    const {isLoading,error,data:list,retry} = useProjects(useDebounce(param,500))
    const {data:users} = useUsers()
    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            {
            <ButtonNoPadding onClick={()=>dispatch(projectListActions.openProjectModal())} type={"link"}>创建项目</ButtonNoPadding>
            }
        </Row>
       
        <SearchPanel users={users||[]} param={param} setParam={setParam} />
        {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
        <List refresh={retry} loading={isLoading} users={users||[]} dataSource ={list || []}/>
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`