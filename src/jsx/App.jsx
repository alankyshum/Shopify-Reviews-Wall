import { render, Component } from "inferno";
import { BrowserRouter, Route, Link } from "inferno-router";
import UIKit from "uikit";
import MainApp from "./pages/MainApp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav">
                <li class="uk-active"><Link to="/">Home</Link></li>
                <li><Link to="/raw">Raw Table</Link></li>
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
}

render(<App />, document.getElementById("app"));
