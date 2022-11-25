import Heading from '@/components/Typography/Heading'
import { Line } from 'react-chartjs-2'

export default function Reports () {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  return (
      <>
        <Heading>Reports</Heading>
        <Line options={options} data={data} />
      </>
  )
}
