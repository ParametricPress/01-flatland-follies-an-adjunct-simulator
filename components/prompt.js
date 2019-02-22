const React = require('react');
const Option = require('./option');
const { filterChildren, mapChildren } = require('idyll-component-children');

class Prompt extends React.Component {


  componentDidMount() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  getOptions() {
    const options = filterChildren(this.props.children, (c) => {
      return (c && c.type && c.type.name && c.type.name.toLowerCase() === 'option');
    });
    if (options.length === 0) {
      return <Option advance={this.props.advance} nextTag={this.props.nextTag}>
        Continue.
      </Option>
    }
    return mapChildren(options, (c) => {
      return React.cloneElement(c, {
        setCurrentPrompt: this.props.setCurrentPrompt,
        advance: this.props.advance,
        nextTag: c.props.nextTag || this.props.nextTag
      })
    });
  }

  getContent() {
    return filterChildren(this.props.children, (c) => {
      return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'option');
    });
  }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, ...props } = this.props;
    return (
      <div {...props}>
        {this.getContent()}
        {this.getOptions()}
      </div>
    );
  }
}

module.exports = Prompt;
