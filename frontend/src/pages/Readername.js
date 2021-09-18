import React from "react";
import { Card, Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom";


const Readername = props => {
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        localStorage.setItem('readername', values.readername)
        history.push('/books');

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Card style={{ display: "flex", backgroundColor: '#f0f0f0' }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Reader"
                    name="readername"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your readername!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <p style={{fontSize: 13}}>Please use the readername "r1", "r2" or "r3".</p>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Readername