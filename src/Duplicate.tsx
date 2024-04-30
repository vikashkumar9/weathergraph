import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from 'victory';
import GraphHeader from './components/GraphHeader';
import Zones from './components/Zones';

const Duplicate: React.FC = () => {
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

    setSelectlabel(dates);
  };

  useEffect(() => {
    console.log('Period=>' + selectedPeriod);
  }, [selectedPeriod]);

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

  let data: number[];
  if (chartType === 'ppm') {
    data = [5, 12, 11, 13, 4, -11, 1, 3];
  } else if (chartType === 'temperature') {
    data = [5, 4, 7, 6, 8, 3, 7, 9];
  } else {
    data = [5, 4, 7, 6, 3, 3, 7, 9];
  }

  const chartData = selectlabel.map((label, index) => ({
    x: label,
    y: data[index],
  }));

  return (
    <div className='container bg-light p-4 rounded my-5'>
      <GraphHeader
        chartType={chartType}
        handleChartTypeChange={handleChartTypeChange}
        handlePeriodChange={handlePeriodChange}
        selectedPeriod={selectedPeriod}
      />
      <Zones />

      <VictoryChart
        theme={VictoryTheme.material}
        height={200}
        // domainPadding={{ x: [20, 20] }}
      >
        {/* Add a horizontal line at y = 0 */}
        <VictoryLine
          style={{
            data: { stroke: 'black', strokeWidth: 1 },
          }}
          data={[
            { x: selectlabel[0], y: 0 },
            { x: selectlabel[selectlabel.length - 1], y: 0 },
          ]}
        />
        <VictoryLine
          style={{
            data: { stroke: 'red', strokeWidth: 1 },
            labels: { fontSize: 8 },
          }}
          data={chartData}
          labelComponent={<VictoryTooltip />}
        />
        {/* Remove vertical lines */}
        <VictoryAxis style={{ tickLabels: { fontSize: 4 } }} />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 8 } }} />
      </VictoryChart>
    </div>
  );
};

export default Duplicate;
