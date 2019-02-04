import React from 'react';

import './style.css';

export const FormFieldChoice = ({ children, label }) => (
  <div className="form-field__choice">
    {label && <label className="form-field__choice__label">{label}</label>}
    {children}
  </div>
);

export default FormFieldChoice;
