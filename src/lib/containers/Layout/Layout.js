import React, {useEffect} from "react";
import {BrowserRouter, Link, Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
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
import {routers} from "../../utils/Helper";


export default function Layout() {

    const dispatch = useDispatch();

    const selectedTab = useSelector(state => _.get(state, 'newsReducer.selectedNavMenu', 'home'));

    function handleTabClick({key}) {
        dispatch(changeNavBar(key));
    }

    const history = useHistory();
    const location = useLocation();

    //region to  always select the right tab when land
    const getCurrentKey = () => {
        const _pathname = location.pathname;
        const pathArr = _pathname.split('/');
        const path = pathArr[1];
        let key = 'home';
        if (path) {
            key = ['home', 'headlines'].includes(path) ? path : key;
        }
        return key;
    };

    useEffect(() => {
        const currentSelectedTab = getCurrentKey();
        if (currentSelectedTab !== selectedTab) {
            dispatch(changeNavBar(currentSelectedTab));
        }
    }, [location.pathname]);
    //endregion

    return (
        <React.Fragment>
            <BrowserRouter>
                <PageHeader
                    title="News"
                    extra={[
                        <Menu key={'mainMenu'} mode='horizontal' onClick={handleTabClick} selectedKeys={[selectedTab]}>
                            <Menu.Item key="home">
                                <Link style={{color: 'white'}} to={'/home'}>Home</Link>
                            </Menu.Item>
                            <Menu.Item key="headlines">
                                <Link style={{color: 'white'}} to={'/headlines'}>Headlines</Link>
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
                               return <NewsList {...props} selectedTab={'home'}/>;
                           }}/>
                    <Route path={`${routers.headlines}`}
                           exact={true}
                           render={(props) => {
                               return <NewsList {...props} selectedTab={'headlines'}/>;
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