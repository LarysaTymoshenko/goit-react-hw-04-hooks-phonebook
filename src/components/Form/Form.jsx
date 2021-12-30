import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        NAME
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {""}
      </label>
      <label className={s.label}>
        NUMBER
        <input
          type="tel"
          name="number"
          className={s.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          value={number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}

Form.protoType = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  // onAddContact: PropTypes.func.isRequired,
};
