import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

// requete graphql en dehors de la fonction du composant
const REVIEWS = gql`
  query GetReviews {
    reviews {
      title,
      body,
      rating,
      id,
      categories (sort: "name") {
        name,
        id
      }
    }
  }
`

export default function HomePage() {
  // const { data, error, loading } = useFetch('http://localhost:1337/reviews')
  const { data, error, loading } = useQuery(REVIEWS)

  return (
    <div>
      <h2>Homepage</h2>
      { loading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { data &&  (
        <div>
          {/* {data.map(review => ( */}
          {data.reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="rating">{ review.rating }</div>
              <h2>{ review.title }</h2>

              { review.categories.map(category => (
                <small key={category.id}>{ category.name }</small>
              ))}

              <p>{ review.body.substring(0, 200) }...</p>
              <Link to={`/details/${review.id}`} >Read more...</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
