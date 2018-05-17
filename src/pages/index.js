import React, { Component } from "react";
import classNames from "classnames";
import initReactFastclick from "react-fastclick";
import Calculate from "../components/calculate";
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
    this.setState({
      ready: true
    });
  }

  render() {
    const classes = classNames("getplayer", {
      calculate: this.state.calculate,
      ready: this.state.ready,
      animationDone: this.state.calculate ? true : false
    });

    const resetClasses = classNames("reset", {
      resetActive: this.state.resetActive
    });

    let heading = "";
    if (this.state.amountView) {
      heading = (
        <div className="copy choose">
          <div className="copy-inner">
            Select total no. of players
            <div className="extra-text">Assign a number to each player <br />'1, 2, 3...' then press 'GO'</div>
          </div>
        </div>
      );
    } else {
      heading = (
        <div className="copy choose">
          <div className="copy-inner">
            Select a colour for each player
            <div className="extra-text">Then press 'GO'</div>
          </div>
        </div>
      );
    }

    let error = "";
    if (this.state.errorAmount) {
      error = <div className="error">Select the total no. of people playing</div>;
    } else if (this.state.errorColour) {
      error = <div className="error">You must select at least two colours</div>;
    }

    return (
      <div className={classes}>
        {heading}

        <div className="players">
          {this.state.amountView === true
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
          </div>
        </div>

        <div className="button">
          <button className="submit" onClick={this.getWinner.bind(this)}>
            GO
          </button>
        </div>

        {this.state.calculate === true ? (
          <Calculate
            poolToChoose={this.state.poolToChoose}
            winner={this.state.winner}
            isAmount={this.state.amountView}
          />
        ) : null}

        <div
          className={resetClasses}
          ref="reset"
          onClick={this.resetApp.bind(this)}
        >
          Reset
        </div>
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
      { white: "#eeeeee" },
      { yellow: "#e7e00f" },
      { green: "#268b13" },
      { blue: "#1128d4" },
      { black: "#000000" },
      { pink: "#82008d" },
      { red: "#e71f0f" },
      { orange: "#e17a00" }
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
            />
          );
        })}
      </ul>
    );
  }

  renderPlayersAmount() {
    const amount = [2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <ul className="circles default" ref="playersAmount">
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
        integer = x[i].getAttribute("class").slice(0, 1);
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
