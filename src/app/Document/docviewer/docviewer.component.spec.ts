import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocviewerComponent } from './docviewer.component';

describe('DocviewerComponent', () => {
  let component: DocviewerComponent;
  let fixture: ComponentFixture<DocviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
