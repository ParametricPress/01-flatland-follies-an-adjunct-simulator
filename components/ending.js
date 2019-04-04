const React = require('react');

class Ending extends React.Component {

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div {...props} />
    );
  }
}

module.exports = Ending;
