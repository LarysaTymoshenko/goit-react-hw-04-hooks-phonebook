import React from "react";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";
import s from "./ListContact.module.css";

const ListContacts = ({ contacts = [], onDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <ContactItem
              className={s.item}
              id={id}
              name={name}
              number={number}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
ListContacts.propTypes = {
  listContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
export default ListContacts;
