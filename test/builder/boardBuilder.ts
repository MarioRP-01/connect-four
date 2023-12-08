import { Board } from '../../src/models/Board'
import { Coordinate } from '../../src/utils/Coordinate'
import { type TokenSymbol } from '../../src/utils/Token'
import { createNullToken, createPlayer1Token, createPlayer2Token } from './tokenBulder'

export function createEmptyBoard (): Board {
  return new Board()
}

export function createNonFullBoard (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(2, 6)

  board.loadSnapshot({ boardPersisted: nonFullWinnableBoard, lastCoordinate })

  return board
}

export function createWinnableBoard (): Board {
  return createNonFullBoard()
}

export function createFullBoard (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(5, 6)

  board.loadSnapshot({ boardPersisted: fullBoard, lastCoordinate })

  return board
}

export function createBoardWithHorizontalWinner (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(0, 5)

  board.loadSnapshot({ boardPersisted: boardWithWinner, lastCoordinate })

  return board
}

export function createBoardWithVerticalWinner (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(0, 1)

  board.loadSnapshot({ boardPersisted: boardWithWinner, lastCoordinate })

  return board
}

export function createBoardWithAscendingDiagonalWinner (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(3, 3)

  board.loadSnapshot({ boardPersisted: boardWithWinner, lastCoordinate })

  return board
}

export function createBoardWithDescendingDiagonalWinner (): Board {
  const board = new Board()
  const lastCoordinate = new Coordinate(3, 2)

  board.loadSnapshot({ boardPersisted: boardWithWinner, lastCoordinate })

  return board
}

export function createBoardWithoutWinner (): Board {
  return createNonFullBoard()
}

const fullBoard: TokenSymbol[][] = [
  [
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol
  ],
  [
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol
  ],
  [
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol
  ],
  [
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol
  ],
  [
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol
  ],
  [
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol
  ]
]

const nonFullWinnableBoard: TokenSymbol[][] = [
  [
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createPlayer2Token().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createPlayer2Token().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createPlayer2Token().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ]
]

const boardWithWinner: TokenSymbol[][] = [
  [
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol,
    createPlayer1Token().symbol
  ],
  [
    createNullToken().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createPlayer2Token().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createPlayer2Token().symbol,
    createPlayer1Token().symbol,
    createPlayer2Token().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createPlayer2Token().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ],
  [
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol,
    createNullToken().symbol
  ]
]
