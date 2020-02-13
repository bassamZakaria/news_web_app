import React, {useEffect} from "react";
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom';
import Exception from 'ant-design-pro/lib/Exception';
import {Menu, PageHeader} from "antd";
import "antd/dist/antd.css";
import NewsList from "../../components/NewsList/NewsList";
import './Layout.module.scss';
import './Layout.css';
import {useDispatch, useSelector} from "react-redux";
import Article from "../../components/Article/Article";
import _ from "lodash";
import {changeNavBar} from "../../store/actions/newsActions";
import {ARTICLE_DISPLAY_MODE} from "../../utils/Enums";

export default function Layout(props) {
    const dispatch = useDispatch();

    const selectedTab = useSelector(state => _.get(state, 'newsReducer.selectedNavMenu', ''));

    const routers = {
        everything: '/home', headlines: '/headlines', details: '/details'
    };

    function handleTabClick({key}) {
        dispatch(changeNavBar(key));
    }

    return (<React.Fragment>
        <BrowserRouter>
            <PageHeader
                title="News"
                extra={[
                    <Menu key={'mainMenu'} mode='horizontal' onClick={handleTabClick} selectedKeys={[selectedTab]}>
                        <Menu.Item key="home">
                            <Link to={'/home'}>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="headlines">
                            <Link to={'/headlines'}>Headlines</Link>
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
                       render={() => {
                           console.log('home here');
                           return <NewsList displayMode={'home'}/>;
                       }}/>
                <Route path={`${routers.headlines}`}
                       exact={true}
                       render={() => {
                           console.log('headlines here');
                           return <NewsList displayMode={'headlines'}/>;
                       }}/>
                <Route path={`${routers.details}`}
                       exact={true}
                       render={() => {
                           return <Article displayMode={ARTICLE_DISPLAY_MODE.DETAILS}/>;
                       }}/>
                <Route>
                    <Exception type='404' desc='Sorry, the page you visited does not exist.'/>
                </Route>
            </Switch>
        </BrowserRouter>
    </React.Fragment>)
}