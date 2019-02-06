import React from 'react';

import './style.css';

export const FormFieldChoiceOption = ({ children, help }) => (
  <div className="form-field__choice-option">
    {children}
    {help && <small className="form-field__choice-option__help">{help}</small> }
  </div>
);

export default FormFieldChoiceOption;
