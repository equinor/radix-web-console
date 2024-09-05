import { differenceInWords } from '../../utils/datetime'
import { isValid } from 'date-fns'

type Props = {
  start: number | string | Date
  end: number | string | Date
  title?: string
}
export function Duration({ start, end, title }: Props) {
  if (typeof start === 'string' || typeof start === 'number') {
    start = new Date(start)
  }
  if (typeof end === 'string' || typeof end === 'number') {
    end = new Date(end)
  }

  if (!end || !isValid(end) || !isValid(start)) {
    return null
  }

  if (end < start) {
    end = start
  }

  return <span title={title}>{differenceInWords(end, start)}</span>
}
