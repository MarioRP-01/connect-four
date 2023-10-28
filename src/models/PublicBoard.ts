import { type Coordinate } from './Coordinate'
import { type Token } from './Token'

export interface PublicBoard {
  getToken: (coordinate: Coordinate) => Token
}
