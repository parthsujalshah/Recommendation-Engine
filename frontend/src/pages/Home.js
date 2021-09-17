import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import { List, Modal, Button, Carousel, Card, Avatar } from 'antd';
const { Meta } = Card;


const Home = props => {
    const ref = useRef();
    const [readernameLocal, setReadernameLocal] = useState(localStorage.getItem('readername'));
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState();
    const [recommendedBooks, setRecommendedBooks] = useState([
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
        { 'id': 1, 'image': '', description: '' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(async () => {
        const res1 = await axios.get(`${apiUrl}/books`);
        setBookList(res1.data.books);
    }, []);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onCarouselChange = currIndex => {
        console.log(currIndex);
    }

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <div style={{ width: "40%" }}>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Carousel ref={ref} afterChange={onCarouselChange}>
                    <div>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[0].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[0].id}
                                description={recommendedBooks[0].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[1].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[1].id}
                                description={recommendedBooks[1].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[2].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[2].id}
                                description={recommendedBooks[2].description}
                            />
                        </Card>
                        <br />
                        <Button type="primary" onClick={() => {
                            if (ref && ref.current) {
                                ref.current.next();
                            }
                        }}>Next</Button>
                    </div>
                    <div>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[3].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[3].id}
                                description={recommendedBooks[3].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[4].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[4].id}
                                description={recommendedBooks[4].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[5].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[5].id}
                                description={recommendedBooks[5].description}
                            />
                        </Card>
                        <br />
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Button type="primary" onClick={() => {
                                if (ref && ref.current) {
                                    ref.current.prev();
                                }
                            }}>Prev</Button>
                            <div style={{ marginLeft: 2 }} />
                            <Button type="primary" onClick={() => {
                                if (ref && ref.current) {
                                    ref.current.next();
                                }
                            }}>Next</Button>
                        </div>
                    </div>
                    <div>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[6].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[6].id}
                                description={recommendedBooks[6].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[7].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[7].id}
                                description={recommendedBooks[7].description}
                            />
                        </Card>
                        <Card>
                            <Avatar
                                shape="square"
                                size={200}
                                src={recommendedBooks[8].image}
                            />
                            <br />
                            <br />
                            <Meta
                                title={recommendedBooks[8].id}
                                description={recommendedBooks[8].description}
                            />
                        </Card>
                        <br />
                        <Button type="primary" onClick={() => {
                            if (ref && ref.current) {
                                ref.current.prev();
                            }
                        }}>Prev</Button>
                    </div>
                </Carousel>
            </Modal>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={bookList}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button onClick={async () => {
                                const reader = await localStorage.getItem('readername');
                                const res = await axios.get(`${apiUrl}/predict/${reader}/${item.id}`);
                                setRecommendedBooks(res.data.recommended_books);
                                // console.log(res.data.recommended_books);
                                setIsModalVisible(true);
                            }} type="primary">Get Similar Book</Button>
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
                            title={<p>Book id: {item.id}</p>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />,
        </div>
    );

};

export default Home;