import React, { Component } from 'react';

class SelectGroupBy extends Component {
	constructor(props) {
		super(props);

		// Hardcoded the options for now, this could be fed in from the parent component in the future
		this.state = {
			options: [
				{id: 'month', text: 'Group By Month' },
				{id: 'quarter', text: 'Group By Quarter' },
			]
		};
	}
  render() {
    return (
      <select onChange={this.props.onChange} value={this.props.default}>
				{
					this.state.options.map((option) => {
						return (<option key={option.id} value={option.id}>{option.text}</option>);
					})
				}
			</select>
    );
  }
}

export default SelectGroupBy;
