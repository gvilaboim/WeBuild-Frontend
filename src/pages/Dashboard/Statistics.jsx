import { Link } from 'react-router-dom';
import './Dashboard.css';
import { useContext, useEffect, useState } from 'react';
import { CanvasContext } from '../../context/canvas.context';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function Statistics({ GetStatistics , id }) {
  const { webSites, fetchAllWebsites } = useContext(CanvasContext);
  const [statistics, setStatistics] = useState({});
  const [skip, setSkip] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id !== 0) {
      const fetchData = async () => {
        try {
          const stats = await GetStatistics(id);
          setStatistics(stats);
          setSkip(true);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get the sum of views for each country
  let viewsByCountry = {};
  if (statistics.visitors) {
    viewsByCountry = statistics.visitors.reduce((accumulator, visitor) => {
      const country = visitor.location;
      const views = visitor.views;
      accumulator[country] = (accumulator[country] || 0) + views;
      return accumulator;
    }, {});
  }

  return (
    <>
      <div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>Statistics</h1>
              </Card.Title>
              <Card.Text>
                Use your Imagination and our tools to create the page of your
                dreams
              </Card.Text>

              {skip ? (
                <>
                  {statistics.visitors ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Country</th>
                          <th>Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(viewsByCountry).map(([country, views], index) => (
                          <tr key={index}>
                            <td>{country}</td>
                            <td>{views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div>No visitors data available.</div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading...</p>
                </div>
              )}
            </Card.Body>
          </Card>

          <Row></Row>
        </Container>
      </div>
    </>
  );
}

export default Statistics;