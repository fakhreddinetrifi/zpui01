import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedoclistComponent } from './pagedoclist.component';

describe('PagedoclistComponent', () => {
  let component: PagedoclistComponent;
  let fixture: ComponentFixture<PagedoclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedoclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
