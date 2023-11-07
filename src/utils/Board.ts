import { type Coordinate } from '../models/Coordinate.ts'
import { type Token } from '../models/Token.ts'

export interface Board {
  getToken: (coordinate: Coordinate) => Token
}
