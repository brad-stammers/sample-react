import React from "react"
import PropTypes from "prop-types"
import { Button, Form, Input, Modal } from "antd"

class AddNewModal extends React.Component {
  formRef = React.createRef();
  state = { visible: false, };

  onFinish = (values) => {
    let body = JSON.stringify(values)
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    }).then((data) => { return data.json()})
    .then(() => {this.state.visible = false;})
  }

  showModal = () => {
    this.setState({ visible: true, });
  };

  handleCancel = () => {
    this.setState({ visible: false, });
  };

  render () {
    return (
      <React.Fragment>
        <Button type="primary" onClick={this.showModal}>Create New</Button>
        <Modal title="Add New Fruit" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Input fruit name" />
            </Form.Item>
            <Form.Item name="desc" label="Description">
              <Input placeholder="Input fruit description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>

      </React.Fragment>
    );
  }
}

export default AddNewModal
