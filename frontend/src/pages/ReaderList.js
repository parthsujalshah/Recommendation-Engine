import { List, Divider } from 'antd';
import React, { useState, useEffect } from "react";
import { apiUrl } from "../constants";
import axios from "axios";

const ReaderList = props => {
    const [readers, setReaders] = useState([]);

    useEffect(async () => {
        const res = await axios.get(`${apiUrl}/reader_ids`);
        setReaders(res.data.reader_ids);
    }, []);
    return (
        <div style={{padding: 100}}>
            <Divider orientation="left">Reader Ids</Divider>
            <List
                size="large"
                footer={<div>Footer</div>}
                bordered
                dataSource={readers}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};

export default ReaderList