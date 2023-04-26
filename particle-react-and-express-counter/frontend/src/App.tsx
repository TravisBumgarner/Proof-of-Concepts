import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

type CounterEvent = {
  counter: number // '9',
  publishedAt: Date // '2023-04-26T02:24:00.652Z',
  _id: string // 'e00fce687cc15f2e42da5d0a'
}

const App = () => {
  const [data, setData] = useState<CounterEvent[]>([])

  const pollData = useCallback(async () => {
    const response = await axios.get('http://localhost:5001/counter')
    // Bad code, why yes.
    setData((response.data as CounterEvent[]).map(({ publishedAt, ...rest }) => ({
      publishedAt: new Date(publishedAt),
      ...rest
    })))
  }, [])

  useEffect(() => {
    setInterval(pollData, 1000)
  }, [])

  console.log(data)
  return (
    <ul>
      {data
        .sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
        .map(({ counter, publishedAt, _id }) => (<li key={_id}>{publishedAt.toLocaleDateString()} - {counter}</li>)
        )}
    </ul>
  )
}

export default App
