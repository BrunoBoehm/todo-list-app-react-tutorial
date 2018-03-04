import React from 'react';
import TodoList from '../components/TodoList';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <p>Hello World! Welcome to the app!</p>
                <TodoList />
            </div>
        )
    };
};

export default HomePage;