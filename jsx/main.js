import Reviews from './Reviews.class';

showReviews();

async function showReviews() {
  const review = new Reviews();
  await review.initDB()
  const reviewsList = await review.getReviews();
  reviewsList.each(item => {
    console.log(item);
  })
}
