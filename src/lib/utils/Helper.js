export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const routers = {
    everything: '/home', headlines: '/headlines', details: '/details'
};

export const getApiKeyQuery = () => {
    const token = process.env.REACT_APP_API_KEY;
    return `apiKey=${token}`;
};

export const apiQueryBuilder = (page, pageSize, searchKey, sources, countries, startDate, endDate) => {
    let query = getApiKeyQuery();
    if (searchKey) {
        query = query.concat(`&q=${encodeURI(searchKey)}`)
    }
    if (sources && sources.length) {
        query = query.concat(`&sources=${sources}`)
    }
    if (countries && countries.length) {
        query = query.concat(`&country=${countries}`)
    }
    //to always search by a if there are no param due to limit in APIs instead of listing by sources to have better performance
    if (query === getApiKeyQuery()) {
        query = query.concat(`&q=a`)
    }
    if (page) {
        query = query.concat(`&page=${page}`)
    }
    if (pageSize) {
        query = query.concat(`&pageSize=${pageSize}`)
    }
    if (startDate) {
        query = query.concat(`&from=${startDate.format('YYYY-MM-DD')}`)
    }
    if (endDate) {
        query = query.concat(`&to=${endDate.format('YYYY-MM-DD')}`)
    }
    return query;
};