import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import style from "./ContactForm.module.css";

import contactsAction from "../../redux/contacts/contactsAction";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleOnChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    const isInclude = this.props.contacts.some(
      (item) => item.name === this.state.name
    );
    if (isInclude) {
      this.props.openModal();
      this.setState({ name: "", number: "" });
      return;
    }

    this.props.onAddContact(name, number);
    this.setState({ name: "", number: "" });
  };
  render() {
    const { form, label, input, button } = style;
    const { name, number } = this.state;
    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <label className={label}>
          Name
          <input
            className={input}
            type="text"
            name="name"
            onChange={this.handleOnChange}
            value={name}
            placeholder="Enter name"
          />
        </label>
        <label className={label}>
          Number
          <input
            className={input}
            type="number"
            name="number"
            onChange={this.handleOnChange}
            value={number}
            placeholder="Enter number"
            required
          />
        </label>
        <button className={button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func,
  openModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = {
  onAddContact: contactsAction.addContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
