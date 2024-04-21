import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart, {
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
} from 'chart.js/auto';
import GraphHeader from './components/GraphHeader';
import Zones from './components/Zones';
const App: React.FC = () => {
  useEffect(() => {
    Chart.register(LinearScale, LineElement, PointElement, CategoryScale);
  }, []);

  const [chartType, setChartType] = useState<string>('temperature');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Last Week');
  const [selectlabel, setSelectlabel] = useState<string[]>([]);

  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartType(event.target.value);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    var dates = [];

    if (period === 'Last 4 Hours') {
      for (let i = 0; i < 4; i++) {
        const date = new Date(Date.now() - i * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === 'Last 12 Hours') {
      for (let i = 0; i < 12; i++) {
        const date = new Date(Date.now() - i * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === 'Last 24 Hours') {
      for (let i = 0; i < 24; i++) {
        const date = new Date(Date.now() - i * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === 'Last 3 days') {
      for (let i = 0; i < 3; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === 'Last Week') {
      for (let i = 0; i < 7; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === 'Last 2 Week') {
      for (let i = 0; i < 14; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        dates.unshift(date.toLocaleDateString());
      }
    } else if (period === '1 month') {
      const date = new Date();
      const month = date.getMonth();
      for (let i = 0; i < 30; i++) {
        const newDate = new Date();
        newDate.setMonth(month);
        newDate.setDate(date.getDate() - i);
        dates.unshift(newDate.toLocaleDateString());
      }
    }

    console.log(dates);
    setSelectlabel(dates);
  };

  useEffect(() => {
    console.log('Period=>' + selectedPeriod);
  }, [selectedPeriod]);

  let data;
  if (chartType === 'ppm') {
    data = [5, 12, 11, 13, 4, -11, 1, 3];
  } else if (chartType === 'temperature') {
    data = [5, 4, 7, 6, 8, 3, 7, 9];
  } else {
    data = [5, 4, 7, 6, 3, 3, 7, 9];
  }

  const chartData = {
    labels: selectlabel,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: (context: any) => {
            if (context.tick.value === 0) {
              return 'rgba(0, 0, 0)';
            }
            return 'rgba(0, 0, 0, 0.1)';
          },
        },
      },
    },
  };

  return (
    <div className='container bg-light p-4 rounded my-5'>
      <GraphHeader
        chartType={chartType}
        handleChartTypeChange={handleChartTypeChange}
        handlePeriodChange={handlePeriodChange}
        selectedPeriod={selectedPeriod}
      />

      <Zones />

      <Line data={chartData} options={options} />
    </div>
  );
};

export default App;
