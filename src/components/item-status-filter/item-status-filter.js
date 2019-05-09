import React from "react";
import "./item-status-filter.css";

class ItemStatusFilter extends React.Component {
  buttons = [
    { name: "all", label: "all" },
    { name: "active", label: "active" },
    { name: "done", label: "done" }
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}

export default ItemStatusFilter;