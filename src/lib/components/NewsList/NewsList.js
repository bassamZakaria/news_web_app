import React, {useEffect, useState} from "react";
import {DatePicker, List, Row, Select, Input, Col, Spin} from "antd";
import moment from "moment";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getHeadlines, getSource} from "../../api/NewsApi";
import News from "../News/News";
import './NewsList.css';
import {guid} from "../../utils/Helper";


const Search = Input.Search;

export default function NewsList() {

    let sources = useSource();

    //region Local state
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    //endregion

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchKey, selectedSources, selectedCountries]);

    //region handlers

    function sourceOnChange(value) {
        setSelectedSources(value);
    }

    function searchOnSearch() {
        
    }

    //endregion

    return (
        <Spin spinning={loading}>
            <Row type="flex" justify="center">
                <Col span={16}>
                    <Search onChange={e => setSearchKey(e.target.value)} onSearch={searchOnSearch}/>
                </Col>
            </Row>
            <Row type="flex" justify="center" gutter={24}>
                <Col span={4}>
                    <Select showArrow={true} maxTagCount={1} className={'fluid'} mode='multiple' onChange={sourceOnChange}
                            style={{width: 120}}>
                        {sources.map(source =>
                            <Select.Option key={source.id} value={source.id}>
                                {source.name}
                            </Select.Option>
                        )}
                    </Select>
                </Col>

                <Col span={4}>
                    <Select className={'fluid'} mode='multiple' onChange={sourceOnChange} style={{width: 120}}>
                        {sources.map(source =>
                            <Select.Option key={source.id} value={source.id}>
                                {source.name}
                            </Select.Option>
                        )}
                    </Select>
                </Col>

                <Col span={4}>
                    <DatePicker className={'fluid'}></DatePicker>
                </Col>

                <Col span={4}>
                    <DatePicker className={'fluid'}></DatePicker>
                </Col>
            </Row>

            <Row type="flex" justify="center">
                <Col span={12}>
                    <List bordered='true'
                          itemLayout="vertical"
                          dataSource={dataSource}
                          renderItem={item =>
                              <List.Item key={guid()}><News data={item}/></List.Item>
                          }>
                    </List>
                </Col>
            </Row>
        </Spin>
    )
}
