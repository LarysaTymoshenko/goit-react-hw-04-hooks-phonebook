import React, { Component } from "react";
import { nanoid } from "nanoid";
import Form from "../Form/Form";
import Section from "../Section/Section";
import ListContacts from "../ListContacts/ListContacts";
import Filter from "../Filter/Filter";

export default class App extends Component {
  state = {
    contact: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contact");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contact: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContact = this.state.contact;
    const prevContact = prevState.contact;

    if (nextContact !== prevContact) {
      localStorage.setItem("contact", JSON.stringify(nextContact));
    }
  }
  onAddContact = (name, number) => {
    if (this.onCheckContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const obj = { id: nanoid(), name, number };
    this.setState((prevState) => ({ contact: [...prevState.contact, obj] }));
  };

  onCheckContact = (value) => {
    return this.state.contact.find(
      (el) => el.name.toUpperCase() === value.toUpperCase()
    );
  };
  onDeleteContacts = (id) => {
    this.setState((prevState) => ({
      contact: prevState.contact.filter((el) => el.id !== id),
    }));
  };

  onFiltering = (value) => {
    this.setState({ filter: value });
  };
  render() {
    const { contact, filter } = this.state;
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.onAddContact} />
        </Section>
        <Section title="Contact">
          {contact.length >= 2 && (
            <Filter filter={filter} onFilter={this.onFiltering} />
          )}
          <ListContacts
            contact={contact.filter((el) =>
              el.name.toUpperCase().includes(filter.toUpperCase())
            )}
            onDelete={this.onDeleteContacts}
          />
        </Section>
      </>
    );
  }
}
