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
    // Register necessary Chart.js components
    Chart.register(
      LinearScale,
      LineElement,
      PointElement,
      CategoryScale,
      Tooltip
    );
  }, []);

  // State variables
  const [chartType, setChartType] = useState<string>('temperature');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Last Week');
  const [selectlabel, setSelectlabel] = useState<string[]>([]);
  const [zone, setZone] = useState<string>('1'); // State for selected zone

  // Function to handle change in chart type (radio buttons)
  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartType(event.target.value);
  };

  // Function to handle change in selected zone
  const handleZoneChange = (newZone: string) => {
    setZone(newZone);
  };

  // Function to handle change in selected period (dropdown)
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

  // Effect to handle period change
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
        dates.unshift(date.format('ha')); // Format time in hours with 'am/pm' indication
      } else {
        dates.unshift(date.format('D MMMM')); // Default format for other units
      }
    }
    return dates;
  };

  // Data for the chart based on chart type
  let data;
  if (chartType === 'ppm') {
    data = [5, 12, 11, 13, 4, -11, 1, 3];
  } else if (chartType === 'temperature') {
    data = [5, 4, 7, 6, 8, 3, 7, 9];
  } else {
    data = [5, 4, 7, 6, 3, 3, 7, 9];
  }

  // Chart data including multiple datasets
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
        data: [1, 2, 3, 5, 7, 4, 5, 7], // Sample data for demonstration
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  // Plugins for additional chart functionalities
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

  // Options for configuring the appearance of the chart
  const options = {
    plugins: {
      tooltip: {
        // padding in tootlip
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
        // for dark horizontal line at 0 and light horizontal line at non zero
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
      {/* GraphHeader component for selecting chart type and period */}
      <GraphHeader
        chartType={chartType}
        handleChartTypeChange={handleChartTypeChange}
        handlePeriodChange={handlePeriodChange}
        selectedPeriod={selectedPeriod}
      />
      {/* Zones component for selecting zone */}
      <Zones zone={zone} onZoneChange={handleZoneChange} />
      {/* Line chart component */}
      <Line data={chartData} options={options} height={80} plugins={plugins} />
    </div>
  );
};

export default App;
