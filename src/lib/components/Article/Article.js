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

    //const selectedArticle = data ? data : useSelector(state => _.get(state, 'newsReducer.selectedArticle', null));

    const selectedArticle = {
        source: {
            id: 'wired',
            name: 'Wired'
        },
        author: 'Andrew Leonard',
        title: 'A Code-Obsessed Novelist Builds a Writing Bot. Plot Thickens',
        description: 'Vikram Chandra, the author of Sacred Games, created Granthika to keep track of complex narratives. It could change the future of storytelling.',
        url: 'https://www.wired.com/story/code-obsessed-novelist-builds-writing-bot-the-plot-thickens/',
        urlToImage: 'https://media.wired.com/photos/5e3b2af6e601630009b7e7a9/191:100/w_1280,c_limit/Backchannel-Vikram-Chandra-2.jpg',
        publishedAt: '2020-02-06T12:00:00Z',
        content: 'A carven image of Ganesha, the elephant-headed Hindu god who is known as both the remover of obstacles and the patron of poetry, greets visitors from the front door of the Craftsman-style home in north Oakland, just a few houses south of the Berkeley border, … [+4929 chars]'
    };

    function getArticleView() {
        return (
            <div style={{margin: '24px'}}>
                <Row gutter={6}>
                    <Col span={6}>
                        {selectedArticle.urlToImage && selectedArticle.urlToImage !== 'null' ?
                            <img className={'fluid'} src={selectedArticle.urlToImage} alt={'newPic'}/> :
                            <img className={'fluid'} alt={'noImage'}
                                 src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"/>}
                    </Col>

                    <Col span={12}>
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

                {selectedArticle.content && <Row>{selectedArticle.content}</Row>}

                {displayMode && displayMode === ARTICLE_DISPLAY_MODE.QUICK_VIEW &&
                <Link onClick={() => dispatch(setSelectedArticle(data))} to={'/details'}>View Details</Link>}

            </div>)
    }


    return (selectedArticle && selectedArticle.title ? getArticleView() : <Redirect to='/'/>)
}