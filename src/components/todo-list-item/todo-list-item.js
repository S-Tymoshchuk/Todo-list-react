import React from 'react';

import './todo-list-item.css';

class TodoListItem extends React.Component {

    /*constructor() {
        super();
        this.onLabelClick = () => {
            console.log(`Done: ${this.props.label}`);
        }

    }
    */
    // state = {
    //     done: false,
    //     important: false
    // };

    // onLabelClick = () => {
    //     this.setState((state) => {
    //         return {
    //             done: !state.done
    //         }
    //     });
    // };

    // onMarkImportant = () => {
    //     this.setState((state) => {
    //         return {
    //             important: !state.important
    //         }

    //     });
    // };

    render() {
        const { label, onDeleted, onToggleImportant, onToggleDone, important, done } = this.props;

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
                <span className="todo-list-item-label"
                    onClick={onToggleDone}>{label}</span>

                <div className="buttons">
                    <button type="button" className="btn btn-outline-success btn-sm float-right"
                        onClick={onToggleImportant}>
                        <i className="fa fa-exclamation" />
                    </button>

                    <button type="button" className="btn btn-outline-danger btn-sm float-right"
                    onClick = {onDeleted}>
                        <i className="fa fa-trash-o" />
                    </button>
                </div>


            </span>
        )
    }
}


export default TodoListItem;