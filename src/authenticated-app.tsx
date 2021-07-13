import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ButtonNoPadding, Row } from './components/lib'
import { useAuth } from './context/auth-context'
import {ProjectScreen} from './screen/project/index'
import {ProjectListScreen} from './screen/projectlist/index'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg' //svg以组件的形式进行渲染
import { Dropdown,Menu} from 'antd'
import { Button } from 'antd'
import { resetRouter, useDocumentTitle } from './utils'
import {Routes,Route,Navigate} from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectModal } from './screen/projectlist/project-modal'
import { ProjectPopover } from './components/project-popover'

// grid和flex各自的应用场景
// 1、考虑是一维布局还是二维布局，一般来说，一维用flex,二维用grid
// 2、考虑从内容出发还是从布局出发？
//     从内容出发，数量不固定，用flex
//     从布局出发（数量固定），先规划网格，再填充元素用grid

export const AuthenticatedApp = ()=>{
    useDocumentTitle("项目列表")
    //控制创建、编辑项目的开关按钮
  

    return <Container>
              <PageHeader />
               <Main>
                   <Router>
                        <Routes>
                            <Route path={'/projects'} element={<ProjectListScreen/>}>
                                </Route>
                            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                            <Navigate to={'projects'} />
                        </Routes>
                   </Router>
               </Main>  
               <ProjectModal />
            </Container>
}

const PageHeader = ()=>{
    const {logout,user} = useAuth()
    return (
        <Head between={true}>
        <HeadLeft gap={true} >
            <ButtonNoPadding type={"link"} onClick={resetRouter}>
                <SoftwareLogo width={'18rem'} color={'rgb(18,132,255)'}/>
           </ButtonNoPadding>
           <ProjectPopover />
            <span>用户</span>
        </HeadLeft>
        <HeadRight> 
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>
            }>
                <Button type={'link'} onClick={e=>e.preventDefault()}> 'Hi,'+ {user?.name} </Button>
            </Dropdown>
        </HeadRight>
    </Head>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem calc(100vh - 6rem);
height:100vh
`
const Head = styled(Row)`
padding:3.2rem;
height:6rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index:1
`
const HeadLeft = styled(Row)`
`

const HeadRight = styled.div`
`

const Main = styled.main`
height:calc(100vh - 6rem)
`

/* 熟悉grid布局 （以圣杯布局为例）*/

/* const Container = styled.div`
    display:grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
    height:100vh
`

//给Header组件取别名grid-area为header
const Header = styled.header`
    grid-area:header
`
const Main = styled.main`
    grid-area:main
`

const Nav = styled.nav`
    grid-area:nav
`
const Aside = styled.aside`
    grid-area:aside
`

const Footer = styled.footer`
    grid-area:footer
` */
