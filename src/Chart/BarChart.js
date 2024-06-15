import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

const BarChart = () => {
  const [exchangeRates, setExchangeRates] = useState(null);

  const apiKey = 'fa1aa46a90803e3af907436g'; 
  const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rate data: ", error);
      }
    };

    fetchExchangeRates();
  }, [baseUrl]);

  if (!exchangeRates) {
    return <p>Cargando...</p>;
  }
  const filteredRates = {
    USD: exchangeRates.USD,
    MXN: exchangeRates.MXN
  };

  const data = {
    labels: Object.keys(filteredRates),
    datasets: [{
      label: 'Exchange Rate to USD',
      data: Object.values(filteredRates),
      backgroundColor: 'rgba(200, 50, 50, 0.2)',
      borderColor: 'rgba(200, 50, 50, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 15,
        },
      },
    },
  };

  return (
    <div style={{ height: '700px' }}>
      <Bar data={data} options={options} height={400} />
    </div>
  );
};

export default BarChart;
