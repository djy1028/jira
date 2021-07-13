import React from 'react'

//泛型中的两个参数分别为props和state 
//props包括参数children fallbackRender

type FallbackRender = (props:{error:Error | null})=>React.ReactElement
//{children:ReactNode,fallbackRender:FallbackRender}
//React.PropsWithChildren是react定义的type utility 
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>,{error:Error|null}>{
    state = {error:null}
    //当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFromError(error:Error){
        return {error}
    }
    render(){
        const {error} = this.state
        const {children,fallbackRender} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}