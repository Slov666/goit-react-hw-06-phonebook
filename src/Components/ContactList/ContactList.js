import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import contactsAction from "../../redux/contacts/contactsAction";
import style from "./ContactList.module.css";

import ContactListItem from '../ContactListItem/ContactListItem'

const ContactList = ({ contacts }) => {
  const {ul } = style;
  return (
    <>
      <TransitionGroup component="ul" className={ul}>
        {contacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={250} classNames={style}>
            <ContactListItem id={contact.id}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

const mapStateToProps = (state) => {
  const { items, filter } = state.contacts;
  const normalizeFilter = filter.toLowerCase();
  const vibibleContact = items.filter((item) =>
    item.name.toLowerCase().includes(normalizeFilter)
  );
  return { contacts: vibibleContact };
};
const mapDispatchToProps = {
  onRemoveContact: contactsAction.removeContact,
};

ContactList.propTypes = {
  contacts: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
