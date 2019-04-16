const React = require('react');
// import Typist from 'react-typist';
const Option = require('./option');
const { filterChildren, mapChildren } = require('idyll-component-children');
// const gaussian = require('gaussian');
// const distribution = gaussian(40, 5);

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

  componentDidUpdate(prevProps) {
    if (this.getContent(this.props).join('-') !== this.getContent(prevProps).join('-')) {
      this.props.onShow && this.props.onShow();
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
    let filteredList = filterChildren(props.children, (c) => {
      return !(c && c.type && c.type.name && c.type.name.toLowerCase() === 'option');
    });
    const handleChild = (c, i) => {
      if (typeof c === 'string') {
        return c.trim();
      } else if (c && c.type && typeof c.type === 'string' && c.type.toLowerCase() === 'p' && c.props.children.length === 1) {
        if (i === filteredList.length - 1) {
          return [c.props.children[0].trim()];
        }
        return [c.props.children[0].trim(), React.createElement('br'), React.createElement('br'), ];
      }
      if (i === filteredList.length - 1) {
        return [c];
      }
      return [c, React.createElement('br'), React.createElement('br'), ];
    };
    const ret = mapChildren(filteredList, handleChild);
    return ret;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.getContent(prevProps).join(' ') !== this.getContent(this.props).join(' ')) {
      this.setState({
        showOptions: false
      })
    }
  }

  // delayGenerator(mean, std, {line, lineIdx, character, charIdx, defDelayGenerator}) {
  //   let ret = 40;
  //   if (character === '.') {
  //     if (line.length > charIdx + 1 && line[charIdx + 1] !== " ") {
  //       ret = 40;
  //     } else {
  //       ret = gaussian(750, 50).random(1)[0];
  //     }
  //   } else if (character === '”' && line[charIdx - 1] !== ",") {
  //     ret = gaussian(750, 50).random(1)[0];
  //   } else if ([';', ':'].indexOf(character) > -1) {
  //     ret = gaussian(600, 25).random(1)[0];;
  //   } else if (character === ',') {
  //     return 40;
  //   }

  //   if (ret === 40) {
  //     ret = gaussian(40, 5).random(1)[0];
  //   }
  //   return ret;
  // }

  render() {
    const { hasError, idyll, updateProps, children, setCurrentPrompt, advance, nextTag, onShow, heading, ...props } = this.props;
    let { showOptions } = this.state;
    showOptions = true;
    return (
      <div {...props} key={this.getContent(this.props).join('-')}>
        { heading ? <div className="parametric-if-heading" style={{background: heading === 'Morning' ? 'rgb(255, 229, 51)' : undefined, color: heading === 'Morning' ? 'black' : undefined }}>{heading}</div> : null}
        <div>
        {/* <Typist onTypingDone={this.doneTyping} delayGenerator={this.delayGenerator}> */}
        {this.getContent(this.props)}
        </div>
        {/* </Typist> */}
        <br/>
        <div className="parametric-if-options" style={{opacity: showOptions ? 1 : 0, pointerEvents: showOptions ? 'auto' : 'none'}}>
          {this.getOptions()}
        </div>
      </div>
    );
  }
}

module.exports = Prompt;
