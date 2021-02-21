import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreateModalComponent } from './update-create-modal.component';

describe('UpdateCreateModalComponent', () => {
  let component: UpdateCreateModalComponent;
  let fixture: ComponentFixture<UpdateCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
