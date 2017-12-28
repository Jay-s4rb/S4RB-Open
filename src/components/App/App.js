import React, { Component } from 'react';
import './App.css';
import JsonTable from '../JsonTable/JsonTable';
import SelectGroupBy from '../SelectGroupBy/SelectGroupBy';
import TableRender from '../../modules/TableRender';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateTheDataAndUpdateTableView = this.updateTheDataAndUpdateTableView.bind(this);

    // Set the initial state
    // Call a method to format the data according the initial value set for the group by
    this.state = {
      groupBy: this.props.groupBy,
      data: TableRender.render(this.props.data, this.props.groupBy),
    };
  }
  // Method called onchange of the groupBy select dropdown
  updateTheDataAndUpdateTableView(event) {
    // Set the state according to the new value
    this.setState({ groupBy: event.target.value });

    // Set the data formatted according to the group by
    this.setState({ data: TableRender.render(this.props.data, event.target.value) });
    return true;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Complaints Per Million Units</h1>
          <SelectGroupBy
            default={this.state.groupBy}
            onChange={this.updateTheDataAndUpdateTableView}
          />
        </header>
        <JsonTable data={this.state.data} />
      </div>
    );
  }
}

export default App;
