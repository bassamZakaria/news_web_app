import React, {useState} from "react";
import {Avatar, Col, Modal, Row} from "antd";
import {Ellipsis} from "ant-design-pro";
import './News.css'

export default function News({data}) {

    const [modalVisibility, setModalVisibility] = useState(false);

    function listItemOnClick(e) {
        console.log("click", e);
        setModalVisibility(true);
    }

    return (
        <div>
            <div onClick={listItemOnClick}>
                <Row>
                    <Col span={6}>
                        <Avatar shape="square" size="large" src={data.urlToImage}/>
                    </Col>
                    <Col span={18}>
                        <Row className={'title'}>
                            {data.title}
                        </Row>
                        <Row>
                            {data.description}
                        </Row>
                    </Col>
                </Row>
            </div>
            <Modal
                visible={modalVisibility}
                centered={true}
                footer={null}
                title={null}
                maskClosable={true}
                closable={false}
                onCancel={() => {
                    setModalVisibility(false)
                }}
            >
                <p>{data.title}</p>
                <p>{data.author}</p>
                <p>{data.source.name}</p>
            </Modal>
        </div>
    )
}