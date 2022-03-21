import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from "@angular/platform-browser";

import { PaginationComponent } from './pagination.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [MatChipsModule, MatPaginatorModule, BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page change', () => {
    component.length = "12";
    fixture.detectChanges()

    const nextButton = fixture.debugElement.query(By.css('.mat-paginator-navigation-next')).nativeElement;
    nextButton.dispatchEvent(new Event('click'));
    component.paginationChange(1);
    component.page.emit()
  });

  it('emit page change on ngOnChanges', () => {
    let prev_value = undefined;
    let new_value = 1;
    let is_first_change: boolean = true;

    const changesObj: SimpleChanges = {
      pageIndex: new SimpleChange(prev_value, new_value, is_first_change),
    };

    component.pageIndex = 1;
    component.ngOnChanges(changesObj);
    component.page.emit({
      pageIndex: 1, 
      pageSize: component.pageSize, 
      length: Number(component.length)
    })

    // component.page.emit({
    //   pageIndex: component.pageIndex, 
    //   pageSize: component.pageSize, 
    //   length: Number(component.length)
    // })
  });
});
