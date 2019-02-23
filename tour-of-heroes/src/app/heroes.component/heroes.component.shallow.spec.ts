import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeroesComponent', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let element;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(() => {
    const mockHeroService = {
      getHeroes: () => Promise.resolve(heroes),
      update: () => Promise.resolve(),
      create: () => fail('spy on create to validate')
    };

    const mockActivatedRoute = {
      params: [
        {id: '3'}
      ]
    };

    TestBed.configureTestingModule({
      imports: [
        // FormsModule
        RouterTestingModule
      ],
      declarations: [
        HeroesComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
      schemas: [
        NO_ERRORS_SCHEMA // will hide that angular doesn't know about ngModel
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  describe('getHeroes', () => {
    it('should set heroes from heroService.getHeroes', fakeAsync(() => {
      component.getHeroes();
      tick();
      expect(component.heroes.length).toBe(2);
    }));
  });

  describe('add', () => {
    let service;

    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      service = TestBed.get(HeroService);
      spyOn(service, 'create').and
        .returnValue(Promise.resolve({id: 7, name: 'New Hero', strength: 7}));
    }));

    it('should disallow empty name', fakeAsync(() =>{
      component.add('');
      tick();
      expect(service.create).not.toHaveBeenCalled();
      expect(component.heroes.length).toBe(2);
    }));

    it('should update heroes after creating new hero', () =>{

    });
  });

  describe('delete', () => {

  });

  describe('onSelect', () => {

  });

  describe('gotoDetail', () => {

  });
});
