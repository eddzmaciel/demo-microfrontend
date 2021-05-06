import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmViewComponent } from './em-view.component';

describe('EmViewComponent', () => {
  let component: EmViewComponent;
  let fixture: ComponentFixture<EmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
