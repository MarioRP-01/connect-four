import { type Coordinate } from './Coordinate.ts'
import { type Token } from './Token.ts'

export interface Board {
  getToken: (coordinate: Coordinate) => Token
}
