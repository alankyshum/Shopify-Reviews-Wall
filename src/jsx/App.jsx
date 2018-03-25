import { render, Component } from "inferno";
import { BrowserRouter, Route } from "inferno-router";
import UIKit from "uikit";
import NavLinkLi from './components/NavLinkLi';
import HomeWall from "./pages/HomeWall";
import RawData from "./pages/RawData";
import Timeline from "./pages/Timeline";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav">
                <NavLinkLi activeClassName="uk-active" to="/">Home</NavLinkLi>
                <NavLinkLi activeClassName="uk-active" to="/raw">Raw Reviews</NavLinkLi>
                <NavLinkLi activeClassName="uk-active" to="/timeline">Live Feed</NavLinkLi>
              </ul>
            </div>
          </nav>

          <div className="uk-container">
            <Route exact path="/" component={HomeWall} />
            <Route exact path="/raw" component={RawData} />
            <Route exact path="/timeline" component={Timeline} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById("app"));
