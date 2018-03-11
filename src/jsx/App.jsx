import { render, Component } from "inferno";
import { BrowserRouter, Route } from "inferno-router";
import UIKit from "uikit";
import NavLinkLi from './components/NavLinkLi';
import MainApp from "./pages/MainApp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav">
                <NavLinkLi activeClassName="uk-active" to="/">Home</NavLinkLi>
                <NavLinkLi activeClassName="uk-active" to="/raw">Raw Table</NavLinkLi>
              </ul>
            </div>
          </nav>

          <div className="uk-container">
            <Route exact path="/raw" component={MainApp} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
  isActiveNav(match, location) {
    console.log(match);
    console.log(location);
  }
}

render(<App />, document.getElementById("app"));
