import {useState,useCallback, useReducer} from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past:T[],
    present:T,
    future:T[]
}

type Action<T>={newPresent?:T,type:typeof UNDO | typeof REDO | typeof SET | typeof RESET}

const  undoReducer = <T>(state:State<T>,action:Action<T>)=>{
    const {past,present,future} = state
    const {type,newPresent} = action
    switch(type){
        case UNDO:{
            if(past.length === 0) return state
            const previous = past[past.length-1]
            //复制一份数组
            const newPast = past.slice(0,past.length-1)
            //分别设置过去，现在，将来
            return {
                past:newPast,
                present:previous,
                future:[present,...future]
            }
        }
        case REDO:{
            if(future.length === 0) return state
            const next = future[0]
            //复制一份数组,['present',f1,f2,f3]
            const newFuture = future.slice(1)
            //分别设置过去，现在，将来
            // setPast([...past,present])
            // setPresent(next)
            // setFuture(newFuture)
            return {
                past:[...past,present],
                present:next,
                future:newFuture
            }
        }
        case SET:{
          
            if(newPresent === present) return state
            // setPast([...past,present])
            // setPresent(newPresent)
            // setFuture([])
            return {
                past:[...past,present],
                present:newPresent,
                future:[]
            }
        }

        case RESET:{
            return {
                past:[],
                present:newPresent,
                future:[]
            }
        }     
    }
    return state
}

export const useUndo = <T>(initialPresent:T)=>{

   const [state,dispatch] = useReducer(undoReducer,{
       past:[],
       present:initialPresent,
       future:[]
   } as State<T>)




    // const [state,setState] = useState<{
    //     past:T[],
    //     present:T,
    //     future:T[]
    // }>({
    //     past:[],
    //     present:initialPresent,
    //     future:[]
    // })

    //回溯
    const canUndo = state.past.length !==0
    //前进
    const canRedo = state.future.length !==0

    const undo = useCallback(()=>{
        dispatch({type:UNDO})
        // setState(currentState=>{
        //     const {past,present,future}  =currentState
        //     if(past.length === 0) return currentState
        //     const previous = past[past.length-1]
        //     //复制一份数组
        //     const newPast = past.slice(0,past.length-1)
        //     //分别设置过去，现在，将来

        //     return {
        //         past:newPast,
        //         present:previous,
        //         future:[present,...future]
        //     }
        //     // setPast(newPast)
        //     // setPresent(previous)
        //     // setFuture([present,...future])
        // })
       
        //用函数式setstate的方法，可以使useCallback不需要指定任何依赖
    },[]) 
    

    const redo = useCallback(()=>{
        dispatch({type:REDO})
        // setState(currentState=>{
        //     const {past, present,future} = currentState
        //     if(future.length === 0) return currentState
        //     const next = future[0]
        //     //复制一份数组,['present',f1,f2,f3]
        //     const newFuture = future.slice(1)
        //     //分别设置过去，现在，将来
        //     // setPast([...past,present])
        //     // setPresent(next)
        //     // setFuture(newFuture)
        //     return {
        //         past:[...past,present],
        //         present:next,
        //         future:newFuture
        //     }
    
        // })
       
    },[])
    
    const set = useCallback((newPresent:T)=>{
        dispatch({type:SET,newPresent})
        // setState(currentState=>{
        //     const {past,present,future} = currentState
        //     if(newPresent === present) return currentState
        //     // setPast([...past,present])
        //     // setPresent(newPresent)
        //     // setFuture([])
        //     return {
        //         past:[...past,present],
        //         present:newPresent,
        //         future:[]
        //     }
        // })
       
    },[])

    const reset = useCallback( (newPresent:T)=>{
        dispatch({type:RESET,newPresent})
        // setState(()=>{
        //     return {
        //         past:[],
        //         present:newPresent,
        //         future:[]
        //     }
        //     // setPast([])
        //     // setPresent(newPresent)
        //     // setFuture([])
        // })
    },[])

    return [
        state,
        {set,reset,undo,redo,canUndo,canRedo}
    ] as const


}