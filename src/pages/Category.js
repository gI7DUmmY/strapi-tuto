import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

// requete graphql en dehors de la fonction du composant
const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name,
      id,
      reviews (sort: "title") {
        id,
        title,
        body,
        rating,
        categories (sort: "name") {
          name,
          id
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { data, error, loading } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  return (
    <div>
      { loading && <div>Loading category...</div> }
      { error && <div>Error fetching category...</div> }
      { data && (
        <div>
          <h2>{ data.category.name }</h2>
          {data.category.reviews.map(review => (
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
      ) }
    </div>
  )
}
