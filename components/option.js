const React = require('react');
const { filterChildren, mapChildren } = require('idyll-component-children');
const ifUtils = require('./if-utils');

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getNestedPrompt() {
    const propmts = filterChildren(this.props.children, (c) => {
      console.log('option children', c);
      return (c && c.type && c.type.name && c.type.name.toLowerCase() === 'prompt');
    });
    return mapChildren(propmts, (c) => {
      return React.cloneElement(c, {
        setCurrentPrompt: this.props.setCurrentPrompt,
        advance: this.props.advance,
        nextTag: c.props.nextTag || this.props.nextTag,
        heading: c.props.heading || this.props.heading
      })
    });

  }

  handleClick() {
    const nestedPrompt = this.getNestedPrompt();

    if (this.props.once) {
      ifUtils.setExpiredOption(this.getContent()[0]);
    }
    console.log('nested prompt: ', nestedPrompt);
    if (this.props.onSelect) {
      console.log('triggering onselect callback');
      this.props.onSelect();
    }
    if (nestedPrompt.length) {
      console.log('Setting prompty!', nestedPrompt);
      this.props.setCurrentPrompt(nestedPrompt);
    } else {
      console.log('no nested prompt');
      this.props.advance(this.props.nextTag);
    }
  }

  isExpired() {
    if (ifUtils.getExpiredOptions().indexOf(this.getContent()[0]) > -1) {
      return true;
    }
    return false;
  }

  getContent() {
    const { children } = this.props;
    const options = filterChildren(children, (c) => {
      return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'prompt');
    })

    const handleChild = (c) => {
      if (typeof c === 'string') {
        return c;
      } else if (c && c.type && typeof c.type === 'string' && c.type.toLowerCase() === 'p' && c.props.children.length === 1) {
        return c.props.children[0];
      }

      return c;
    };

    return mapChildren(options, handleChild);
  }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, nextTag, heading, onSelect } = this.props;

    if ((this.props.if !== undefined && this.props.if === false) || this.isExpired()) {
      return null;
    }
    return (
      <div>
        <div className="parametric-if-option" onClick={this.handleClick}>
          {
            this.getContent()
          }
        </div>
      </div>
    );
  }
}

module.exports = Option;
