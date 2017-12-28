import React, { Component } from 'react';
import './SelectGroupBy.css';

class SelectGroupBy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [
				{id: 1, text: 'Group By Month' },
				{id: 2, text: 'Group By Quarter' },
			]
		};
	}
  render() {
    return (
      <select>
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
