// DataViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart';

type Data = {
  "data": string
  "published_at": string
}

export type Temps = {
  temp: number,
  date: Date
}

function formatDate(date: any) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const d = new Date(date);
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate();
  const time = '09:30PM'; // Replace with your time data
  return `${year}-${month}-${day}:${time}`;
}


function DataViewer() {
  const [data, setData] = useState<Temps[]>([]);

  const fetchData = () => {
    axios.get('http://localhost:5005/temps').then((response) => {
      const data = response.data
        .split('\n')
        .filter((a: any) => a)
        .map((i: any) => {
          const parsed = JSON.parse(i)
          console.log(JSON.parse(i))
          return { temp: parseFloat(parsed.data), date: formatDate(new Date(parsed.published_at)) }
        })
      console.log('data')
      setData(data as unknown as Temps[]);
    })
  }

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData();

    // Set up an interval to fetch data every minute (60,000 milliseconds)
    const intervalId = setInterval(fetchData, 1_000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2>Data Viewer</h2>
      <LineChart data={data} />
    </div>
  );
}


export default DataViewer;