const React = require('react');
const Format = require('d3-format');

class Scoreboard extends React.Component {

  constructor(props) {
    super(props);
    this.format = Format.format('d');
  }


  render() {
    const { hasError, idyll, updateProps, children, ...props } = this.props;

    return (
      <div className="parametric-scoreboard">
        <div className="parametric-scoreboard-value day">
          Day: <span className="dynamic">{this.format(props.day)}</span>
        </div>
        <div className="parametric-scoreboard-value money">
          Money: <span className="dynamic">${this.format(props.money)}</span>
        </div>
        <div className="parametric-scoreboard-value self-actualization">
          Self actualization: <span className="dynamic">{this.format(props.selfActualization)}</span>
        </div>
      </div>
    );
  }
}

module.exports = Scoreboard;
