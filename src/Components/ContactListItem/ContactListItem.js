import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import contactsAction from "../../redux/contacts/contactsAction";
import style from "./ContactListItem.module.css";

function ContactListItem({ name, number, onRemove }) {
  const { container, button, item, span } = style;
  return (
    <li className={container}>
      <div className={item}>
        <span className={span}>Name:</span> {name}
      </div>

      <div className={item}>
        <span className={span}>Ph.</span> {number}
      </div>
      <button className={button} type="button" onClick={onRemove}></button>
    </li>
  );
}

const mapStateToProps = (state, ownProps) => {
  const contact = state.contacts.items.find((item) => item.id === ownProps.id);
  return { ...contact };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemove: () => dispatch(contactsAction.removeContact(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onRemove: PropTypes.func,
};
