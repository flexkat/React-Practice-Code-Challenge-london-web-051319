import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    allSushi: [],
    selectedSushi: "",
    eatenSushi: [],
    balance: 100,
    emptyPlates: []
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(data => this.setState({
      allSushi: data
    }))
  }

  eatSushi = (sushi) => {
    if (this.state.balance < sushi.price) return sushi;

    const newBalance = this.state.balance - sushi.price
    
    this.setState({
      eatenSushi: [...this.state.eatenSushi, sushi],
      balance: newBalance,
      // allSushi: remainingSushi,
      emptyPlates: [...this.state.emptyPlates, sushi]
    })
  }

  

  handleClick = () => {
    const eatenSushi = this.state.eatenSushi;
    const remainingSushi = this.state.allSushi.filter(each => !eatenSushi.includes(each))
    this.setState({
      allSushi: remainingSushi,
      emptyPlates: []
    })
  }

  // handleChange = (event) => {
  //   this.setState({
  //     balance: event.target.value
  //   })
  // }
  handleSubmit = (event) => {
    event.preventDefault();

    const newBalance = parseInt(event.target.firstChild.value) + parseInt(this.state.balance)
    this.setState({
      balance: newBalance
    })
  }

  render() {
    const renderSushi = this.state.allSushi.slice(0,4)
    return (
      <div className="app">
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type="number" name="balance" placeholder="Add to your balance" />
        <input type='submit' value='submit'/>
      </form>
      {this.state.allSushi.length > 1 ? 
        <SushiContainer allSushi={this.state.allSushi} emptyPlates={this.state.emptyPlates} eatSushi={this.eatSushi} handleClick={this.handleClick} renderSushi={renderSushi}/> 
        : <div/>}
        
        <Table balance={this.state.balance} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;