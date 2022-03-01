import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlappyComponent } from './flappy.component';

describe('FlappyComponent', () => {
  let component: FlappyComponent;
  let fixture: ComponentFixture<FlappyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlappyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlappyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
