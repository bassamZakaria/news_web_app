import React, {useEffect, useState} from "react";
import {DatePicker, List, Select} from "antd";
import moment from "moment";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getSource} from "../../api/NewsApi";
import News from "../News/News";

export default function NewsList() {

    const sources = useSource();

    //region Local state
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSources, setSelectedSources] = useState([]);
    //endregion

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getAllNews(page, pageSize);
                if (res && res.data && res.data.articles) {
                    console.log(res.data.articles);
                    setDataSource(res.data.articles);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <Select defaultValue="lucy" style={{width: 120}}>
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
