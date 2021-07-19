import React,{ReactNode} from 'react'
import { Draggable, DraggableProps, Droppable,DroppableProps, DroppableProvided, DroppableProvidedProps} from 'react-beautiful-dnd'


type DropProps = Omit<DroppableProps,'children'>&{children:ReactNode}
export const Drop = ({children,...props}:DropProps)=>{
    return <Droppable {...props} >

        {/* 利用cloneElementApi封装原来的drop组件中的属性，使所有属性都带上drop控件所需要的属性 */}
            {
                (provided =>{
                    if(React.isValidElement(children)){
                        return React.cloneElement(children,{
                            ...provided.droppableProps,
                            ref:provided.innerRef,
                            provided
                        })
                    }
                    return <div />
                })
            }
        </Droppable>
}

type DropChildProps = Partial<{provided:DroppableProvided} & DroppableProvidedProps & React.HtmlHTMLAttributes<HTMLDivElement>>
export const DropChild = React.forwardRef<HTMLDivElement,DropChildProps>(
    ({children,...props},ref)=>(
        <div ref={ref} style={{display:'flex'}}>
              {children} {props.provided?.placeholder}
        </div>
    ) 
)

type DragProps = Omit<DraggableProps,'children'> & {children:ReactNode}

export const Drag = ({children,...props}:DragProps)=>{
        return <Draggable {...props} >
    
            {/* 利用cloneElementApi封装原来的drop组件中的属性，使所有属性都带上drop控件所需要的属性 */}
                {
                    (provided =>{
                        if(React.isValidElement(children)){
                            return React.cloneElement(children,{
                                ...provided.draggableProps,
                                ...provided.dragHandleProps,
                                ref:provided.innerRef,
                                provided
                            })
                        }
                        return <div style={{width:'100%'}} />
                    })
                }
            </Draggable>
    }
