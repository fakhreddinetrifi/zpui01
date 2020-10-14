import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDocViewerComponent } from './pdf-doc-viewer.component';

describe('PdfDocViewerComponent', () => {
  let component: PdfDocViewerComponent;
  let fixture: ComponentFixture<PdfDocViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDocViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
