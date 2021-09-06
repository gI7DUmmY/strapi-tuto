import React from 'react'
import { useParams } from 'react-router'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

// requete graphql en dehors de la fonction du composant
const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      title,
      body,
      rating,
      published_at,
      id,
      categories (sort: "name") {
        name,
        id
      }
    }
  }
`

export default function ReviewDetails() {
  const { id } = useParams()
  // const { data, error, loading } = useFetch('http://localhost:1337/reviews/' + id)
  const { data, error, loading } = useQuery(REVIEW, {
    variables: { id: id }
  })

  return (
    <div>
      { loading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { data && (
        <div className="review-card">
          <h2>{ data.review.title }</h2>
          <div className="rating">{ data.review.rating }</div>

          { data.review.categories.map(category => (
            <small key={category.id}>{ category.name }</small>
          ))}

          <ReactMarkdown>{ data.review.body }</ReactMarkdown>
          <small>published: { data.review.published_at }</small>
        </div>
      ) }
    </div>
  )
}
