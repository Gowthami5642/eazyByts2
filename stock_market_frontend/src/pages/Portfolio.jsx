import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import './Portfolio.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Portfolio() {
  const portfolioData = [
    { name: 'Reliance', shares: 10, buyPrice: 2500, currentPrice: 2600 },
    { name: 'Infosys', shares: 15, buyPrice: 1200, currentPrice: 1150 },
    { name: 'TCS', shares: 8, buyPrice: 3400, currentPrice: 3550 },
  ];

  const totalInvestment = portfolioData.reduce(
    (sum, stock) => sum + stock.buyPrice * stock.shares,
    0
  );

  const currentValue = portfolioData.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.shares,
    0
  );

  const roi = currentValue - totalInvestment;

  const pieData = {
    labels: portfolioData.map((stock) => stock.name),
    datasets: [
      {
        data: portfolioData.map((stock) => stock.currentPrice * stock.shares),
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
      },
    ],
  };

  const handleBuy = (stockName) => {
    toast.success(`Buy action triggered for ${stockName}`);
  };

  const handleSell = (stockName) => {
    toast.error(`Sell action triggered for ${stockName}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">💼 Your Portfolio</h2>

      {/* Portfolio Summary */}
      <Row className="mb-4 text-center">
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <strong>Total Investment:</strong> ₹{totalInvestment.toLocaleString()}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <strong>Current Value:</strong> ₹{currentValue.toLocaleString()}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <strong>Profit/Loss:</strong>{' '}
              <span style={{ color: roi >= 0 ? 'green' : 'red' }}>
                ₹{roi.toLocaleString()}
              </span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Portfolio Distribution Chart */}
      <Row className="mb-5">
        <Col md={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="text-center mb-3">📊 Investment Distribution</h5>
              <div style={{ height: '300px' }}>
                <Pie data={pieData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Individual Stock Cards */}
      <Row>
        {portfolioData.length === 0 ? (
          <p className="text-center text-muted">No stocks in your portfolio yet. Start investing!</p>
        ) : (
          portfolioData.map((stock, index) => {
            const value = stock.currentPrice * stock.shares;
            const gain = (stock.currentPrice - stock.buyPrice) * stock.shares;
            return (
              <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                <Card className="shadow-sm h-100 stock-card">
                  <Card.Body>
                    <Card.Title className="fw-bold">{stock.name}</Card.Title>
                    <Card.Text>Shares: {stock.shares}</Card.Text>
                    <Card.Text>Buy Price: ₹{stock.buyPrice}</Card.Text>
                    <Card.Text>Current Price: ₹{stock.currentPrice}</Card.Text>
                    <Card.Text>Value: ₹{value.toLocaleString()}</Card.Text>
                    <Card.Text>
                      Gain/Loss:{' '}
                      <span style={{ color: gain >= 0 ? 'green' : 'red' }}>
                        ₹{gain.toLocaleString()}
                      </span>
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="success" size="sm" onClick={() => handleBuy(stock.name)}>Buy</Button>
                      <Button variant="danger" size="sm" onClick={() => handleSell(stock.name)}>Sell</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      {/* Learning Resources Section */}
<Row className="mt-5">
  <Col md={8} className="mx-auto">
    <Card className="shadow-sm p-3">
      <Card.Title>📘 Learn About Stock Markets & Trading</Card.Title>
      <Card.Text>
        <ul>
          <li>
            <a href="https://zerodha.com/varsity/" target="_blank" rel="noopener noreferrer">
              Zerodha Varsity – Free, structured learning
            </a>
          </li>
          <li>
            <a href="https://www.angelone.in/smart-money/trading-courses" target="_blank" rel="noopener noreferrer">
              Angel One Smart Money – Certified trading courses
            </a>
          </li>
          <li>
            <a href="https://www.elearnmarkets.com/" target="_blank" rel="noopener noreferrer">
              Elearnmarkets – NSE Academy courses
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@FinnovationZ" target="_blank" rel="noopener noreferrer">
              FinnovationZ (YouTube) – Hindi animated tutorials
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@PranjalKamra" target="_blank" rel="noopener noreferrer">
              Pranjal Kamra – Value investing insights
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@CARachanaRanade" target="_blank" rel="noopener noreferrer">
              CA Rachana Ranade – Simplified stock market concepts
            </a>
          </li>
        </ul>
      </Card.Text>
    </Card>
  </Col>
</Row>

      {/* Footer */}
      <footer className="text-center mt-5 mb-3 text-muted">
        Made with 💖 by Gowthami
      </footer>

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
}

export default Portfolio;