import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() length: string;
  @Input() pageSize: any;
  @Input() pageIndex: number
  @Output() page = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnChanges(chnages: any) {
    if (chnages.pageIndex) {
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
