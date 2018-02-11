import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
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
        <p>This is the 404 page - <Link to="/">Go Home</Link></p>
    )
};

const Header = () => (
    <header>
      <h1>Nav App Title</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Homepage</NavLink>
      <NavLink to="/contact" activeClassName="is-active" >Contact</NavLink>
    </header>
);

const routes = (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/contact" component={ContactPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));