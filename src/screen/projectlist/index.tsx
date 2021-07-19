import React ,{ useState} from "react"
import { SearchPanel } from "./searchPanel"
import { List } from "./list"
import {useDebounce} from '../../utils/index'
import styled from "@emotion/styled"
import { Button, Typography } from "antd"
import { useProjects } from "../../utils/project"
import { useUsers } from "../../utils/user"
import { useProjectModal, useProjectSearchParms } from "./util"
import { ButtonNoPadding, ErrorBox, Row } from "../../components/lib"

export const ProjectListScreen = () =>{
    //渲染用户
    const [param,setParam] = useProjectSearchParms()
    //利用自定义节流hook处理输入
    const {isLoading,error,data:list} = useProjects(useDebounce(param,500))
    const {data:users} = useUsers()

    const {open} = useProjectModal()
    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding type={'link'} onClick={open}>创建项目</ButtonNoPadding>
        </Row>
       
        <SearchPanel users={users||[]} param={param} setParam={setParam} />
        <ErrorBox error={error} />
        <List loading={isLoading} users={users||[]} dataSource ={list || []}/>
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
    width:100%
`