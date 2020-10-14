import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocviewerDialogComponent } from './docviewer-dialog.component';

describe('DocviewerDialogComponent', () => {
  let component: DocviewerDialogComponent;
  let fixture: ComponentFixture<DocviewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocviewerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocviewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
