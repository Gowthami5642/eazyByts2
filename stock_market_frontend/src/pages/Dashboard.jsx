import React from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const navigate = useNavigate();

  const marketData = [
    { title: '💹 Nifty 50', price: '₹22,000', bg: 'nifty-bg' },
    { title: '📈 Sensex', price: '₹73,000', bg: 'sensex-bg' },
    { title: '🪙 Bank Nifty', price: '₹48,000', bg: 'banknifty-bg' },
  ];

  const summaryStats = [
    { label: 'Total Investment', value: '₹1,08,500' },
    { label: 'Current Value', value: '₹1,12,300' },
    { label: 'Profit/Loss', value: '+₹3,800' },
    { label: 'Stocks Owned', value: '6' },
  ];

  const chartData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [95000, 98000, 102000, 108500, 112300],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Portfolio Growth Over Time',
        font: { size: 18 },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Value (₹)' } },
    },
  };

  const recentTransactions = [
    { stock: 'Infosys', action: 'Buy', amount: '₹8,000', date: 'Aug 15' },
    { stock: 'TCS', action: 'Sell', amount: '₹5,500', date: 'Aug 14' },
    { stock: 'HDFC Bank', action: 'Buy', amount: '₹6,000', date: 'Aug 13' },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 dashboard-heading">📊 Market Overview</h2>

      <Row className="mb-5">
        {marketData.map((item, index) => (
          <Col md={4} key={index}>
            <Card className={`market-card shadow-sm ${item.bg}`}>
              <Card.Body>
                <Card.Title className="fw-bold">{item.title}</Card.Title>
                <Card.Text className="fs-5">{item.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        {summaryStats.map((stat, index) => (
          <Col md={3} sm={6} xs={12} key={index} className="mb-3">
            <Card className="shadow-sm text-center stat-card">
              <Card.Body>
                <Card.Title className="fw-bold">{stat.label}</Card.Title>
                <Card.Text className="fs-5">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 text-center">📈 Portfolio Growth</Card.Title>
              <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-3 text-center">📋 Recent Transactions</Card.Title>
              <Table striped bordered hover responsive className="transaction-table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.stock}</td>
                      <td>{tx.action}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button className="btn-trade me-3" onClick={() => navigate('/trade')}>
          Go to Trade
        </Button>
        <Button className="btn-portfolio" onClick={() => navigate('/portfolio')}>
          Go to Portfolio
        </Button>
      </div>
    </Container>
  );
}

export default Dashboard;