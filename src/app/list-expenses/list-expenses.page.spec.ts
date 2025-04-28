import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListExpensesPage } from './list-expenses.page';

describe('ListExpensesPage', () => {
  let component: ListExpensesPage;
  let fixture: ComponentFixture<ListExpensesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
