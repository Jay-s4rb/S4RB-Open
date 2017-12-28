import React, { Component } from 'react';

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
