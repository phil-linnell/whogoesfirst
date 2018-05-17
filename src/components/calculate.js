import React, { Component } from "react";
import classNames from "classnames";

class Calculate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCalculating: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        activeCalculating: true
      });
    }, 200);
  }

  componentDidUpdate() {
    if (this.state.activeCalculating) {
      const poolElement = this.refs.pool;

      const totalWidth = (this.props.poolToChoose.length * 10 + 1) * 120;

      poolElement.style.width = `${totalWidth}px`;
      poolElement.style.transform = `translateX(-${totalWidth - 120}px)`;
    }
  }

  render() {
    const pool = [];
    let extraClass;
    if (this.props.isAmount) {
      extraClass = "contender-amount";
    } else {
      extraClass = "contender-colour";
    }

    let letters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    for (var i = 0; i < letters.length; i++) {
      this.props.poolToChoose.map(candidate => {
        let letter = letters[candidate - 1];
        pool.push(
          <li
            className={`contender ${candidate} ${extraClass}`}
            key={`${candidate}-${i}`}
          >
            <span className="number">{letter}</span>
          </li>
        );
      });
    }

    pool.push(
      <li
        className={`contender ${this.props.winner} ${extraClass}`}
        key={`${this.props.winner}-is-the-winner`}
      >
        <span className="number">{letters[this.props.winner - 1]}</span>
      </li>
    );

    const classes = classNames("calculating-screen", {
      active: this.state.activeCalculating
    });

    return (
      <div className={classes}>
        <div className="copy result">Who goes first?</div>
        <div className="calculating-wrapper">
          <ul className="circles calculating" ref="pool">
            {pool}
          </ul>
        </div>
        <div className="copy" />
      </div>
    );
  }
}

export default Calculate;
