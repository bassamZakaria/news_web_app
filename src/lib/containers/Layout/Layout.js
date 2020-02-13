import React, {useEffect} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Exception from 'ant-design-pro/lib/Exception';
import {Menu, PageHeader} from "antd";
import "antd/dist/antd.css";
import NewsList from "../../components/NewsList/NewsList";
import './Layout.module.scss';
import './Layout.css';
import {useSelector} from "react-redux";
import Article from "../../components/Article/Article";
import _ from "lodash";
import {changeNavBar} from "../../store/actions/newsActions";

export default function Layout(props) {

    const selectedTab = useSelector(state => _.get(state, 'newsReducer.selectedNavMenu', 'home'));


    // const getCurrentKey = (pathname) => {
    //     const _pathname = pathname || location.pathname;
    //     const pathArr = _pathname.split('/');
    //     const path = pathArr[pathArr.indexOf(props.basename) + 1];
    //     let key = 'everything';
    //     if (path) {
    //         key = ['everything', 'top-headlines', 'details'].includes(path) ? path : key;
    //     }
    //     return key;
    // };

    // useEffect(() => {
    //     const currentSelectedTab = getCurrentKey();
    //     debugger;
    //     if (currentSelectedTab !== selectedTab) {
    //         dispatch(changeNavBar(currentSelectedTab));
    //     }
    // }, [location.pathname]);


    const routers = {
        everything: '/everything', topHeadlines: '/top-headlines', details: '/details'
    };

    return (<React.Fragment>
        <BrowserRouter>
            <PageHeader
                title="News"
                extra={[
                    <Menu key={'mainMenu'} mode='horizontal' selectedKeys={[selectedTab]}>
                        <Menu.Item key="home">
                            Home
                        </Menu.Item>
                        <Menu.Item key="topHeadlines">
                            Headlines
                        </Menu.Item>
                    </Menu>
                ]}
            />
            <div>

            </div>
            <Switch>
                <Redirect exact={true} from='/' to={routers.everything}/>
                <Route path={`${routers.everything}`}
                       exact={true}
                       render={(props) => {
                           return <div><NewsList></NewsList></div>;
                       }}/>
                <Route path={`${routers.topHeadlines}`}
                       exact={true}
                       render={(props) => {
                           return <div>headlines</div>;
                       }}/>
                <Route path={`${routers.details}`}
                       exact={true}
                       render={(props) => {
                           return <Article history={props.history}/>;
                       }}/>
                <Route>
                    <Exception type='404' desc='Sorry, the page you visited does not exist.'/>
                </Route>
            </Switch>
        </BrowserRouter>
    </React.Fragment>)
}