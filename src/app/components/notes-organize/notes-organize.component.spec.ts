import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesOrganizeComponent } from './notes-organize.component';

describe('NotesOrganizeComponent', () => {
  let component: NotesOrganizeComponent;
  let fixture: ComponentFixture<NotesOrganizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesOrganizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesOrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
