import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const ContactPage = () => {
    return (
        <p>This is the contact page</p>
    )
};

const NotFoundPage = () => {
    return (
        <p>This is the 404 page</p>
    )
};

const routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/contact" component={ContactPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));