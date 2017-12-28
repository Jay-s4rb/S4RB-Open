import React, { Component } from 'react';
import './SelectGroupBy.css';

class SelectGroupBy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [
				{id: 'month', text: 'Group By Month' },
				{id: 'quarter', text: 'Group By Quarter' },
			]
		};
	}
  render() {
    return (
      <select onChange={this.props.onChange}>
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
