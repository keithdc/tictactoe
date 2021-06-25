import {Component, OnInit} from '@angular/core';
import {BoardInterface} from "../../interface/board.interface";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  initBoard: BoardInterface[] = [];
  state: string = '';
  x: string = 'X';
  o: string = 'O';
  message: string = '';
  boardCount: number = 0;
  noOfBoards: number = 9;


  constructor() {
    this.message = 'Tic Tac Toe Game';
    this.initGameBoard();
  }

  get winner(): boolean {
    return this.checkDiagonal() || this.checkRowsOrColumns(this.initBoard, "row") || this.checkRowsOrColumns(this.initBoard, "col");
  }

  get gameOver(): boolean {
    return this.boardCount > this.noOfBoards - 1 || this.winner
  }

  initGameBoard(): void {
    this.initBoard = [];
    this.boardCount = 0;
    for (let i = 0; i < this.noOfBoards; i++) {
      this.initBoard.push({id: i, state: null})
    }
  }

  ngOnInit(): void {
    this.state = this.x;
  }


  play(board: BoardInterface): void {
    if (!board.state) {
      if (this.state === this.x) {
        board.state = this.o;
        this.state = this.o;
        this.message = `${this.x}'s Turn`
      } else {
        board.state = this.x;
        this.state = this.x;
        this.message = `${this.o}'s Turn`
      }
    }
    this.boardCount++;
  }

  checkRowsOrColumns(board: BoardInterface[], mode: string): boolean {
    const rowMode = mode === "row"
    const distinct = rowMode ? 1 : 3;
    const increment = rowMode ? 3 : 1;
    const length = rowMode ? 7 : 3;

    for (let i = 0; i < length; i += increment) {
      const firstPiece = board[i].state;
      const secondPiece = board[i + distinct]?.state;
      const thirdPiece = board[i + (distinct * 2)]?.state;

      if (firstPiece && secondPiece && thirdPiece) {
        if (firstPiece === secondPiece && secondPiece === thirdPiece) {
          return true;
        }
      }
    }
    return false
  }

  checkDiagonal() {
    const length = 2;
    const midPiece = this.initBoard[4].state;
    for (let i = 0; i <= length; i += 2) {
      const upperCorner = this.initBoard[i].state;
      const lowerCorner = this.initBoard[(this.noOfBoards - 1) - i].state;
      if (midPiece && upperCorner && lowerCorner) {
        if (midPiece === upperCorner && upperCorner === lowerCorner) {
          return true
        }
      }
    }

    return false
  }
}
