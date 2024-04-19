import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart, { LinearScale } from 'chart.js/auto';

const App: React.FC = () => {
  useEffect(() => {
    Chart.register(LinearScale);
  }, []);

  const chartData = {
    labels: [
      '01 Jan',
      '02 Jan',
      '03 Jan',
      '04 Jan',
      '05 Jan',
      '06 Jan',
      '07 Jan',
      '08 Jan',
    ],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [5, 12, 11, 13, 4, -11, 1, 3],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Humidity',
        data: [5, 4, 7, 6, 8, 3, 7, 9],
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Line Graph</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default App;
