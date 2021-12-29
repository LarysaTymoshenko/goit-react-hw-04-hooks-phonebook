import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "../Form/Form";
import Section from "../Section/Section";
import ListContacts from "../ListContacts/ListContacts";
import Filter from "../Filter/Filter";
import { getFromLS, setInLS } from "../../utilits/localstorage";

export default function App() {
  const [contacts, setContacts] = useState(getFromLS("contacts"));
  const [filter, setFilter] = useState("");

  const onCheckContact = (value) => {
    return contacts.find((el) => el.name.toUpperCase() === value.toUpperCase())
      ? true
      : false;
  };

  const onAddContact = (name, number) => {
    if (onCheckContact(name)) {
      alert(`${name} and  is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts((contacts) => [newContact, ...contacts]);
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
    setInLS("contacts", contacts);
  }, [contacts]);
  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={onAddContact} />
      </Section>
      <Section title="Contact">
        <Filter filter={filter} onFilter={setFilter} />
        <ListContacts listContacts={onFiltering} onDelete={onDeleteContacts} />
      </Section>
    </>
  );
}
