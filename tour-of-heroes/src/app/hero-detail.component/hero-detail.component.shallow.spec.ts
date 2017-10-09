import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from '../hero.service/hero.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;
  let element;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(() => {
    const mockHeroService = {
      getHero: () => Promise.resolve(heroes[0]),
      update: () => Promise.resolve()
    };

    const mockActivatedRoute = {
      params: [
        {id: '3'}
      ]
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should show the correct hero name & id', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(element.querySelector('div').textContent).toContain('id: 3');
        expect(element.querySelector('div').textContent).toContain('Magneta');
      });
    }));
  });

  describe('changing the name', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it(`should change the hero's name (via nativeElement API)`, fakeAsync(() => {
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      inputElement.value = 'Super John';
      inputElement.dispatchEvent(createEvent('input'));
      fixture.detectChanges();
      expect(getHeadingText(fixture)).toContain('Super John');
    }));
  });
});

function createEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function getHeadingText(fixture) {
  return fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
}
