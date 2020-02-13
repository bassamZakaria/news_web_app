export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const getApiKeyQuery = () => {
    const token = '3bd6331ba9574e69916e6e9cf6caf086';
    return `apiKey=${token}`;
};

export const apiQueryBuilder = (page, pageSize, searchKey, sources, countries) => {
    let query = getApiKeyQuery();
    if (page) {
        query = query.concat(`&page=${page}`)
    }
    if (pageSize) {
        query = query.concat(`&pageSize=${pageSize}`)
    }
    if (searchKey) {
        query = query.concat(`&q=${searchKey}`)
    }
    if (sources && sources.length) {
        query = query.concat(`&sources=${sources}`)
    }
    if (countries && countries.length) {
        query = query.concat(`&sources=${countries}`)
    }
    return query;
};