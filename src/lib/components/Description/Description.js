import {Ellipsis} from "ant-design-pro";
import React from "react";

//200 because the APIs only get 200 chars and then add

export function Description({content, length}) {
    return (<React.Fragment>
        {content && <Ellipsis style={{wordWrap: 'break-word'}} length={length ? length : 200}>{content}</Ellipsis>}
    </React.Fragment>)
}