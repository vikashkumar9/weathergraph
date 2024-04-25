import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import Chart, {
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
} from 'chart.js/auto';
import GraphHeader from './components/GraphHeader';
import Zones from './components/Zones';

const App: React.FC = () => {
  useEffect(() => {
    Chart.register(
      LinearScale,
      LineElement,
      PointElement,
      CategoryScale,
      Tooltip
    );
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
    let dates: string[] = [];

    switch (period) {
      case 'Last 4 Hours':
        dates = generateDates(4, 'hours');
        break;
      case 'Last 12 Hours':
        dates = generateDates(12, 'hours');
        break;
      case 'Last 24 Hours':
        dates = generateDates(24, 'hours');
        break;
      case 'Last 3 days':
        dates = generateDates(3, 'days');
        break;
      case 'Last 2 Week':
        dates = generateDates(14, 'days');
        break;
      case '1 month':
        dates = generateDates(30, 'days');
        break;
      default:
        dates = generateDates(7, 'days');
        break;
    }

    console.log(dates);
    setSelectlabel(dates);
  };

  const generateDates = (
    count: number,
    unit: moment.unitOfTime.DurationConstructor
  ) => {
    const dates: string[] = [];
    for (let i = 0; i < count; i++) {
      const date = moment().subtract(i, unit);
      dates.unshift(date.format('D MMMM'));
    }
    return dates;
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

  const hoverLine = {
    id: 'hoverLine',
    afterDraw: function (chart: any, args: any) {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      console.log(tooltip);
      if (tooltip?.dataPoints && tooltip.dataPoints.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
        const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
        console.log(tooltip);
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.setLineDash([6, 6]);
        ctx.moveTo(xCoor, yCoor);
        ctx.lineTo(xCoor, bottom);
        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash([]);
      }
    },
  };

  const options = {
    plugins: {
      tooltip: {
        padding: {
          left: 20,
          right: 20,
          top: 4,
          bottom: 4,
        },
        callbacks: {
          title: function (context: any) {
            return `Zone-${chartType}`;
          },
        },
        titleColor: 'gray',
        bodyAlign: 'center' as const,
        yAlign: 'bottom' as const,
      },
      legend: {
        display: false,
      },
      ...hoverLine,
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: 'green',
          borderWidth: 5,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
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
      <Line data={chartData} options={options} height={80} />
    </div>
  );
};

export default App;
