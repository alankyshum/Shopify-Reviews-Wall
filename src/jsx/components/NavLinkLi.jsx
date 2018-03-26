import { Link } from "react-router-dom";

export default class NavLinkLi extends React.Component {
  render() {
    const isActive = this.context.router.route.location.pathname === this.props.to;
    return (
      <li class={isActive ? this.props.activeClassName : ''}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}
