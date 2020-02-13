import * as dotProp from 'dot-prop-immutable';
import {ACTIONS} from "../actionTypes";

const initialState = {
    selectedArticle: null,
    selectedNavMenu: '',
    searchKey: '',
    page: 1,
    selectedSources: [],
    selectedCountries: [],
    startDate: null,
    endDate: null
};

const setSelectedArticle = (state, action) => {
    const tmpState = dotProp.set(state, 'selectedNavMenu', null);
    return dotProp.set(tmpState, 'selectedArticle', action.article);
};

const changeNavBarSelectedMenu = (state, action) => {
    return dotProp.set(state, 'selectedNavMenu', action.navKeyBar);
};

const setStartDate = (state, action) => {
    return dotProp.set(state, 'startDate', action.startDate);
};

const setEndDate = (state, action) => {
    return dotProp.set(state, 'endDate', action.endDate);
};

const setSelectedSources = (state, action) => {
    return dotProp.set(state, 'selectedSources', action.selectedSources);
};

const setSelectedCountries = (state, action) => {
    return dotProp.set(state, 'selectedCountries', action.selectedCountries);
};

const setPage = (state, action) => {
    return dotProp.set(state, 'page', action.page);
};

const setSearchKey = (state, action) => {
    return dotProp.set(state, 'searchKey', action.searchKey);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_SELECTED_ARTICLE:
            return setSelectedArticle(state, action);
        case ACTIONS.CHANGE_NAV_BAR:
            return changeNavBarSelectedMenu(state, action);
        case ACTIONS.SET_SELECTED_SOURCES:
            return setSelectedSources(state, action);
        case ACTIONS.SET_SELECTED_COUNTRIES:
            return setSelectedCountries(state, action);
        case ACTIONS.SET_START_DATE:
            return setStartDate(state, action);
        case ACTIONS.SET_END_DATE:
            return setEndDate(state, action);
        case ACTIONS.SET_PAGE:
            return setPage(state, action);
        case ACTIONS.SET_SEARCH_KEY:
            return setSearchKey(state, action);
        default:
            return state;
    }
};

export default reducer;

