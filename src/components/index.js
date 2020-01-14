import React, { Component } from "react";
import Link from "gatsby-link";
import classNames from "classnames";
import Calculate from "./calculate";
import Toggle from "./toggle";
import Heading from "./heading";
import IconMeeple from "../assets/meeple";
import "./index.styl";

const options = [
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: "colour",
      amountView: false,
      calculate: false,
      poolToChoose: [],
      winner: "",
      errorColour: false,
      errorAmount: false
    };

    this.resetApp = this.resetApp.bind(this);
    this.getWinner = this.getWinner.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    const {
      activeView,
      amountView,
      calculate,
      poolToChoose,
      winner,
      errorColour,
      errorAmount
    } = this.state;

    const classes = classNames("getplayer", {
      calculate,
      animationDone: calculate ? true : false
    });

    const resetClasses = classNames("reset");

    let error = "";
    if (errorAmount) {
      error = <div className="error">Select the total no. of people playing</div>;
    } else if (errorColour) {
      error = <div className="error">You must select at least two colours</div>;
    }

    return (
      <div className={classes}>
        <Heading activeView={activeView} />

        <div className="players">
          {activeView === "colour" && this.renderPlayersColour()}
          {activeView === "number" && this.renderPlayersAmount()}
        </div>

        <div className="copy choose2">
          <div className="copy-inner">
            <Toggle activeView={activeView} toggleView={this.handleToggle} />
            <div className="extra-content">{error}</div>
            <button
              className={resetClasses}
              ref="reset"
              onClick={this.resetApp}
            >
              <div className="reset-inner">Reset</div>
            </button>
          </div>
          <div className="sponsor">
            <Link to="/random/">Or try a random decider</Link>
          </div>
        </div>

        <div className="button">
          <button className="submit" onClick={this.getWinner}>
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


  renderPlayersColour() {
    return (
      <ul className="circles default" ref="playersColour">
        {options.map((colour, i) => {
          return (
            <li
              className={`option ${Object.keys(colour)}`}
              key={Object.keys(colour)}
              aria-selected="false"
              onClick={this.handleSelect}
            >
              <div className="colour-meeple"><IconMeeple /></div>
            </li>
          );
        })}
      </ul>
    );
  }

  renderPlayersAmount() {
    let items = [];
    for (var i = 0; i < options.length; i++) {
      items.push(
        <li
          className={`${i+2}-player`}
          key={`${i+2}-player`}
          aria-selected="false"
          onClick={this.handleSelect}
        />
      );
    }

    return (
      <ul className="circles default circles-numbers" ref="playersAmount">
        {items}
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
    const { amountView } = this.state;
    let selected = [];
    let x = document.body.querySelectorAll('li[aria-selected="true"]');

    if (amountView) {
      let integer;
      for (let i = 0; i < x.length; i++) {
        integer = x[i].getAttribute("class").match(/[0-9]*/);
      }
      for (let i = 0; i < parseInt(integer); i++) {
        selected.push(i + 1);
      }
    } else {
      for (let i = 0; i < x.length; i++) {
        selected.push(x[i].getAttribute("class"));
      }
    }


    let result = selected[Math.floor(Math.random() * selected.length)];

    if (amountView) {
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
