import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Exception from 'ant-design-pro/lib/Exception';
import {Anchor, Button, Menu} from "antd";
import "antd/dist/antd.css";
import NewsList from "../components/NewsList/NewsList";


export default function Layout() {

    const routers = {
        everything: '/v2/everything', topHeadlines: '/v2/top-headlines'
    };

    return (<React.Fragment>
        <BrowserRouter>
            <div>
                <Anchor>
                    <Menu mode='horizontal'>
                        <Menu.Item key="home">
                            Home
                        </Menu.Item>
                        <Menu.Item key="topHeadlines">
                            Headlines
                        </Menu.Item>
                    </Menu>
                </Anchor>
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
                <Route>
                    <Exception type='404' desc='Sorry, the page you visited does not exist.'/>
                </Route>
            </Switch>
        </BrowserRouter>
    </React.Fragment>)
}