import React from 'react'
import { calculateMulliganProbability } from './MulliganLineChart.hooks'
import { LineChart } from '@components/commons/ui/LineChart'

const labels = [
  'マリガン後',
  ...Array.from({ length: 10 }, (_, i) => `${i + 1}`),
]

type MulliganLineChartProps = {
  wantCardCount: number
  mulliganCount: number
}

export const MulliganLineChart: React.FC<MulliganLineChartProps> = ({
  wantCardCount,
  mulliganCount,
}) => {
  const probabilities = calculateMulliganProbability(
    wantCardCount,
    mulliganCount
  )

  return (
    <LineChart
      labels={labels}
      lineData={probabilities}
      xText="ドロー枚数"
      yMin={Math.max(Math.floor(probabilities[0] - 5), 0)}
      yText="1枚以上引く確率 (%)"
    />
  )
}
