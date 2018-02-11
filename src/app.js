import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import 'normalize-css/normalize.css';
import './styles/styles.scss';

const ContactPage = () => {
    return (
        <p>This is the contact page</p>
    )
};

const route = (
    <BrowserRouter>
        <div>
            <Route path="/" component={App} exact={true} />
            <Route path="/contact" component={ContactPage} />
        </div>
    </BrowserRouter>
);

ReactDOM.render(route, document.getElementById('app'));