import React, { Component } from "react";
import classNames from "classnames";
import IconMeeple from "../assets/meeple";

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

      const totalWidth = (this.props.poolToChoose.length * 13 + 1) * 120;

      poolElement.style.width = `${totalWidth}px`;
      poolElement.style.transform = `translateX(-${totalWidth - 120}px)`;
    }
  }

  render() {
    const { poolToChoose, winner, isAmount } = this.props;

    const pool = [];
    let extraClass;
    if (isAmount) {
      extraClass = "contender-amount";
    } else {
      extraClass = "contender-colour";
    }

    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

    for (var i = 0; i < numbers.length; i++) {
      poolToChoose.map(candidate => {
        let number = numbers[candidate - 1];
        pool.push(
          <li
            className={`contender ${candidate} ${extraClass}`}
            key={`${candidate}-${i}`}
          >
            <span className="number">{number}</span>
            <div className="pool-item"><IconMeeple /></div>
          </li>
        );
      });
    }

    pool.push(
      <li
        className={`contender ${winner} ${extraClass}`}
        key={`${winner}-is-the-winner`}
      >
        <span className="number">{numbers[winner - 1]}</span>
        <div className="pool-item"><IconMeeple /></div>
      </li>
    );

    const classes = classNames("calculating-screen", {
      active: this.state.activeCalculating
    });

    return (
      <div className={classes}>
        <div className="copy result">Start player?</div>
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
