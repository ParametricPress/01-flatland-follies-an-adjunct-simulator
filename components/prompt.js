const React = require('react');
import Typist from 'react-typist';
const Option = require('./option');
const { filterChildren, mapChildren } = require('idyll-component-children');

class Prompt extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    }
    this.doneTyping = this.doneTyping.bind(this);
  }

  doneTyping() {
    this.setState({
      showOptions: true
    })
  }

  componentDidMount() {
    this.setState({ showOptions: false })
    if (this.props.onShow) {
      console.log('triggering onshow callback');
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
        nextTag: c.props.nextTag || this.props.nextTag,
        heading: c.props.heading || this.props.heading
      })
    });
  }

  getContent(props) {
    const handleChild = (c) => {
      if (typeof c === 'string') {
        return c;
      } else if (c && c.type && typeof c.type === 'string' && c.type.toLowerCase() === 'p' && c.props.children.length === 1) {
        return [c.props.children[0], React.createElement('br'), React.createElement('br'), ];
      }

      return [c, React.createElement('br'), React.createElement('br'), ];
    };
    const ret = mapChildren(filterChildren(props.children, (c) => {
      return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'option');
    }), handleChild);
    return ret;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.getContent(prevProps).join(' ') !== this.getContent(this.props).join(' ')) {
      this.setState({
        showOptions: false
      })
    }
  }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, nextTag, onShow, heading, ...props } = this.props;
    const { showOptions } = this.state;
    return (
      <div {...props} key={this.getContent(this.props).join('-')}>
        { heading ? <div className="parametric-if-heading">{heading}</div> : null}
        <Typist avgTypingDelay={40} stdTypingDelay={5} onTypingDone={this.doneTyping}>{this.getContent(this.props)}</Typist>
        <br/>
        <div className="parametric-if-options" style={{opacity: showOptions ? 1 : 0}}>
          {this.getOptions()}
        </div>
      </div>
    );
  }
}

module.exports = Prompt;
