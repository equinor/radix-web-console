import React from 'react';
import classNames from 'classnames';

import './style.css';

class Toggler extends React.Component {
  constructor(props) {
    super(props);

    this.animating = false;

    this.state = {
      visible: !!props.startVisible,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.refContent = this.refContent.bind(this);
    this.collapseSection = this.collapseSection.bind(this);
    this.expandSection = this.expandSection.bind(this);
  }

  handleToggle() {
    if (this.animating) {
      return;
    }

    this.animating = true;

    if (this.state.visible) {
      this.collapseSection(this.contentEl);
    } else {
      this.expandSection(this.contentEl);
    }
  }

  refContent(el) {
    if (el && !this.props.startVisible && !this.state.visible) {
      el.style.height = 0;
      el.style.display = 'none';
    }

    this.contentEl = el;
  }

  // Adapted from https://css-tricks.com/using-css-transitions-auto-dimensions/
  collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = element.scrollHeight;

    // temporarily disable all css transitions
    const elementTransition = element.style.transition;
    element.style.transition = '';
    element.style.overflow = 'hidden';
    this.setState({ visible: false });

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(() => {
        element.style.height = 0;

        const handler = () => {
          // remove this event listener so it only gets triggered once
          element.removeEventListener('transitionend', handler);

          // remove element from document render tree
          element.style.display = 'none';
          element.style.overflow = null;
          this.animating = false;
        };

        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', handler);
      });
    });
  }

  // Adapted from https://css-tricks.com/using-css-transitions-auto-dimensions/
  expandSection(element) {
    element.style.display = null;
    element.style.overflow = 'hidden';
    this.setState({ visible: true });

    // must force calculation of opacity to animate it from `display: none`; it
    // doesn't work otherwise even after `requestAnimationFrame()`
    // see https://stackoverflow.com/a/13451959/2319856
    (() => getComputedStyle(element).opacity)();

    // on the next frame (as soon as the previous style change has taken effect),
    // we can read the scrollHeight (the element has height 0, but is in the
    // render tree)
    requestAnimationFrame(() => {
      // get the height of the element's inner content, regardless of its actual size
      const sectionHeight = element.scrollHeight;

      // have the element transition to the height of its inner content
      element.style.height = sectionHeight + 'px';

      const handler = () => {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', handler);

        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
        element.style.overflow = null;
        this.animating = false;
      };

      // when the next css transition finishes (which should be the one we just triggered)
      element.addEventListener('transitionend', handler);
    });
  }

  render() {
    const className = classNames('toggler', {
      'toggler--visible': this.state.visible,
    });

    return (
      <div className={className}>
        <button
          aria-expanded={this.state.visible ? 'true' : 'false'}
          className="toggler__bar"
          onClick={this.handleToggle}
        >
          <div className="toggler__summary">{this.props.summary}</div>
          <div className="toggler__indicator" />
        </button>
        <div className="toggler__content" ref={this.refContent}>
          <div className="toggler__content-inner">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Toggler;
