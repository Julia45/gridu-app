import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() length: string;
  @Input() pageSize: number;
  @Input() pageIndex: number
  @Output() page = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageIndex) {
      console.log(changes)
      this.page.emit({
        pageIndex: this.pageIndex, 
        pageSize: this.pageSize, 
        length: Number(this.length)
      });
    }
  }

  ngOnInit(): void {}

  paginationChange(event) {
    this.page.emit(event);
  }
}
