import {ACTIONS} from "../actionTypes";

export const setSelectedArticle = (article) => {
    return {
        type: ACTIONS.SET_SELECTED_ARTICLE,
        article
    }
};

export const changeNavBar = (navKeyBar) => {
    return {
        type: ACTIONS.CHANGE_NAV_BAR,
        navKeyBar
    }
};