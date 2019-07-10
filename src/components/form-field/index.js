import React from 'react';

import './style.css';

export const FormField = ({ label, help, children }) => (
  <label className="form-field">
    {label && <div className="form-field__label">{label}</div>}
    {children}
    {help && <small className="form-field__help">{help}</small>}
  </label>
);

export const FormGroup = ({ label, help, children, disabled }) => (
  <fieldset className="form-field form-field--group" disabled={disabled}>
    {label && <legend className="form-field__label">{label}</legend>}
    {children}
    {help && <small className="form-field__help">{help}</small>}
  </fieldset>
);

export default FormField;
