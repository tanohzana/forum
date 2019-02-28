import React, { Component } from "react";

import Shell from "./Shell";

class ShellContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Shell content={children} />
    )
  }
}

export default ShellContainer;