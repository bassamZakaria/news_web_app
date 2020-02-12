import React, {useState} from "react";
import {Avatar, Row} from "antd";
import {Ellipsis} from "ant-design-pro";

export default function News({data}) {

    function listItemOnClick(e) {
        console.log("click", e);
    }

    return (
        <div onClick={listItemOnClick}>
            <Row>
                <Avatar shape="square" size="large" src={data.urlToImage}/>
                {data.title}
            </Row>
            <Row>
                <Ellipsis>{data.content}</Ellipsis>
            </Row>
        </div>
    )
}