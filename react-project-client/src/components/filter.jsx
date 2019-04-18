import React, { Component } from "react";
import Select from "react-select";

const options = [
  { value: "all", label: "All" },
  { value: "school", label: "School" },
  { value: "to-do", label: "To-Do" },
  { value: "work", label: "Work" },
  { value: "reminders", label: "Reminders" }
];

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleFilter(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        id="filter-select"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default Filter;
