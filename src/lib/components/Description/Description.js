import {Ellipsis} from "ant-design-pro";
import React from "react";
import './Description.css'

//200 because the APIs only get 200 chars and then add

export function Description({description, content, length}) {
    return (<React.Fragment>
        {content &&
        <Ellipsis tooltip length={length ? length : 200}>{description ? description : content}</Ellipsis>}
    </React.Fragment>)
}