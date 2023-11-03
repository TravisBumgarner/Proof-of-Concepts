// DataViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Data = {
  "data": string
  "published_at":string
}

type Temps = {
  temp: number,
  date: Date
}


function DataViewer() {
  const [data, setData] = useState<Temps[]>([]);

  useEffect(() => {
    // Fetch data from your Express server
    axios.get('http://localhost:5005/temps').then((response) => {
      const data = response.data
        .split('\n')
        .filter((a: any) => a)
        .map((i: any) => {
          const parsed = JSON.parse(i)
          console.log(JSON.parse(i) )
          return {temp: parseFloat(parsed.data), date: new Date(parsed.published_at)}
        })
        console.log('data')
      setData(data as unknown as Temps[]);

    });
  }, []);

  return (
    <div>
      <h2>Data Viewer</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.date.toDateString()} - {item.temp}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataViewer;