import { render, Component } from 'inferno';
import Reviews from './Reviews.class';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
      </div>
    );
  }
}

render(
  <MyComponent />,
  document.getElementById("app")
);

// showReviews();

// async function showReviews() {
//   const review = new Reviews();
//   await review.initDB()
//   const reviewsList = await review.getReviews();
//   reviewsList.each(item => {
//     // console.log(item);
//   })
// }
