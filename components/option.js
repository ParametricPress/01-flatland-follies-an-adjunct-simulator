const React = require('react');
const { filterChildren, mapChildren } = require('idyll-component-children');

class Option extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getNestedPrompt() {
    return  filterChildren(this.props.children, (c) => {
      return (c && c.type && c.type.name && c.type.name.toLowerCase() === 'prompt');
    })
  }

  handleClick() {
    const nestedPrompt = this.getNestedPrompt();
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    if (nestedPrompt.length) {
      this.props.setCurrentPrompt(nestedPrompt);
    } else {
      this.props.advance(this.props.nextTag);
    }
  }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, ...props } = this.props;

    if (props.if !== undefined && props.if === false) {
      return null;
    }
    return (
      <div {...props}>
        <div onClick={this.handleClick} style={{color: '#D9CCFF', cursor: 'pointer'}}>
          {
            filterChildren(children, (c) => {
              return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'prompt');
            })
          }
        </div>
      </div>
    );
  }
}

module.exports = Option;
