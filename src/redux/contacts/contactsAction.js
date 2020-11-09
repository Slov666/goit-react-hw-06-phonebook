import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ADD, REMOVE, FILTER, LOCAL_STOREGE } from "./contactsConstans";

const addContact = createAction(ADD, (name, number) => ({
  payload: {
    item: {
      id: uuidv4(),
      name,
      number,
    },
  },
}));

const removeContact = createAction(REMOVE);
const filter = createAction(FILTER);
const getLocalStorage = createAction(LOCAL_STOREGE);

export default {
  addContact,
  removeContact,
  filter,
  getLocalStorage,
};
