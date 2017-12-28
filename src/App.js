import React, { Component } from 'react';
import './App.css';
import JsonTable from './JsonTable';
import SelectGroupBy from './SelectGroupBy';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupBy: this.props.groupBy,
			data: this.buildData(this.props.data, this.props.groupBy),
		};
	}
	buildData(data, groupBy) {
		if (groupBy === 'month') {
			data.map(() => {});
		}
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Complaints Per Million Units</h1>
					<SelectGroupBy default={this.state.groupBy}/>
        </header>
        <JsonTable data={ this.state.data } />
      </div>
    );
  }
}

export default App;
