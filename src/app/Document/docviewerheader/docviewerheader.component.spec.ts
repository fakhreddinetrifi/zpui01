import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocviewerheaderComponent } from './docviewerheader.component';

describe('DocviewerheaderComponent', () => {
  let component: DocviewerheaderComponent;
  let fixture: ComponentFixture<DocviewerheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocviewerheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocviewerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
