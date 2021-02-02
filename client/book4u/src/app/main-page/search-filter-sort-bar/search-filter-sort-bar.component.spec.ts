import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterSortBarComponent } from './search-filter-sort-bar.component';

describe('SearchFilterSortBarComponent', () => {
  let component: SearchFilterSortBarComponent;
  let fixture: ComponentFixture<SearchFilterSortBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterSortBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterSortBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
