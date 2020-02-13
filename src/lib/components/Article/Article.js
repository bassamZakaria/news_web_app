import React from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {Col, Row} from "antd";
import moment from "moment";
import * as articleStyle from './Article.module.scss';
import {Link, Redirect} from "react-router-dom";
import {setSelectedArticle} from "../../store/actions/newsActions";
import {ARTICLE_DISPLAY_MODE} from "../../utils/Enums";
import {Description} from "../Description/Description";

export default function Article({data, displayMode}) {
    const dispatch = useDispatch();

    const selectedArticle = data ? data : useSelector(state => _.get(state, 'newsReducer.selectedArticle', null));

    function getArticleView() {
        return (
            <div style={{margin: '24px'}}>
                <Row gutter={6}>
                    <Col span={8}>
                        {selectedArticle.urlToImage && selectedArticle.urlToImage !== 'null' ?
                            <img className={'fluid'} src={selectedArticle.urlToImage} alt={'newPic'}/> :
                            <img className={'fluid'} alt={'noImage'}
                                 src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"/>}
                    </Col>

                    <Col span={16}>
                        <div className={articleStyle.title}>{selectedArticle.title}</div>

                        {selectedArticle.source && selectedArticle.source.name &&
                        <div>{`Source: ${selectedArticle.source.name}`}</div>}

                        {selectedArticle.author && <div>{`Author: ${selectedArticle.author}`}</div>}

                        {displayMode === ARTICLE_DISPLAY_MODE.DETAILS && selectedArticle.publishedAt &&
                        <div>{`Published: ${moment(selectedArticle.publishedAt).format('MMMM Do, YYYY')}`}</div>}

                        {displayMode === ARTICLE_DISPLAY_MODE.DETAILS && selectedArticle.url && selectedArticle.url !== 'null' &&
                        <a href={selectedArticle.url}>Open Original Post</a>}
                    </Col>
                </Row>

                {selectedArticle.content &&
                <Row className={articleStyle.content}> <Description description={selectedArticle.description} content={selectedArticle.content}/>
                </Row>}

                {displayMode && displayMode === ARTICLE_DISPLAY_MODE.QUICK_VIEW &&
                <Link onClick={() => dispatch(setSelectedArticle(data))} to={'/details'}>View Details</Link>}

            </div>)
    }


    return (selectedArticle && selectedArticle.title ? getArticleView() : <Redirect to='/'/>)
}