import { render } from "react";
import { createClass } from 'react-create-class';
import { Link } from "react-router";

export default createClass({
  render() {
    const isActive = this.context.router.route.location.pathname === this.props.to;

    return (
      <li class={isActive ? this.props.activeClassName : ''}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    )
  }
});
