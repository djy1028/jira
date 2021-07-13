import { useMountedRef } from './index';
import React,{useCallback, useReducer, useState} from "react"
interface State<D>{
    error:Error | null
    data:D | null
    stat:'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null> = {
    stat:'idle',
    data:null,
    error:null

}

const defaultConfig = {
    throwNewError:false
}


const useSafeDispatch = <T>(dispatch:(...args:T[]) => void)=>{
    const mountedRef = useMountedRef();
    return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args): void 0),[dispatch,mountedRef])
}



//可以用useReducer改造use-Async
//useState适合定义单个状态，useReducer适合定义一群会相互影响的状态

export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    const config = {defaultConfig,...initialConfig}
    const [state,dispatch] = useReducer((state:State<D>,action:Partial<State<D>>)=>({...state,...action}),{
        ...defaultInitialState,
        ...initialState
    })
    /* useState中直接传入函数的含义是惰性初始化,所以用useState保存函数时候，不能直接传入函数  */
    const [retry,setRetry] = useState(()=>()=>{

    })

    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback(
        (data:D)=>safeDispatch({
        data,
        stat:'success',
        error:null
    })
    ,[safeDispatch])

    const setError = useCallback( 
        (error:Error)=>safeDispatch({
            error,
            stat:'error',
            data:null
        })
    ,[safeDispatch])
    //用来出发异步请求
    //其他地方需要在useEffect的依赖中加入run，这边需要用useCallback对run进行优化处理
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
        if(!promise || !promise.then()){
            throw new Error('请传入promise类型数据')
        }
        //存一个函数，因此oldpromise也就存下来了
        if(runConfig?.retry){
            setRetry(()=>()=>run(runConfig?.retry(),runConfig))
        }
        //为了避免需要在依赖中加入state，在setState时候需要以函数的形式来更新state
        //这里的preState是当前的state
        safeDispatch({stat:'loading'})
        return promise.then(data=>{
            //阻止在已经卸载的组件上设置数据的错位行为
          
            setData(data)
            return data
        }).catch(err=>{
            setError(err)
            if(config.throwNewError)return Promise.reject(err)
            return err
        })
    },[config.throwNewError, setData,setError,safeDispatch])

    return {
        isIdle:state.stat === 'idle',
        isLoading:state.stat === 'loading',
        isError:state.stat ==='error',
        isSuccess:state.stat ==='success',
        run,
        setData,
        setError,
        ...state,
        retry
    }
}