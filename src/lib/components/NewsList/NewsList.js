import React, {useEffect, useState} from "react";
import {Col, DatePicker, Input, List, Row, Select, Spin} from "antd";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getHeadlines} from "../../api/NewsApi";
import News from "../News/News";
import './NewsList.css';
import {guid} from "../../utils/Helper";
import {useDispatch, useSelector} from "react-redux";
import {
    changeNavBar,
    setEndDate,
    setPage, setSearchKey,
    setSelectedCountries,
    setSelectedSources, setStartDate
} from "../../store/actions/newsActions";
import moment from "moment";
import {COUNTRIES} from '../../utils/Enums'
import _ from 'lodash';

const Search = Input.Search;

export default function NewsList({selectedTab, location, history}) {

    console.log(location);
    const dispatch = useDispatch();

    let sources = useSource();
    const pageSize = 10;

    //region global state
    const searchKey = useSelector(state => _.get(state, 'newsReducer.searchKey'));
    const page = useSelector(state => _.get(state, 'newsReducer.page'));
    const selectedSources = useSelector(state => _.get(state, 'newsReducer.selectedSources'));
    const selectedCountries = useSelector(state => _.get(state, 'newsReducer.selectedCountries'));
    const startDate = useSelector(state => _.get(state, 'newsReducer.startDate'));
    const endDate = useSelector(state => _.get(state, 'newsReducer.endDate'));
    //endregion

    //no need to use redux as there will be no back
    //TODO: update need to use redux as there will be back from details page(new story)
    //region Local state
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [totalElements, setTotalElements] = useState(0);

    //endregion

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let res;
                if ((selectedTab === 'home')) {
                    res = await getAllNews(page, pageSize, searchKey, startDate, endDate);
                } else {
                    res = await getHeadlines(page, pageSize, searchKey, selectedSources, selectedCountries, startDate, endDate);
                }

                if (res && res.data && res.data.articles) {
                    setDataSource(res.data.articles);
                    setTotalElements(res.data.totalResults > 100 ? 100 : res.data.totalResults);
                }
            } catch (error) {
                console.log(error);
                //TODO: need to add interceptors to handle errors
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [selectedTab, searchKey, selectedSources, selectedCountries, page, startDate, endDate]);

    //region handlers

    //region Date

    function disabledStartDate(startValue) {
        if (!startValue || !endDate) {
            return false;
        }
        return startValue.valueOf() > endDate.valueOf();
    }

    function disabledEndDate(endValue) {
        if (!endValue || !startDate) {
            return endValue.valueOf() > moment().valueOf();
        }
        return endValue.valueOf() <= startDate.valueOf() || endValue.valueOf() > moment().valueOf();
    }

    //endregion

    //endregion

    return (
        <Spin spinning={loading}>
            <Row type="flex" justify="center">
                <Col span={16}>
                    <Search value={searchKey} onChange={e => dispatch(setSearchKey(e.target.value.trimStart()))}/>
                </Col>
            </Row>
            <Row type="flex" justify="center" gutter={8}>
                <Col span={4}>
                    <Select placeholder={'Select Source'} disabled={!!(selectedCountries && selectedCountries.length)}
                            showArrow={true} maxTagCount={1} className={'fluid'} mode='multiple'
                            value={selectedSources} onChange={value => dispatch(setSelectedSources(value))}>
                        {sources.map(source =>
                            <Select.Option key={source.id} value={source.id}>
                                {source.name}
                            </Select.Option>
                        )}
                    </Select>
                </Col>

                <Col span={4}>
                    <Select placeholder={'Select Country'} disabled={!!(selectedSources && selectedSources.length)}
                            showArrow={true} maxTagCount={1} className={'fluid'} mode='multiple'
                            value={selectedCountries} onChange={value => dispatch(setSelectedCountries(value))}>
                        {Object.entries(COUNTRIES).map(([key, value]) =>
                            <Select.Option key={key} value={key}>
                                {value}
                            </Select.Option>
                        )}
                    </Select>
                </Col>

                <Col span={4}>
                    <DatePicker
                        className={'fluid'}
                        disabledDate={disabledStartDate}
                        format="YYYY-MM-DD"
                        value={startDate}
                        placeholder="From"
                        onChange={value => dispatch(setStartDate(value))}
                    />
                </Col>

                <Col span={4}>
                    <DatePicker
                        className={'fluid'}
                        disabledDate={disabledEndDate}
                        format="YYYY-MM-DD"
                        value={endDate}
                        placeholder="To"
                        onChange={value => dispatch(setEndDate(value))}
                    />
                </Col>

            </Row>
            <Row type="flex" justify="center">
                <Col span={12}>
                    <List itemLayout="vertical"
                          dataSource={dataSource}
                          pagination={{
                              onChange: page => {
                                  dispatch(setPage(page))
                              },
                              current: page,
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
