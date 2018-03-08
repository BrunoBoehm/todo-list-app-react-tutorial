import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.state = {
            title: '',
            description: '',
            priority: 5
        };
    };

    onTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onPriorityChange(e) {
        const priority = e.target.value;
        if (priority.match(/^([1-9]|10)$/)) {
            this.setState(() => ({priority}));
        }
    }

    render() {
        return (
            <div>
                <input 
                    type="text"
                    placeholder="Title"
                    autoFocus
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <textarea
                    placeholder="Description of the Todo"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                >
                </textarea>
                <input 
                    type="number"
                    placeholder="Priority"
                    value={this.state.priority}
                    onChange={this.onPriorityChange}
                />
                <button>Add Todo</button>
            </div>
        )
    }
}