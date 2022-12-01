import Card from '@/components/Card'
import { ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function NetWorthChart () {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const options: ChartOptions<'line'> = {
    responsive: true,
    // animation: false,
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
        <div className='flex flex-col'>
          <Card>Filters here</Card>
          <Line className='max-h-[600px]' options={options} data={data} />
        </div>
      </>
  )
}
