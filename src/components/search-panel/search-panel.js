import React from "react";

import "./search-panel.css";

class SearchPanel extends React.Component {
  state = {
    term: ""
  };

  onChangeTermIn = (e) =>{
    const term = e.target.value;
    this.setState({term});
    this.props.onChangeTerm(term);
  }
  

  render() {
    return (
      <input
        className="search-input"
        placeholder="search"
        value={this.state.term}
        onChange={this.onChangeTermIn}
      />
    );
  }
}

export default SearchPanel;
