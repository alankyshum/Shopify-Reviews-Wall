import ReviewsWall from '../components/ReviewsWall';

export default class MainApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Reviews in last 30 days</h1>
        <ReviewsWall date-range='month'/>
        <h1>Reviews in last 12 months</h1>
        <ReviewsWall date-range='year'/>
      </div>
    );
  }
}
