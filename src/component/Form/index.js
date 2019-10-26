import React, { useState, useEffect } from 'react'
import { Form, Button, Icon, Input } from 'antd'
import { createForm } from 'rc-form'
import { from } from 'rxjs'
import styles from './src/scss/index.css'

let id = 0

function FormList(props) {
    const remove = (k) => {
        const { form } = props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((error, values) => {
            console.log(error,values,'111111')
          if (!error) {
            const { keys, names } = values;
            // console.log('Received values of form: ', values);
            // console.log('Merged values:', keys.map(key => names[key]));
          }
        });
    }
    const add = () => {
        // console.log(props)
        const { form } = props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    useEffect(()=>{
        add()
    },[])
    const { getFieldDecorator, getFieldValue } = props.form;
    // {console.log(props.form)}
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
        <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Passengers' : ''}
            required={false}
            key={k}
        >   
            {getFieldDecorator(`names[${k}]`, {
                validateTrigger: ["onChange", "onBlur"],
                rules: [    
                    {
                        required: true,
                        // whitespace: true,    
                        message: "请输入字段",
                    },
                    {
                        min:5,max:10,
                        message:'长度不在范围内'
                    },
                ],
            })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
            {keys.length > 1 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => remove(k)}
                />
            ) : <div>{console.log(keys,k)}</div>}
        </Form.Item>
    ));


    return (
        <>
            <div className={styles.body}>
                <Form onSubmit={handleSubmit}>
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        {keys.length<2&&<Button type="dashed" onClick={add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add field
                        </Button>}
                    </Form.Item>
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

const WrappedDynamicFieldSet = Form.create({name: "dynamic_form_item"})(FormList)
console.log(WrappedDynamicFieldSet)
export default WrappedDynamicFieldSet