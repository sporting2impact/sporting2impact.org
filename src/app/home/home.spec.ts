import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('carousel', () => {
    const el = () => fixture.nativeElement as HTMLElement;
    const activeCaption = () => el().querySelector('.slide.active figcaption')?.textContent?.trim();
    const click = async (selector: string, index = 0) => {
      (el().querySelectorAll(selector)[index] as HTMLElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
    };

    it('starts on the first photo and shows one dot per photo', () => {
      expect(activeCaption()).toBe(component.slides[0].caption);
      expect(el().querySelectorAll('.dot').length).toBe(component.slides.length);
    });

    it('moves forward and back with the arrows, wrapping around at the ends', async () => {
      await click('.carousel-btn.next');
      expect(activeCaption()).toBe(component.slides[1].caption);

      await click('.carousel-btn.prev');
      await click('.carousel-btn.prev');
      expect(activeCaption()).toBe(component.slides[component.slides.length - 1].caption);
    });

    it('jumps to a photo when its dot is clicked', async () => {
      await click('.dot', 3);
      expect(activeCaption()).toBe(component.slides[3].caption);
      expect(el().querySelectorAll('.dot')[3].getAttribute('aria-current')).toBe('true');
    });

    it('never advances on its own', async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      fixture.detectChanges();
      expect(activeCaption()).toBe(component.slides[0].caption);
    });
  });
});
