import run from "aocrunner"
import { transpose } from "../utils/index.js"

function check(board) {
  const board2 = transpose(board)
  for (let i = 0; i < 5; i++) {
    if (
      board[i].every((x) => x === null) ||
      board2[i].every((x) => x === null)
    ) {
      return true
    }
  }
  return false
}

const parseInput = (rawInput) => {
  const lines = rawInput.trim().split`\n`
  const calls = lines.shift().split`,`.map(Number)
  const boards = []
  while (lines.length > 0) {
    const nextBoard = []
    lines.shift() //blank line
    for (let i = 0; i < 5; i++) {
      nextBoard[i] = lines.shift().trim().split(/\s+/).map(Number)
    }
    boards.push(nextBoard)
  }
  return { calls, boards }
}

const part1 = (rawInput) => {
  const { calls, boards } = parseInput(rawInput)
  const marked = []
  let winningBoard, lastCall
  outer: for (const call of calls) {
    lastCall = call
    for (const board of boards) {
      for (const row of board) {
        for (let i = 0; i < 5; i++) {
          if (row[i] === call) {
            row[i] = null
            if (check(board)) {
              winningBoard = board
              break outer
            }
          }
        }
      }
    }
  }

  const sum = winningBoard.reduce(
    (acc, row) => acc + row.reduce((acc2, cell) => acc2 + cell, 0),
    0,
  )
  return sum * lastCall
}

const part2 = (rawInput) => {
  const { calls, boards } = parseInput(rawInput)
  const marked = []
  let winningSum, lastCall
  for (const call of calls) {
    for (const board of boards) {
      for (const row of board) {
        for (let i = 0; i < 5; i++) {
          if (row[i] === call) {
            row[i] = null
            if (check(board)) {
              lastCall = call
              winningSum = board.reduce(
                (acc, row) => acc + row.reduce((acc2, cell) => acc2 + cell, 0),
                0,
              )
              board.splice(0, 5)
            }
          }
        }
      }
    }
  }

  return winningSum * lastCall
}

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
