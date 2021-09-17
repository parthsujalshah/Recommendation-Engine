import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
import { List, Modal, Button, Carousel, Card, Avatar, Affix, Spin } from 'antd';
import { validReader } from "../checks";
import { useHistory } from "react-router-dom";
const { Meta } = Card;


const Home = props => {
    const history = useHistory();
    console.log(validReader())
    if (!validReader()) {
        history.push('/');
    }
    const ref = useRef();
    const [readernameLocal, setReadernameLocal] = useState(localStorage.getItem('readername'));
    const [top, setTop] = useState(10);
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const res1 = await axios.get(`${apiUrl}/books`);
        setBookList(res1.data.books);
        setLoading(false);
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

    var ret_val;
    if (loading) {
        ret_val = (<div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Spin size="large" /></div>)
    } else {
        ret_val = (<div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Affix offsetTop={top}>
                <Button type="primary" onClick={() => {
                    localStorage.removeItem('readername');
                    history.push('/');
                }}
                    style={{ backgroundColor: '#b7eb8f' }}
                >
                    Change Reader
                </Button>
            </Affix>
            <div style={{ width: "40%" }}>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {
                        modalLoading
                            ?
                            <Spin size="small" />
                            :
                            <div>
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
                            </div>
                    }
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
                                    setModalLoading(true);
                                    setIsModalVisible(true);
                                    const res = await axios.get(`${apiUrl}/predict/${readernameLocal}/${item.id}`);
                                    setRecommendedBooks(res.data.recommended_books);
                                    setModalLoading(false);
                                }} type="primary">Get Similar Books</Button>
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
                />
            </div>
        </div>)
    }
    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {ret_val}
        </div>
    );

};

export default Home;