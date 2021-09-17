import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import { List, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const Home = props => {
    const [readernameLocal, setReadernameLocal] = useState(localStorage.getItem('readername'));
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState();
    const [recommendedBooks, setRecommendedBooks] = useState();

    useEffect(async () => {
        const res1 = await axios.get(`${apiUrl}/books`);
        setBookList(res1.data.books);
        console.log('here');
        console.log(res1.data.books);
    }, []);

    return (
        <div style={{ width: "40%" }}>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={bookList}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button type="primary">Get Similar Book</Button>
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={item.image}
                            />
                        }
                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={item.avatar} />}
                            title={<p>{item.id}</p>}
                            description={item.description}
                        />
                        {/* {item.content} */}
                    </List.Item>
                )}
            />,
        </div>
    );

};

export default Home;