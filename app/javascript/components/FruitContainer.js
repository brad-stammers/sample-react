import React from "react"
import PropTypes from "prop-types"
import FruitIndex from "./FruitIndex"
import FruitNew from "./FruitNew"
import Fruit from "./Fruit"
import AddNewModal from "./AddNewModal"
class FruitContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fruits: [] };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewFruit = this.addNewFruit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteFruit = this.deleteFruit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this);
  };
  handleUpdate(fruit) {
    fetch('http://localhost:3000/api/v1/fruits/' + fruit.id, {
      method: 'PUT',
      body: JSON.stringify({ fruit: fruit }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => { this.updateFruit })
  }
  updateFruit(fruit) {
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id);
    newFruits.push(fruit);
    this.setState({ fruits: newFruits })
  }
  handleDelete(id) {
    fetch('http://localhost:3000/api/v1/fruits/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => { this.deleteFruit(id) })
  }
  deleteFruit(id) {
    newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
    this.setState({ fruits: newFruits })
  }
  handleFormSubmit(name, desc) {
    let body = JSON.stringify({fruit: {name: name, desc: desc}})
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    }).then((fruit) => {this.addNewFruit(fruit)})
  }
  addNewFruit(fruit) {
    this.setState({ fruits: this.state.fruits.concat(fruit)})
  }

  componentDidMount() {
    fetch('/api/v1/fruits.json')
      .then((response) => { return response.json()})
      .then((data) => { this.setState({ fruits: data })});
  }

  render () {
    return (
      <React.Fragment>
        {/* <FruitNew handleFormSubmit={this.handleFormSubmit} /> */}
        <AddNewModal />
        <FruitIndex fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
      </React.Fragment>
    );
  }
}

export default FruitContainer
