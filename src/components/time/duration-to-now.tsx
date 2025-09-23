import { useNow } from '../../effects/use-now'
import { Duration } from './duration'

type Props = {
  start: number | string | Date
  title?: string
}
export function DurationToNow({ start, title }: Props) {
  const now = useNow()

  return <Duration start={start} end={now} title={title} />
}
