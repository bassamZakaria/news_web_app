import React from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import {Col, Row} from "antd";
import moment from "moment";
import './Article.css';
import {Redirect} from "react-router-dom";

export default function Article() {

    const selectedArticle = useSelector(state => _.get(state, 'newsReducer.selectedArticle', null));


    function getArticleView() {
        return (<div style={{margin: '16px'}}>
            <Row>
                <Col span={10}>
                    {selectedArticle.urlToImage && selectedArticle.urlToImage !== 'null' ?
                        <img style={{width: "inherit"}} src={selectedArticle.urlToImage} alt={'newPic'}/> :
                        <img style={{width: "inherit"}} alt={'noImage'}
                             src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"/>}
                </Col>

                <Col span={14}>
                    <div className={'title'}>{selectedArticle.title}</div>
                    {selectedArticle.url && selectedArticle.url !== 'null' &&
                    <a href={selectedArticle.url}>Open Original Post</a>}
                </Col>
            </Row>

            {selectedArticle.content && <Row>
                {selectedArticle.content}
            </Row>}

        </div>)
    }


    return (selectedArticle && selectedArticle.title ? getArticleView() : <Redirect to='/'/>)
}