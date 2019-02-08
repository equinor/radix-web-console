import React from 'react';

import './style.css';

export const FormFieldChoice = ({ children, label }) => (
  <fieldset className="form-field__choice">
    {label && <legend className="form-field__choice__label">{label}</legend>}
    {children}
  </fieldset>
);

export default FormFieldChoice;
