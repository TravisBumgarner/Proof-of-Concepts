import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS
import { Temps } from './App';

export const LineChart = ({data}: {data: Temps[]}): JSX.Element => {
  const ref = useRef();

  const plot = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Temp (F)',
        data: data.map((d) => d.temp),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      },
    ],
  };

  return <Line ref={ref} data={plot} />
};

export default LineChart