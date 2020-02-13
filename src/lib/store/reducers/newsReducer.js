import * as dotProp from 'dot-prop-immutable';
import {ACTIONS} from "../actionTypes";

const initialState = {
    selectedArticle: null,
    selectedNavMenu: 'home'
};

const setSelectedArticle = (state, action) => {
    const tmpState = dotProp.set(state, 'selectedNavMenu', null);
    return dotProp.set(tmpState, 'selectedArticle', action.article);
};

const changeNavBarSelectedMenu = (state, action) => {
    return dotProp.set(state, 'selectedNavMenu', action.navKeyBar);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_SELECTED_ARTICLE:
            return setSelectedArticle(state, action);
        case ACTIONS.CHANGE_NAV_BAR:
            return changeNavBarSelectedMenu(state, action);
        default:
            return state;
    }
};

export default reducer;

