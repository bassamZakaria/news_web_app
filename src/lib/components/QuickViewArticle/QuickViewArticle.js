import React from "react";
import {Avatar, Col, Row} from "antd";

export default function QuickViewArticle({data}) {
    return (
        <React.Fragment>
            <Row>
                <Col span={6}>
                    <Avatar className={'image'} shape="square" size="large" src={data.urlToImage}/>
                </Col>
                <Col span={18}>
                    <Row>{data.title}</Row>
                    <Row>{data.source.name}</Row>
                    <Row>{data.author}</Row>
                </Col>
            </Row>
            <Row>
                {data.description}
            </Row>
        </React.Fragment>
    )
}