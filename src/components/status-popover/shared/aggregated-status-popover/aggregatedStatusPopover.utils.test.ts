import { describe, expect, it } from 'vitest'
import { getMostSevereAlertLevel } from './aggregatedStatusPopover.utils'

describe('getMostSevereAlertLevel', () => {
  it("defaults to 'None' for an empty list", () => {
    expect(getMostSevereAlertLevel([])).toBe('None')
  })

  it("returns 'None' when every item is 'None'", () => {
    expect(getMostSevereAlertLevel(['None', 'None'])).toBe('None')
  })

  it("returns 'Warning' when the most severe item is a warning", () => {
    expect(getMostSevereAlertLevel(['None', 'Warning', 'None'])).toBe('Warning')
  })

  it("returns 'Danger' when any item is a danger", () => {
    expect(getMostSevereAlertLevel(['None', 'Warning', 'Danger'])).toBe('Danger')
  })

  it('is order-independent', () => {
    expect(getMostSevereAlertLevel(['Danger', 'Warning', 'None'])).toBe('Danger')
  })

  it('handles a single item', () => {
    expect(getMostSevereAlertLevel(['Warning'])).toBe('Warning')
  })
})
