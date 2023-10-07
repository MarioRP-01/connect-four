import { type ObjectValues } from '../utils/objectValues.ts'

export const VALID_COORDINATES = {
  MAX_ROW: 6,
  MAX_COLUMN: 7
} as const

export type validCoordinates = ObjectValues<typeof VALID_COORDINATES>

export interface Coordinates {
  row: number
  column: number
}
