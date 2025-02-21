import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularImageCarouselComponent } from './angular-image-carousel.component';

describe('AngularImageCarouselComponent', () => {
  let component: AngularImageCarouselComponent;
  let fixture: ComponentFixture<AngularImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularImageCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
