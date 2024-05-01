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
  const [zone, setZone] = useState<string>('1');
  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartType(event.target.value);
  };

  // Function to handle change in selected zone
  const handleZoneChange = (newZone: string) => {
    setZone(newZone);
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
    setSelectlabel(dates);
  };

  useEffect(() => {
    handlePeriodChange(selectedPeriod);
  }, [selectedPeriod]);

  // Function to generate dates based on count and unit
  const generateDates = (
    count: number,
    unit: moment.unitOfTime.DurationConstructor
  ) => {
    const dates: string[] = [];
    for (let i = 0; i < count; i++) {
      const date = moment().subtract(i, unit);
      if (unit === 'hours') {
        dates.unshift(date.format('hh:mm')); // Format time in hours with 'am/pm' indication
      } else {
        dates.unshift(date.format('D MMMM')); // Default format for other units
      }
    }
    return dates;
  };

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
      {
        data: [1, 2, 3, 5, 7, 4, 5, 7],
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const plugins: any[] = [
    {
      afterDraw: (chart: {
        tooltip?: any;
        scales?: any;
        ctx?: any;
        chartArea: any;
      }) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.tooltip._active[0];
          const { ctx } = chart;
          const { x, y } = activePoint.element;
          const topY = y;
          const bottomY = chart.scales.y.bottom;

          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'black';
          ctx.setLineDash([6, 6]);
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.stroke();
          ctx.closePath();
          ctx.setLineDash([]);
        }
      },
    },
  ];

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
            return `Zone${zone}-${chartType}`; // Dynamically display zone and chart type in tooltip title
          },
        },
        titleColor: 'gray',
        bodyAlign: 'center' as const,
        yAlign: 'bottom' as const,
      },
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
        border: {
          display: false,
        },

        grid: {
          color: (context: any) => {
            if (context.tick.value === 0) {
              return 'rgba(0, 0, 0,0.2)'; //dark horizontal line  on 0 axix
            }
            return 'rgba(255, 255, 255, 0.1)'; //white horizontal line  on non-zero axix
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

      {/* select zone  */}
      <Zones zone={zone} onZoneChange={handleZoneChange} />
      <div className='container  p-4 rounded my-5 bg-transparent'>
        {/*background color pg graph is white*/}
        <Line
          data={chartData}
          options={options}
          height={80}
          plugins={plugins}
        />
      </div>
    </div>
  );
};

export default App;
