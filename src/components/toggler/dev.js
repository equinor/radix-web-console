import React from 'react';

import Panel from '../panel';
import Toggler from '.';

const content = [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>];

let nextKey = 4;

class DynamicContentTest extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddContent = this.handleAddContent.bind(this);
  }

  handleAddContent() {
    content.push(<li key={nextKey}>{nextKey}</li>);
    nextKey++;
    this.forceUpdate();
  }

  render() {
    return (
      <Panel>
        <Toggler summary="Summary" startVisible>
          <ul>{content}</ul>
        </Toggler>
        <button onClick={this.handleAddContent}>Add content</button>
      </Panel>
    );
  }
}

export default (
  <div className="o-layout-single">
    <DynamicContentTest />
    <Panel>
      <Toggler summary="Summary">
        This
        <br />
        is
        <br />
        initially
        <br />
        hidden
      </Toggler>
    </Panel>
  </div>
);
