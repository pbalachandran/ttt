import {Component} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  options: string[] = ['X', 'O'];

  cellsFilled: number = 0;
  isGameOn: boolean = false;
  isGameOver: boolean = false;
  isDrawn: boolean = false;
  isWon: boolean = false;
  winner: string;
  current: string;

  board: Row[] = [];

  constructor() {
    this.board[0] = new Row();
    this.board[1] = new Row();
    this.board[2] = new Row();
  }

  getCellValue(rowIndex: number, colIndex: number): string {
    let row = this.board[rowIndex];
    return row.cells[colIndex].value;
  }

  getCellState(rowIndex: number, colIndex: number): boolean {
    let row = this.board[rowIndex];
    return row.cells[colIndex].isDisabled;
  }

  setCellValue(rowIndex: number, colIndex: number, value: string) {
    let row = this.board[rowIndex];
    row.cells[colIndex].value = value;
    row.cells[colIndex].isDisabled = true;
  }

  disableCell(rowIndex: number, colIndex: number) {
    let row = this.board[rowIndex];
    row.cells[colIndex].isDisabled = true;
  }

  recordInput(rowIndex: number, colIndex: number) {
    if (this.isGameOn) {
      this.setCellValue(rowIndex, colIndex, this.current);
      if (this.current === 'X') {
        this.current = 'O';
        this.cellsFilled++;
      } else if (this.current === 'O') {
        this.current = 'X';
        this.cellsFilled++;
      }
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (this.won(this.getCellValue(0, 0), this.getCellValue(0, 1), this.getCellValue(0, 2))
      || this.won(this.getCellValue(1, 0), this.getCellValue(1, 1), this.getCellValue(1, 2))
      || this.won(this.getCellValue(2, 0), this.getCellValue(2, 1), this.getCellValue(2, 2))
      || this.won(this.getCellValue(0, 0), this.getCellValue(1, 0), this.getCellValue(2, 0))
      || this.won(this.getCellValue(0, 1), this.getCellValue(1, 1), this.getCellValue(2, 1))
      || this.won(this.getCellValue(0, 2), this.getCellValue(1, 2), this.getCellValue(2, 2))
      || this.won(this.getCellValue(0, 0), this.getCellValue(1, 1), this.getCellValue(2, 2))
      || this.won(this.getCellValue(0, 2), this.getCellValue(1, 1), this.getCellValue(2, 0))) {
      this.isGameOver = true;
      this.isWon = true;
      this.disableCells();
    } else if (this.drawn()) {
      this.isGameOver = true;
      this.isDrawn = true;
      this.disableCells();
    }
  }

  won(value1: string, value2: string, value3: string): boolean {
    if ((value1 === 'X' || value1 == 'O') && (value1 === value2) && (value2 === value3)) {
      this.winner = value1;
      return true;
    }
    return false;
  }

  drawn(): boolean {
    if (this.cellsFilled === 9) {
      return true;
    }
    return false;
  }

  disableCells() {
    this.disableCell(0, 0);
    this.disableCell(0, 1);
    this.disableCell(0, 2);
    this.disableCell(1, 0);
    this.disableCell(1, 1);
    this.disableCell(1, 2);
    this.disableCell(2, 0);
    this.disableCell(2, 1);
    this.disableCell(2, 2);
  }

  startGame() {
    this.isGameOn = true;
  }
}

export class Row {
  cells: Cell[] = [];

  constructor() {
    this.cells[0] = new Cell();
    this.cells[1] = new Cell();
    this.cells[2] = new Cell();
  }
}

export class Cell {
  value: string;
  isDisabled: boolean = false;

  constructor() {
    this.value = '';
  }
}
