import stripAnsi from 'strip-ansi'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { copyToTextFile } from '../../utils/string'
import { errorToast } from '../global-top-nav/styled-toaster'

export async function downloadLog(filename: string, func: () => Promise<string>): Promise<void> {
  try {
    const data = await func()
    copyToTextFile(filename, stripAnsi(data))
  } catch (e) {
    const message = getFetchErrorMessage(e)
    errorToast(`Failed to download: ${message}`)
  }

  return void 0
}
