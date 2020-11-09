import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import contactsAction from "./contactsAction";

const addContact = (state, action) => {
  const contact = action.payload.item;
  const contactsLocalStorege = localStorage.getItem("contacts");
  if (!contactsLocalStorege) {
    localStorage.setItem("contacts", JSON.stringify([contact]));
  } else {
    const parseContacts = JSON.parse(contactsLocalStorege);
    localStorage.setItem(
      "contacts",
      JSON.stringify([...parseContacts, contact])
    );
  }
  return [...state, contact];
};
const removeContact = (state, { payload }) => {
  const getLS = JSON.parse(localStorage.getItem("contacts"));
  const newLS = getLS.filter((item) => item.id !== payload);
  localStorage.setItem("contacts", JSON.stringify(newLS));

  return state.filter((item) => item.id !== payload);
};
const getFromLS = (state, action) => action.payload;

const contactReducer = createReducer([], {
  [contactsAction.addContact]: addContact,
  [contactsAction.removeContact]: removeContact,
  [contactsAction.getLocalStorage]: getFromLS,
});

const filterReducer = createReducer("", {
  [contactsAction.filter]: (state, action) => action.payload,
});

// const items = (state = [], { type, payload }) => {
//   switch (type) {
//     case contactsAction.addContact.type:
//       return [...state, payload.item];
//     case contactsAction.removeContact.type:
//       return state.filter((item) => item.id !== payload);
//     default:
//       return state;
//   }
// };

export default combineReducers({
  items: contactReducer,
  filter: filterReducer,
});
