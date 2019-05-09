import React from "react";
import ReactDOM from "react-dom";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import "./app.css";

class App extends React.Component {
  maxId = 1;
  state = {
    todoData: [
      this.createTodoItem("Drink coffe"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    term: "",
    filter: "all" //active,all, done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(state => {
      const idx = state.todoData.findIndex(el => {
        return el.id === id;
      });
      //state.todoData.splice(idx, 1);

      //[a,b,c,d,e]
      //[a,b,  d,e]
      // const before = state.todoData.slice(0, idx);
      // const after = state.todoData.slice(idx + 1);

      const newArr = [
        ...state.todoData.slice(0, idx),
        ...state.todoData.slice(idx + 1)
      ];
      return {
        todoData: newArr
      };
    });
  };

  addItem = text => {
    //generet id ?
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  onToggleDone = id => {
    this.setState(state => {
      const idx = state.todoData.findIndex(el => {
        return el.id === id;
      });
      const oldItem = state.todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArr = [
        ...state.todoData.slice(0, idx),
        newItem,
        ...state.todoData.slice(idx + 1)
      ];
      return {
        todoData: newArr
      };
    });
  };

  onToggleImportant = id => {
    this.setState(state => {
      const idx = state.todoData.findIndex(el => {
        return el.id === id;
      });
      const oldItem = state.todoData[idx];
      const newItem = { ...oldItem, important: !oldItem.important };
      const newArr = [
        ...state.todoData.slice(0, idx),
        newItem,
        ...state.todoData.slice(idx + 1)
      ];
      return {
        todoData: newArr
      };
    });
  };

  onChangeTerm = term => {
    this.setState({ term });
  };
  onFilterChange = filter => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.done);
    } else if (filter === "done") {
      return items.filter(item => item.done);
    } else {
      return items;
    }
  }
  render() {
    const visiblItems = this.filter(
      this.search(this.state.todoData, this.state.term),
      this.state.filter
    );
    const doneCount = this.state.todoData.filter(el => {
      return el.done;
    }).length;

    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div>
          <div className="panel">
            <SearchPanel onChangeTerm={this.onChangeTerm} />
            <ItemStatusFilter
              filter={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
          </div>
          <TodoList
            todos={visiblItems}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
        </div>
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
