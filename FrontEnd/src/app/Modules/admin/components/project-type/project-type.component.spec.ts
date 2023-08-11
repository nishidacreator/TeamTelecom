import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeComponent } from './project-type.component';

describe('ProjectTypeComponent', () => {
  let component: ProjectTypeComponent;
  let fixture: ComponentFixture<ProjectTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTypeComponent]
    });
    fixture = TestBed.createComponent(ProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
