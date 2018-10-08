import React from 'react';

import './style.css';

export const FormField = ({ label, help, children }) => (
  <label className="form-field">
    {label && <div className="form-field__label">{label}</div>}
    {children}
    <small className="form-field__help">{help}</small>
  </label>
);

export default FormField;
