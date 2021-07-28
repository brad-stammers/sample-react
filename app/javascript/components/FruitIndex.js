import React from "react"
import PropTypes from "prop-types"
import Fruit from "./Fruit"
class FruitIndex extends React.Component {
  render () {
    var fruits = this.props.fruits.map((fruit) => {
      return(
        <tr key={fruit.id}>
          <Fruit fruit={fruit} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} />
        </tr>
      )
    })
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {fruits}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default FruitIndex
