import { useState, useEffect } from 'react';
import '../../assets/css/reviews.css';
import { useNavigate } from 'react-router-dom';

export default function ReviewSection({
  userId,
  limit,
  onlyUserReviews = false
}) {

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    text: '',
    rating: 5
  });

  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:3001/reviews');
      const data = await res.json();
      console.log(data);
      
      setReviews(data);

    } catch (error) {
      console.error(error);
    }
  };

  const submitReview = async () => {

    if (!newReview.text.trim()) {
      alert('Please write a review');
      return;
    }

    setLoading(true);

    try {

      const res = await fetch('http://localhost:3001/reviews', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          userId,
          text: newReview.text,
          rating: newReview.rating
        })
      });

      if (res.ok) {

        setNewReview({
          text: '',
          rating: 5
        });

        fetchReviews();
      }

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStars = (rating, interactive = false) => {

    return [...Array(5)].map((_, i) => (

      <span
        key={i}

        onClick={() =>
          interactive &&
          setNewReview({
            ...newReview,
            rating: i + 1
          })
        }

        style={{
          cursor: interactive ? 'pointer' : 'default',
          color: i < rating ? '#FFD700' : '#ddd',
          fontSize: '24px',
          marginRight: '5px'
        }}
      >
        ★
      </span>
    ));
  };

  let filteredReviews = reviews;

  if (onlyUserReviews) {

    filteredReviews = reviews.filter(
      (review) => review.user?._id?.toString() === userId?.toString()
    );
  }

  if (limit) {
    filteredReviews = filteredReviews.slice(0, limit);
  }

  return (
    <div className="reviews-container">

      <div>
        <p className="section-subtitle">Testimonials</p>

        <p className="section-title">
          What Our Clients Say
        </p>

        <p className="section-description">
          Hear from the guys who trust BarberKraft with their look.
        </p>
      </div>

      {userId && (

        <div className="write-review">

          <h3>Write a Review</h3>

          <div className="rating-input">

            <label>Your Rating:</label>

            {renderStars(newReview.rating, true)}

          </div>

          <textarea
            className='textarea-review'

            value={newReview.text}

            onChange={(e) =>
              setNewReview({
                ...newReview,
                text: e.target.value
              })
            }

            placeholder="Write your review here..."
            rows="4"
            maxLength="500"
          />

          <button
            className='review-btn'
            onClick={submitReview}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>

        </div>
      )}

      <div className="reviews-list">

        {
          filteredReviews.length === 0 ? (

            <p>No reviews yet.</p>

          ) : (

            <div className="reviews-grid">

              {
                filteredReviews.map((review) => (

                  <div key={review._id} className="review-card">

                    <div className="review-rating">
                      <p>{renderStars(review.rating)}</p>
                    </div>

                    <div className='reviewText'>

                      <p className="review-text">
                        "{review.text}"
                      </p>

                    </div>

                    <div className='rv-d'>

                      <div className='fLetter'>
                        <p>{review.user?.name[0]}</p>
                      </div>

                      <div>

                        <p className='customerName'>
                          {review.user?.name} {review.user?.surname}
                        </p>

                        <p className='customerTime'>
                          Customer for: {review.customerTenure}
                        </p>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

        {
          limit && (
            <div className='more-reviews'>

              <button
                className='review-btn'
                onClick={() => navigate('/allReviews')}
              >
                More Reviews
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}