import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodosfairoComponent } from './podosfairo.component';

describe('PodosfairoComponent', () => {
  let component: PodosfairoComponent;
  let fixture: ComponentFixture<PodosfairoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodosfairoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodosfairoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
