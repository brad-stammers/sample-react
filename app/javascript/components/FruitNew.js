import React from "react"
import PropTypes from "prop-types"
class FruitNew extends React.Component {
  render () {
    let formFields = {};
    return (
      <React.Fragment>
        <form onSubmit={ (e) => {
          this.props.handleFormSubmit(formFields.name.value, formFields.desc.value);
          e.target.removeEventListener();
        }}>
          <input ref={input => formFields.name = input} placeholder="Enter the name" />
          <input ref={input => formFields.desc = input} placeholder="Enter the description" />
          <button>Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

FruitNew.propTypes = {
  fruit: PropTypes.node
};
export default FruitNew
