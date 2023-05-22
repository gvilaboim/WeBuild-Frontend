import './Dashboard.css'
import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { Container } from 'react-bootstrap'

function Statistics({ getStatistics, id }) {
  const [statistics, setStatistics] = useState({})
  const [skip, setSkip] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id !== 0) {
      const fetchData = async () => {
        try {
          const stats = await getStatistics(id)
          setStatistics(stats)
          setSkip(true)
        } catch (error) {
          setError(error)
        }
      }
      fetchData()
    }
  }, [id])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Get the sum of views for each country
  let viewsByCountry = {}
  if (statistics.visitors) {
    viewsByCountry = statistics.visitors.reduce((accumulator, visitor) => {
      const country = visitor.location
      const views = visitor.views
      accumulator[country] = (accumulator[country] || 0) + views
      return accumulator
    }, {})
  }

  return (
    <>
      <Card className='stats-card'>
        <Card.Body>
          {skip ? (
            <>
              {statistics.visitors ? (
                <Table
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(viewsByCountry).map(
                      ([country, views], index) => (
                        <tr key={index}>
                          <td>{country}</td>
                          <td>{views}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              ) : (
                <div>No visitors data available.</div>
              )}
            </>
          ) : (
            <div className='text-center'>
              <Spinner animation='border' />
              <p>Loading...</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default Statistics
