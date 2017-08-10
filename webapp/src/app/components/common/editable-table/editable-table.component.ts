import {Component, Input, OnInit} from "@angular/core";
/**
 * @author Amila Karunathilaka
 */

@Component({
  selector: 'drone-comm-editable-table',
  templateUrl: './editable-table.component.html'
})
export class EditableTableComponent implements OnInit{

  @Input()
  tableHeaders: string[] = new Array();

  @Input()
  tableRows: string[][] = Array();

  newRow: string[] = new Array();
  editRow: number = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

  addRow() {
    this.editRow = -1;
    for(let i = 0; i<this.tableHeaders.length; i++){
      if(!this.newRow[i] || this.newRow[i].trim().length == 0) {
        return;
      }
    }
    this.tableRows.push(this.newRow);
    this.newRow = new Array();
  }

  removeRow(id: number) {
    this.tableRows.splice(id, 1);
  }
}
