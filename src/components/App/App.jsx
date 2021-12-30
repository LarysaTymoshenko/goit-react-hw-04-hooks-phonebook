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
    return contacts.find((el) => el.name.toUpperCase() === value.toUpperCase());
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

  //

  useEffect(() => {
    setInLS("contacts", contacts);
  }, [contacts]);
  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={onAddContact} />
      </Section>
      <Section title="Contact">
        {contacts.length >= 2 && (
          <Filter filter={filter} onFilter={setFilter} />
        )}
        <ListContacts contacts={contacts} onDelete={onDeleteContacts} />
      </Section>
    </>
  );
}
