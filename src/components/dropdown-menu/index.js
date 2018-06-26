import React from 'react';

import Button from '../button';

const defaultButtonProps = {
  type: 'default',
};

export class DropdownToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.startOpen };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const buttonProps = Object.assign(
      {},
      defaultButtonProps,
      this.props.buttonProps
    );
    return (
      <React.Fragment>
        <Button {...buttonProps} onClick={this.toggle}>
          {this.props.label}
        </Button>
        {this.state.open && this.props.children}
      </React.Fragment>
    );
  }
}

export default DropdownToggle;
