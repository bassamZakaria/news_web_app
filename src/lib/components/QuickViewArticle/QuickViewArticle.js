import React from "react";
import {Avatar, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSelectedArticle} from "../../store/actions/newsActions";

export default function QuickViewArticle({data}) {
    const dispatch = useDispatch();

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
            <Row>
                <Link onClick={() => dispatch(setSelectedArticle(data))} to={'/details'}>View Details</Link>
            </Row>
        </React.Fragment>
    )
}