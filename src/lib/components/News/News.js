import React from "react";
import {Row} from "antd";

export default function News({data}) {
    console.log({data});
    return (
        <div>
            <Row>
                {data.title}
            </Row>
            <Row>
                {data.description}
            </Row>
        </div>
    )
}