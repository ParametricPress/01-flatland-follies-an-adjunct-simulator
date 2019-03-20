const React = require('react');
const { filterChildren, mapChildren } = require('idyll-component-children');

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getNestedPrompt() {
    const propmts = filterChildren(this.props.children, (c) => {
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
    if (this.props.onSelect) {
      console.log('triggering onselect callback');
      this.props.onSelect();
    }
    if (nestedPrompt.length) {
      this.props.setCurrentPrompt(nestedPrompt);
    } else {
      this.props.advance(this.props.nextTag);
    }
  }

  getContent() {
    const { children } = this.props;
    const options = filterChildren(children, (c) => {
      return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'prompt');
    })

    const handleChild = (c) => {
      if (typeof c === 'string') {
        return c;
      } else if (c && c.type && c.type.toLowerCase() === 'p' && c.props.children.length === 1) {
        return c.props.children[0];
      }

      return c;
    };

    return mapChildren(options, handleChild);
  }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, nextTag, heading, ...props } = this.props;

    if (props.if !== undefined && props.if === false) {
      return null;
    }
    return (
      <div {...props}>
        <div onClick={this.handleClick} style={{color: '#D9CCFF', cursor: 'pointer'}}>
          {
            this.getContent()
          }
        </div>
      </div>
    );
  }
}

module.exports = Option;
