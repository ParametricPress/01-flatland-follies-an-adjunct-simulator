const React = require('react');
const { filterChildren, mapChildren } = require('idyll-component-children');
const ifUtils = require('./if-utils');

class InteractiveFiction extends React.Component {

  constructor(props) {
    super(props);
    this.setCurrentPrompt = this.setCurrentPrompt.bind(this);
  }

  setCurrentPrompt(prompt) {
    this.props.updateProps({
      currentPrompt: prompt
    })
  }

  getCurrentPrompt() {
    const { currentPrompt, tag, children } = this.props;
    if (currentPrompt) {
      return mapChildren(currentPrompt, (c) => {
        return React.cloneElement(c, {
          setCurrentPrompt: this.setCurrentPrompt,
          advance: this.props.advance,
        })
      })
    }

    const possibleChildren = mapChildren(filterChildren(children, (c) => {
      const isPrompt = (c.type.name && c.type.name.toLowerCase() === 'prompt') && c.props.tag === tag;
      if (!isPrompt) {
        return false;
      }
      if (c.props.once && ifUtils.getExpiredPrompts().indexOf(c.props.id) > -1) {
        return false;
      }
      return true;
    }), (c) => {
      return React.cloneElement(c, {
        setCurrentPrompt: this.setCurrentPrompt,
        advance: this.props.advance,
      })
    })

    if (possibleChildren.length < 2) {
      return possibleChildren;
    }

    if (possibleChildren.every((c) => {
      return c.props.likelihood;
    })) {
      // TODO get random likelihood
    }

    return [possibleChildren[Math.floor(Math.random() * possibleChildren.length)]];
  }

  render() {
    const { hasError, idyll, updateProps, children, tag, currentPrompt, advance, started, ...props } = this.props;
    if (!started) {
      return null;
    }
    return (
      <div {...props}>
        {
          this.getCurrentPrompt()
        }
      </div>
    );
  }
}

module.exports = InteractiveFiction;
