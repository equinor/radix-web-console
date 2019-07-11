import React from 'react';

import FormField, { FormGroup } from '.';

export default (
  <div className="o-layout-single">
    <FormField label="Checkbox">
      <input type="checkbox" /> I'm a checkbox
    </FormField>
    <FormField label="Checkbox with help" help="Really, I am">
      <input type="checkbox" /> I'm a helpful checkbox
    </FormField>
    <FormField label="Text area">
      <textarea>Some content</textarea>
    </FormField>
    <FormField label="Standard">
      <input type="text" />
    </FormField>
    <FormField label="Disabled">
      <input type="text" disabled value="Some value" />
    </FormField>
    <FormField label="Invalid" help="This should be an email address">
      <input type="email" value="Not an email" />
    </FormField>

    <FormGroup label="Some options">
      <FormField help="Really, I am">
        <input type="checkbox" /> I'm a helpful checkbox
      </FormField>
      <FormField>
        <input type="checkbox" /> I'm not helpful
      </FormField>
      <FormField help="Yay!">
        <input type="checkbox" /> But I am
      </FormField>
    </FormGroup>

    <FormGroup label="Some exclusive options">
      <FormField help="Really, I am">
        <input type="radio" name="radio1" /> I'm a helpful radio button
      </FormField>
      <FormField>
        <input type="radio" name="radio1" /> I'm not helpful
      </FormField>
      <FormField help="Yay!">
        <input type="radio" name="radio1" /> But I am
      </FormField>
    </FormGroup>

    <FormGroup label="Something complex">
      <p>A bunch of options</p>
      <FormField help="This is option 1">
        <input name="opt" type="radio" /> Option 1
      </FormField>
      <FormField help="This is option 2">
        <input name="opt" type="radio" />
        <span>
          Option <strong>two</strong>
        </span>
      </FormField>
      <FormField>
        <input name="opt" type="radio" /> Option 3
        <FormField label="Nested" help="Ooooh, nested fields">
          <input type="text" />
        </FormField>
      </FormField>
      <FormField>
        <input name="opt" type="radio" /> Opt 4
        <FormGroup disabled>
          <FormField label="Nested" help="Ooooh, more nested fields">
            <textarea>Boo</textarea>
          </FormField>
          <FormField label="Multiple" help="Multiple!">
            <input type="text" />
          </FormField>
          <FormField label="Nested" help="Nested!!">
            <input type="text" />
          </FormField>
          <FormField label="Fields" help="FIELDS!!!">
            <input type="text" />
          </FormField>
        </FormGroup>
      </FormField>
    </FormGroup>
  </div>
);
