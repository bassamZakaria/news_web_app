import React from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import {useHistory} from "react-router-dom";


export default function Article() {

    const history = useHistory();

    const selectedArticle = useSelector(state => _.get(state, 'articleReducer.selectedArticle', null));

    return (selectedArticle && selectedArticle.title ? <div>
        {selectedArticle.title}
    </div> : null)
}