import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

type TemperatureEvent = {
  temperature: number // '9',
  publishedAt: Date // '2023-04-26T02:24:00.652Z',
  _id: string // 'e00fce687cc15f2e42da5d0a'
}

const App = () => {
  const [data, setData] = useState<TemperatureEvent[]>([])

  const pollData = useCallback(async () => {
    const response = await axios.get('http://localhost:5001/temperature')
    // Bad code, why yes.
    setData((response.data as TemperatureEvent[]).map(({ publishedAt, ...rest }) => ({
      publishedAt: new Date(publishedAt),
      ...rest
    })))
  }, [])

  useEffect(() => {
    setInterval(pollData, 5000)
  }, [])

  console.log(data)
  return (
    <div>
      <h1>What Temperature is it?</h1>
      <ul>
        {data
          .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
          .map(({ temperature, publishedAt, _id }) => (<li key={_id}>{publishedAt.toString()} - {temperature}</li>)
          )}
      </ul>
    </div>
  )
}

export default App
