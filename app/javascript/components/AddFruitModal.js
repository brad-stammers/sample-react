import React from "react"
import PropTypes from "prop-types"
import { Button, Header, Form, Modal } from "semantic-ui-react"
class AddFruitModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, fruits: []};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewFruit = this.addNewFruit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);  
  }
  
  handleFormSubmit(name, desc) {
    let body = JSON.stringify({fruit: {name: name, desc: desc}});
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },

      body: body,
    }).then((fruit) => {this.addNewFruit(fruit)})
  }
  addNewFruit(fruit) {
    this.setState({ fruits: this.props.fruits.concat(fruit), visible: false, })
  }
  showModal = () => {
    this.setState({ visible: true, });
  };
  handleCancel = () => {
    this.setState({ visible: false, });
  };
  
  render () {
    let formFields = {};
    return (
      <React.Fragment>
        <Button onClick={this.showModal} className="ui small primary basic button">Add Fruit</Button>
        <Modal open={this.state.visible} size="small">
          <Header content="New Fruit" />
          <Modal.Content>
            <Form onSubmit={(e) => {
              this.handleFormSubmit(formFields.name.value, formFields.desc.value);
              e.target.reset();
            }}>
              <div class="field">
                <label>Name</label>
                <div class="seven wide field">
                  <div class="ui input"><input type="text" ref={input => formFields.name = input} placeholder="Fruit name" /></div>
                </div>
              </div>
              <div class="field">
                <label>Description</label>
                <div class="seven wide field">
                  <div class="ui input"><input type="text" ref={input => formFields.desc = input} placeholder="Fruit description" /></div>
                </div>
              </div>
              <Button negative type="button" icon="remove" labelPosition="right" onClick={this.handleCancel} content="Cancel" />
              <Button positive type="submit" icon="checkmark" labelPosition="right" content="Save" />
            </Form>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}


export default AddFruitModal
