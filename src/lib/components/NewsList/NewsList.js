import React, {useEffect, useState} from "react";
import {DatePicker, List, Select} from "antd";
import moment from "moment";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getHeadlines, getSource} from "../../api/NewsApi";
import News from "../News/News";

export default function NewsList() {

    let sources = useSource();

    //region Local state
    const [searchKey, setSearchKey] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    //endregion

    useEffect(() => {
        async function fetchData() {
            try {
                let res;
                if ((!selectedSources || !selectedSources.length) && (!selectedCountries || !selectedCountries.length)) {
                    res = await getAllNews(page, pageSize, 'a', selectedSources);
                } else {
                    res = await getHeadlines(page, pageSize, searchKey, selectedSources, selectedCountries)
                }

                if (res && res.data && res.data.articles) {
                    console.log('all news', res);
                    setDataSource(res.data.articles);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [selectedSources, selectedCountries]);

    //region handlers

    //region source

    function sourceOnChange(value) {
        setSelectedSources(value);
    }

    //endregion

    //endregion

    return (
        <div>
            <Select mode='multiple' onChange={sourceOnChange} style={{width: 120}}>
                {sources.map(source =>
                    <Select.Option key={source.id} value={source.id}>
                        {source.name}
                    </Select.Option>
                )}
            </Select>

            <List bordered='true'
                  itemLayout="vertical"
                  size="large"
                  dataSource={dataSource}
                  renderItem={item =>
                      <List.Item><News data={item}/></List.Item>
                  }>
            </List>
        </div>
    )
}
