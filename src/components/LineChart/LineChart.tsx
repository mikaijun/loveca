'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type LineChartProps = {
  labels: string[]
  lineData: number[]
  xText: string
  yText?: string
  height?: number
  yMin?: number
  padding?: {
    top: number
    bottom: number
  }
}

export const LineChart: React.FC<LineChartProps> = ({
  labels,
  lineData,
  xText,
  yText,
  height = 300,
  yMin,
  padding = {
    top: -24,
    bottom: 0,
  },
}) => {
  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: yText,
        data: lineData,
        borderColor: '#5EB1EF',
        backgroundColor: 'rgba(94, 177, 239, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: yMin,
        suggestedMax: 100,
        ticks: {
          callback: function (value) {
            return value + '%'
          },
        },
      },
      x: {
        title: {
          display: true,
          text: xText,
          padding,
        },
      },
    },
  }

  return <Line data={data} height={height} options={options} />
}
