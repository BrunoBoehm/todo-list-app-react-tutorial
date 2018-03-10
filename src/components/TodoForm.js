import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
        this.state = {
            title: props.todo ? props.todo.title : '',
            description: props.todo ? props.todo.description : '',
            priority: props.todo ? props.todo.priority : 5,
            errorMessage: ''
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
        if (!priority || priority.match(/^([1-9]|10)$/)) {
            this.setState(() => ({priority}));
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        if ( !this.state.title ) {
            this.setState(() => ({errorMessage: 'Please provide a title'}));
        } else {
            this.setState(() => ({errorMessage: ''}));
            this.props.onSubmit({
                title: this.state.title,
                description: this.state.description,
                priority: this.state.priority 
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                    <button>{ this.props.todo ? 'Update Todo' : 'Add Todo'}</button>
                </form>
            </div>
        )
    }
}