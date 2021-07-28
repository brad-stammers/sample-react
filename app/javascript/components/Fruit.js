import React from "react"
import PropTypes from "prop-types"
class Fruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit() {
    if (this.state.editable) {
      let name = this.name.value;
      let desc = this.desc.value;
      let id = this.props.fruit.id;
      let fruit = { id: id, name: name, desc: desc };
      this.props.handleUpdate(fruit);
    }
    this.setState({ editable: !this.state.editable })
  }

  render () {
    let name = this.state.editable ? <input ref={input => this.name = input} defaultValue={this.props.fruit.name} /> : <h3>{this.props.fruit.name}</h3>;
    let desc = this.state.editable ? <input ref={input => this.desc = input} defaultValue={this.props.fruit.desc} /> : <h5>{this.props.fruit.desc}</h5>;
    return (
      <React.Fragment>
        <td>{name}</td>
        <td>{desc}</td>
        <td>
          <button onClick={() => this.handleEdit()}>{this.state.editable ? "Submit" : "Edit"}</button>
          <button onClick={() => this.props.handleDelete(this.props.fruit.id)}>Delete</button>
        </td>
        
      </React.Fragment>
    );
  }
}

export default Fruit
