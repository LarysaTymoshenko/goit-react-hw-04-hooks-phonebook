import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

export default class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleInput = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);
    this.reset();
  };
  reset = () => {
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label htmlFor="name" className={s.label}>
          NAME
          <input
            className={s.input}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInput}
          />
          {""}
        </label>
        <label htmlFor="name" className={s.label}>
          NUMBER
          <input
            type="tel"
            name="number"
            className={s.input}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            value={this.state.number}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInput}
          />
        </label>
        <button type="submit" className={s.button}>
          {" "}
          Add contact
        </button>
      </form>
    );
  }
}

Form.protoType = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onAddContact: PropTypes.func.isRequired,
};
