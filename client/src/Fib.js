import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }
  
  async fetchValues() {
    const values = await axios.get('/api/values/calculatedvalues');
    console.log("Calculated Values  is ", values)
    console.log("Array is  ", values.data)

    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/indexes');
    console.log("Indexes return value is ", seenIndexes)
    
    this.setState({ seenIndexes: seenIndexes.data });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });

    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    this.state.values.forEach( val => console.log('Val is ', val) )


    // for (let key in this.state.values) {
    //   console.log('Key is ', key)
    //   entries.push(
    //     <div key={key}>
    //       For index {key} I calculated {this.state.values[key]}
    //     </div>
    //   );
    // }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index - JoeN Change:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
