import React, {useState} from "react";
import {Avatar, Col, Modal, Row} from "antd";
import './News.css'
import Article from "../Article/Article";
import {ARTICLE_DISPLAY_MODE} from "../../utils/Enums";
import {Description} from "../Description/Description";

export default function News({data}) {

    const [modalVisibility, setModalVisibility] = useState(false);

    function listItemOnClick(e) {
        setModalVisibility(true);
    }

    return (
        <div>
            <div onClick={listItemOnClick}>
                <Row gutter={12}>
                    <Col span={6}>
                        {/*<Avatar className={'image'} shape="square" size="large" src={data.urlToImage}/>*/}
                        <img className={'fluid'} src={data.urlToImage} alt={'newPic'}/>
                    </Col>
                    <Col span={18}>
                        <Row className={'title'}>
                            {data.title}
                        </Row>
                        <Row>
                            <Description length={100} description={data.description} content={data.content}/>
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
                {<Article data={data} displayMode={ARTICLE_DISPLAY_MODE.QUICK_VIEW}/>}
            </Modal>
        </div>
    )
}