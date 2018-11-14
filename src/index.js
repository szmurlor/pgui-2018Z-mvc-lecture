import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { DataSet } from "./data.js";

class StationDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangedValue = e => {
    let v = e.target.value;
    // console.log(v);
    this.props.onChangedValue(this.props.station, v);
  };

  render() {
    let s = this.props.station;
    return (
      <div class="station">
        <ul>
          <li>
            <span>Identyfikator:</span>
            <span>
              <input type="text" readOnly value={s.name} />
            </span>
          </li>
          <li>
            <span>Data pomiaru:</span>
            <span>
              <input type="text" readOnly value={s.date} />
            </span>
          </li>
          <li>
            <span>Oczekiwana:</span>
            <span>
              <input type="text" readOnly value={s.expected} />
            </span>
          </li>
          <li>
            <span>Zmierzona:</span>
            <span>
              <input
                type="text"
                value={s.value}
                onChange={this.onChangedValue}
              />
            </span>
          </li>
          <li>
            <span>Różnica:</span>
            <span>
              <input
                type="text"
                className={s.expected - s.value < 0 ? "red" : "neutral"}
                readOnly
                value={s.expected - s.value}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

console.log(DataSet);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  selected = e => {
    var sel = undefined;
    // console.log(e.target.value);
    for (var idx in DataSet.stations) {
      const s = DataSet.stations[idx];
      if (s.id == parseInt(e.target.value, 10)) sel = s;
    }

    this.setState({
      selected: sel
    });
  };

  onChangedStationValue = (s, v) => {
    for (var idx in DataSet.stations) {
      let sd = DataSet.stations[idx];
      if (sd.id == s.id) sd.value = v;
      this.setState({});
    }
  };

  render() {
    return (
      <div className="App">
        <div className="left">
          <select multiple onChange={this.selected}>
            {DataSet.stations.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right">
          {this.state.selected && (
            <StationDetails
              station={this.state.selected}
              onChangedValue={this.onChangedStationValue}
            />
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
