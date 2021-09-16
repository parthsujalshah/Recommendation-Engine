import { List, Divider } from 'antd';
import React, { useState, useEffect } from "react";
import { apiUrl } from "../constants";
import axios from "axios";

const BookList = props => {
    const [books, setBooks] = useState([]);

    useEffect(async () => {
        const res = await axios.get(`${apiUrl}/book_ids`);
        setBooks(res.data.book_ids);
    }, []);
    return (
        <div style={{padding: 100}}>
            <Divider orientation="left">Book Ids</Divider>
            <List
                size="large"
                footer={<div>Footer</div>}
                bordered
                dataSource={books}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};

export default BookList