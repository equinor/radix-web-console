import React from 'react';

import './style.css';

export const FormField = ({ label, children }) => (
  <label className="form-field">
    {label && <div className="form-field__label">{label}</div>}
    {children}
  </label>
);

export default FormField;
