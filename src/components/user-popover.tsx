import React from 'react'
import {List, Popover, Typography} from "antd"
import styled from '@emotion/styled'
import { useUsers } from '../utils/user'

export const UserPopover = ()=>{
    const {data:users,refetch} = useUsers()
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>组员列表</Typography.Text>
        <List>{
            users?.map(user=>{
                return <List.Item key={user.id} title={user.name}>{user.name}</List.Item>
            })
            }</List>
    </ContentContainer>
    return (
        <Popover onVisibleChange={()=>refetch()} placement={"bottom"} content={content}>组员</Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`