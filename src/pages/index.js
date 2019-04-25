import React, { Component } from "react";
import classNames from "classnames";
import initReactFastclick from "react-fastclick";
import Calculate from "../components/calculate";
import IconMeeple from "../assets/meeple";
import "./index.styl";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      amountView: false,
      calculate: false,
      poolToChoose: [],
      winner: "",
      errorColour: false,
      errorAmount: false
    };
  }

  componentWillMount() {
    initReactFastclick();
  }

  componentDidMount() {
    this.setState({ ready: true });
  }

  render() {
    const {
      ready,
      amountView,
      calculate,
      poolToChoose,
      winner,
      errorColour,
      errorAmount
    } = this.state;

    const classes = classNames("getplayer", {
      calculate,
      ready,
      animationDone: calculate ? true : false
    });

    const resetClasses = classNames("reset");

    let heading = "";
    if (amountView) {
      heading = (
        <div className="copy choose">
          <div className="copy-inner">
            Assign numbers to <br />each player: 1, 2, 3...
          </div>
          <div className="extra-text">Select no. of players and 'Go'</div>
        </div>
      );
    } else {
      heading = (
        <div className="copy choose">
          <div className="copy-inner">
            Select a colour <br />for each player
          </div>
        </div>
      );
    }

    let error = "";
    if (errorAmount) {
      error = <div className="error">Select the total no. of people playing</div>;
    } else if (errorColour) {
      error = <div className="error">You must select at least two colours</div>;
    }

    return (
      <div className={classes}>
        {heading}

        <div className="players">
          {amountView
            ? this.renderPlayersAmount()
            : this.renderPlayersColour()}
        </div>

        <div className="copy choose2">
          <div className="copy-inner">
            <div className="toggle-wrapper">
              <button
                ref="buttonColour"
                onClick={this.showColourView.bind(this)}
                aria-selected="true"
              >
                Colour
              </button>
              <div
                className="toggle"
                ref="toggle"
                aria-selected="false"
                onClick={this.handleToggle.bind(this)}
              >
                <div className="toggle-bit" />
              </div>
              <button
                ref="buttonAmount"
                onClick={this.showAmountView.bind(this)}
                aria-selected="false"
              >
                No. of <br />players
              </button>
            </div>
            <div className="extra-content">{error}</div>
            <div
              className={resetClasses}
              ref="reset"
              onClick={this.resetApp.bind(this)}
            >
              <div className="reset-inner">Reset</div>
            </div>
          </div>
          <div className="sponsor">
            Sponsored by <a href="https://www.facebook.com/gbconuk/" target="_blank">GBCon tabletop gaming days</a>
          </div>
        </div>

        <div className="button">
          <button className="submit" onClick={this.getWinner.bind(this)}>
            GO
          </button>
        </div>

        {calculate && (
          <Calculate
            poolToChoose={poolToChoose}
            winner={winner}
            isAmount={amountView}
          />
        )}

      </div>
    );
  }

  showAmountView() {
    this.setState({
      amountView: true,
      errorAmount: false,
      errorColour: false
    });

    this.refs.buttonAmount.setAttribute("aria-selected", "true");
    this.refs.buttonColour.setAttribute("aria-selected", "false");
    this.refs.toggle.setAttribute("aria-selected", "true");
  }

  showColourView() {
    this.setState({
      amountView: false,
      errorAmount: false,
      errorColour: false
    });

    this.refs.buttonAmount.setAttribute("aria-selected", "false");
    this.refs.buttonColour.setAttribute("aria-selected", "true");
    this.refs.toggle.setAttribute("aria-selected", "false");
  }

  handleToggle(event) {
    if (this.state.amountView) {
      this.showColourView();
    } else {
      this.showAmountView();
    }
  }

  renderPlayersColour() {
    const colours = [
      { grey: "#777777" },
      { black: "#000000" },
      { green: "#268b13" },
      { turquoise: "#06e6e9" },
      { blue: "#1128d4" },
      { purple: "rebeccapurple" },
      { pink: "#82008d" },
      { red: "#e71f0f" },
      { brown: "#904e00" },
      { orange: "#e17a00" },
      { yellow: "#e7e00f" },
      { white: "#eeeeee" }
    ];

    return (
      <ul className="circles default" ref="playersColour">
        {colours.map(colour => {
          return (
            <li
              className={`option ${Object.keys(colour)}`}
              key={Object.keys(colour)}
              aria-selected="false"
              onClick={this.handleSelect.bind(this)}
            >
              <div className="colour-meeple"><IconMeeple /></div>
            </li>
          );
        })}
      </ul>
    );
  }

  renderPlayersAmount() {
    const amount = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    return (
      <ul className="circles default circles-numbers" ref="playersAmount">
        {amount.map(number => {
          return (
            <li
              className={`${number}-player`}
              key={`${number}-player`}
              aria-selected="false"
              onClick={this.handleSelect.bind(this)}
            />
          );
        })}
      </ul>
    );
  }

  handleSelect(event) {
    this.setState({
      errorAmount: false,
      errorColour: false
    });

    if (this.state.amountView) {
      let x = document.body.querySelectorAll('li[aria-selected="true"]');
      for (let i = 0; i < x.length; i++) {
        x[i].setAttribute("aria-selected", "false");
      }
    }

    const selected = event.target.getAttribute("aria-selected") === "true";
    event.target.setAttribute("aria-selected", selected ? "false" : "true");
  }

  getWinner() {
    let selected = [];
    let x = document.body.querySelectorAll('li[aria-selected="true"]');

    if (this.state.amountView) {
      let integer;
      for (let i = 0; i < x.length; i++) {
        integer = x[i].getAttribute("class").slice(0, 1); // TODO
      }
      for (let i = 0; i < integer; i++) {
        selected.push(i + 1);
      }
    } else {
      for (let i = 0; i < x.length; i++) {
        selected.push(x[i].getAttribute("class"));
      }
    }


    let result = selected[Math.floor(Math.random() * selected.length)];

    if (this.state.amountView) {
      if (selected.length > 0) {
        this.setState({
          calculate: true,
          poolToChoose: selected,
          winner: result,
          errorAmount: false
        });
      } else {
        this.setState({
          errorAmount: true
        });
      }
    } else {
      if (selected.length > 1) {
        this.setState({
          calculate: true,
          poolToChoose: selected,
          winner: result,
          errorColour: false
        });
      } else {
        this.setState({
          errorColour: true
        });
      }
    }
  }

  resetApp() {
    this.setState({
      ready: true,
      calculate: false,
      poolToChoose: [],
      winner: ""
    });

    let x = document.body.querySelectorAll('li[aria-selected="true"]');

    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("aria-selected", "false");
    }
  }
}

export default App;
