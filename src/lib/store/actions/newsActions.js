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

export const setSearchKey = (searchKey) => {
    return {
        type: ACTIONS.SET_SEARCH_KEY,
        searchKey
    }
};

export const setSelectedSources = (selectedSources) => {
    return {
        type: ACTIONS.SET_SELECTED_SOURCES,
        selectedSources
    }
};

export const setSelectedCountries = (selectedCountries) => {
    return {
        type: ACTIONS.SET_SELECTED_COUNTRIES,
        selectedCountries
    }
};

export const setStartDate = (startDate) => {
    return {
        type: ACTIONS.SET_START_DATE,
        startDate
    }
};

export const setEndDate = (endDate) => {
    return {
        type: ACTIONS.SET_END_DATE,
        endDate
    }
};

export const setPage = (page) => {
    return {
        type: ACTIONS.SET_PAGE,
        page
    }
};