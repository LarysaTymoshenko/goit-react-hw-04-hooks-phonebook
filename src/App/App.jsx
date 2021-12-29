import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "../Form/Form";
import Section from "../Section/Section";
import ListContacts from "../ListContacts/ListContacts";
import Filter from "../Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem("contacts")) ?? ""
  );
  const [filter, setFilter] = useState("");

  const onCheckContact = (value) => {
    return contacts.find((el) => el.name.toUpperCase() === value.toUpperCase())
      ? true
      : false;
  };

  const onAddContact = (name, number) => {
    if (onCheckContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const obj = { id: nanoid(), name, number };
    setContacts([...contacts, obj]);
  };

  const onDeleteContacts = (id) => {
    setContacts((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };

  const onFiltering = () => {
    const lowerCaseLetters = filter.toLowerCase().trim();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerCaseLetters)
    );
  };

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={onAddContact} />
      </Section>
      <Section title="Contact">
        <Filter filter={filter} onFilter={setFilter} />
        <ListContacts contact={onFiltering} onDelete={onDeleteContacts} />
      </Section>
    </>
  );
}
