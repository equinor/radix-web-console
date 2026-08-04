import { describe, expect, it } from 'vitest'
import { getMostSevereAlertLevel } from './aggregatedStatusPopover.utils'

describe('getMostSevereAlertLevel', () => {
  it("defaults to 'Good' for an empty list", () => {
    expect(getMostSevereAlertLevel([])).toBe('Good')
  })

  it("returns 'Good' when every item is 'Good'", () => {
    expect(getMostSevereAlertLevel(['Good', 'Good'])).toBe('Good')
  })

  it("returns 'Warning' when the most severe item is a warning", () => {
    expect(getMostSevereAlertLevel(['Good', 'Warning', 'Good'])).toBe('Warning')
  })

  it("returns 'Danger' when any item is a danger", () => {
    expect(getMostSevereAlertLevel(['Good', 'Warning', 'Danger'])).toBe('Danger')
  })

  it('is order-independent', () => {
    expect(getMostSevereAlertLevel(['Danger', 'Warning', 'Good'])).toBe('Danger')
  })

  it('handles a single item', () => {
    expect(getMostSevereAlertLevel(['Warning'])).toBe('Warning')
  })
})
