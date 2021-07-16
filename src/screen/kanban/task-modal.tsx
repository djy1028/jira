
import{ useForm } from 'antd/lib/form/Form'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect } from 'react'
import { useEditTask } from '../../utils/task'
import { useTasksModal, useTasksQueryKey } from './util'
import {Form,Input} from 'antd'
import { UserSelect } from '../../components/user-select'
import { TaskTypeSelect } from '../../components/task-type-select'

const layout = {
    labelCol:{span:8},
    wrapperCol:{span:16}
}



export const TaskModal = ()=>{
    const [form] = useForm()
    const {editingTaskId,editingTask,close} = useTasksModal();
    const {mutateAsync:editTask,isLoading:editLoading} = useEditTask(useTasksQueryKey())

    const onCancel = ()=>{
        close();
        form.resetFields()
    }

    const onOk = async ()=>{
        await editTask({...editingTask,...form.getFieldsValue()})
        close()
    }

    useEffect(()=>{
        form.setFieldsValue(editingTask)
    },[form,editingTask])

    return (
        //forceRender强制渲染，解决useForm一上来需要渲染的问题
        <Modal forceRender={true} onCancel={onCancel} onOk={onOk} okText={'确认'} 
                cancelText={'取消'} title={'编辑任务'} visible={!!editingTaskId} >
                <Form {...layout} initialValues={editingTask} form={form}> 
                    <Form.Item label={'任务名'} name={'name'} rules={[{required:true,message:'请输入任务名'}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label={'经办人'} name={'processorId'} >
                        <UserSelect defaultOptionName={'经办人'} />
                    </Form.Item>
                    <Form.Item label={'类型'} name={'typeId'} >
                        <TaskTypeSelect />
                    </Form.Item>
                </Form>
            
        </Modal>
    )

}