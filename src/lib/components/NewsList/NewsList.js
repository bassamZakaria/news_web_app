import React, {useEffect, useState} from "react";
import {Col, DatePicker, Input, List, Row, Select, Spin} from "antd";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getHeadlines} from "../../api/NewsApi";
import News from "../News/News";
import './NewsList.css';
import {guid} from "../../utils/Helper";


const Search = Input.Search;

export default function NewsList() {

    let sources = useSource();
    const pageSize = 10;

    //region Local state
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('a');
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    //endregion

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let res;
                if ((!selectedSources || !selectedSources.length) && (!selectedCountries || !selectedCountries.length)) {
                    res = await getAllNews(page, pageSize, searchKey, selectedSources);
                } else {
                    res = await getHeadlines(page, pageSize, searchKey, selectedSources, selectedCountries);
                }

                if (res && res.data && res.data.articles) {
                    setDataSource(res.data.articles);
                    setTotalElements(res.data.totalResults > 100 ? 100 : res.data.totalResults);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchKey, selectedSources, selectedCountries, page]);

    //region handlers

    function sourceOnChange(value) {
        setSelectedSources(value);
    }

    //endregion

    return (
        <Spin spinning={loading}>
            <Row type="flex" justify="center">
                <Col span={16}>
                    <Search onChange={e => setSearchKey(e.target.value)}/>
                </Col>
            </Row>
            <Row type="flex" justify="center" gutter={24}>
                <Col span={4}>
                    <Select showArrow={true} maxTagCount={1} className={'fluid'} mode='multiple'
                            onChange={sourceOnChange}
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
                          pagination={{
                              onChange: page => {
                                  setPage(page)
                              },
                              pageSize: pageSize,
                              total: totalElements
                          }}
                          renderItem={item =>
                              <List.Item key={guid()}><News data={item}/></List.Item>
                          }>
                    </List>
                </Col>
            </Row>
        </Spin>
    )
}
