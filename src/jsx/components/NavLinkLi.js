import { render } from "inferno";
import { createClass } from 'inferno-create-class';
import { Link } from "inferno-router";

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
