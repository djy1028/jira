import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"

//该切片树需要维护一个状态

interface State {
    projectModalOpen:boolean
}

const initialState:State = {
    projectModalOpen:false
}

export const projectListSlice = createSlice({
    name:'projectListSlice',
    initialState,
    reducers:{
        //redux/toolkit在底层内置的了immer，利用immutable数据结构，处理引用类型的合并问题
        //在这里并没有违反纯函数的原则
        openProjectModal(state){
            state.projectModalOpen =  true
        },
        closeProjectModal(state){
            state.projectModalOpen =  false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state:RootState)=>state.projectList.projectModalOpen
