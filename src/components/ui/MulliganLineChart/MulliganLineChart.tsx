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
import { calculateMulliganProbability } from './MulliganLineChart.hooks'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const labels = [
  'マリガン後',
  ...Array.from({ length: 10 }, (_, i) => `${i + 1}`),
]

interface MulliganLineChartProps {
  deckSize: number
  kasumiCount: number
  renCount: number
  mulliganCount: number
  wantCardCount: number
  height?: number
}

export const MulliganLineChart: React.FC<MulliganLineChartProps> = ({
  deckSize,
  kasumiCount,
  renCount,
  mulliganCount,
  wantCardCount,
  height = 300,
}) => {
  const probabilities = calculateMulliganProbability({
    deckSize,
    kasumiCount,
    renCount,
    wantCardCount,
    mulliganCount,
  })

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: '1枚以上引く確率 (%)',
        data: probabilities,
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
        min: Math.max(Math.floor(probabilities[0] - 5), 0),
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
          text: 'ドロー枚数',
          padding: {
            top: -24,
            bottom: 0,
          },
        },
      },
    },
  }

  return <Line data={data} height={height} options={options} />
}
