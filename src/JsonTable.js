import React, { Component } from 'react';
import './JsonTable.css';

class JsonTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data,
		};
	}
  render() {
    return (
      <div className="JsonTable">
			</div>
    );
  }
}

export default JsonTable;
