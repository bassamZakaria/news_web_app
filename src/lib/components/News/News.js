import React, {useState} from "react";
import {Avatar, Modal, Row} from "antd";
import {Ellipsis} from "ant-design-pro";

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
                    <Avatar shape="square" size="large" src={data.urlToImage}/>
                    {data.title}
                </Row>
                <Row>
                    <Ellipsis>{data.content}</Ellipsis>
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