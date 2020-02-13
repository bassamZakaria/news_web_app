import React, {useEffect, useState} from "react";
import {Col, DatePicker, Input, List, Row, Select, Spin} from "antd";
import useSource from "../../hooks/api/useSource";
import {getAllNews, getHeadlines} from "../../api/NewsApi";
import News from "../News/News";
import './NewsList.css';
import {guid} from "../../utils/Helper";
import {useDispatch, useSelector} from "react-redux";
import {changeNavBar} from "../../store/actions/newsActions";
import _ from "lodash";
import moment from "moment";
import {COUNTRIES} from '../../utils/Enums'

const Search = Input.Search;

export default function NewsList({displayMode}) {

    const selectedTab = useSelector(state => _.get(state, 'newsReducer.selectedNavMenu'));

    console.log('rendered News list', displayMode);

    const dispatch = useDispatch();

    let sources = useSource();
    const pageSize = 10;

    //region Local state
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endDateOpen, setEndDateOpen] = useState(null);
    //endregion

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let res;
                if (displayMode === 'home' && (!selectedSources || !selectedSources.length) && (!selectedCountries || !selectedCountries.length)) {
                    dispatch(changeNavBar('home'));
                    res = await getAllNews(page, pageSize, searchKey, selectedSources, selectedCountries, startDate, endDate);
                } else {
                    dispatch(changeNavBar('headlines'));
                    res = await getHeadlines(page, pageSize, searchKey, selectedSources, selectedCountries, startDate, endDate);
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
            return false;
        }
        return endValue.valueOf() <= startDate.valueOf() || endValue.valueOf() > moment().valueOf();
    }

    function handleStartOpenChange(open) {
        if (!open) {
            setEndDateOpen(true);
        }
    }

    function handleEndOpenChange(open) {
        setEndDateOpen(open);
    }

    //endregion

    //endregion

    return (
        <Spin spinning={loading}>
            <Row type="flex" justify="center">
                <Col span={16}>
                    <Search onChange={e => setSearchKey(e.target.value.trimStart())}/>
                </Col>
            </Row>
            <Row type="flex" justify="center" gutter={8}>
                <Col span={4}>
                    <Select placeholder={'Select Source'} disabled={!!(selectedCountries && selectedCountries.length)}
                            showArrow={true} maxTagCount={1} className={'fluid'} mode='multiple'
                            onChange={value => setSelectedSources(value)}>
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
                            onChange={value => setSelectedCountries(value)}>
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
                        onChange={(value) => setStartDate(value)}
                        onOpenChange={handleStartOpenChange}
                    />
                </Col>

                <Col span={4}>
                    <DatePicker
                        className={'fluid'}
                        disabledDate={disabledEndDate}
                        format="YYYY-MM-DD"
                        value={endDate}
                        placeholder="To"
                        onChange={(value) => setEndDate(value)}
                        open={endDateOpen}
                        onOpenChange={handleEndOpenChange}
                    />
                </Col>

            </Row>
            <Row type="flex" justify="center">
                <Col span={12}>
                    <List itemLayout="vertical"
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
