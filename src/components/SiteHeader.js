import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

// requete graphql en dehors de la fonction du composant
const CATEGORIES = gql`
  query GetCategories {
    categories (sort: "name") {
      name,
      id
    }
  }
`

export default function SiteHeader() {
  const { data, error, loading } = useQuery(CATEGORIES)

  return (
    <div>
      { loading && <div>Loading categories...</div> }
      { error && <div>Error fetching categories</div> }
      { data && (
        <div className="site-header">
          <Link to="/"><h1>Ninja Reviews</h1></Link>
          <nav className="categories">
            <span>Filter reviews by category:</span>
            { data.categories.map(category => (
              <Link to={`/category/${category.id}`} key={category.id}>{ category.name }</Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
