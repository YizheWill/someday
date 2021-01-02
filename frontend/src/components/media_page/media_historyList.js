import React, { Component } from "react";

export default class MediaHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.showMyHistorylists(this.props.userId);
  }

  handleChange(e) {
     const { checked } = this.state;
     const { id } = e.target;
     if (checked.indexOf(id) === -1) {
       this.setState({
         checked: [...checked, id],
       });
     } else {
       this.setState({
         checked: checked.filter((checkedId) => checkedId !== id),
       });
     }
  }
  render() {
    const { historylists } = this.props;
    const { checked } = this.state;
    console.log(`CHECKED: ${checked}`);
    return historylists ? (
      <div>
        <h1>Historylists:</h1>
        <form>
          <ul>
            {historylists
              .filter((list) => list.user === this.props.userId)
              .map((watched) => (
                <li>
                  <input
                    type="checkbox"
                    value={watched}
                    onChange={this.handleChange}
                    id={watched._id}
                    checked={this.state.checked.indexOf(watched._id) !== -1}
                  />
                  {watched.name}
                </li>
              ))}
          </ul>
          <button>add</button>
        </form>
      </div>
    ) : null;
  }
}
