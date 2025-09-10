import { Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'

import { type ApplicationCost, useGetFutureCostQuery } from '../../store/cost-api'
import { formatDateTimeYear } from '../../utils/datetime'
import AsyncResource from '../async-resource/async-resource'

import '../application-cost/style.css'

function getCostEstimate({ cost, currency }: ApplicationCost): string {
  return !Number.isNaN(cost) ? `${cost.toFixed()} ${currency}` : 'No data'
}

function getPeriod(): string {
  const today = new Date()
  const nextMonth = new Date(today)
  nextMonth.setDate(nextMonth.getDate() + 30)

  return `${formatDateTimeYear(today)} - ${formatDateTimeYear(nextMonth)}`
}

export interface FutureApplicationCostProps {
  appName: string
}

export const FutureApplicationCost: FunctionComponent<FutureApplicationCostProps> = ({ appName }) => {
  const { data: cost, ...state } = useGetFutureCostQuery({ appName }, { skip: !appName })

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost forecast</Typography>
      <AsyncResource asyncState={state}>
        {cost ? (
          <div className="cost-section grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="overline">Period</Typography>
              <Typography group="input" variant="text">
                {getPeriod()}
              </Typography>
            </div>

            <div className="grid grid--gap-small">
              <Typography variant="overline">Cost</Typography>
              <Typography group="input" variant="text">
                {getCostEstimate(cost)}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="caption">No data</Typography>
        )}
      </AsyncResource>
    </div>
  )
}
