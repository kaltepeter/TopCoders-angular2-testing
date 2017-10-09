import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {BaseRequestOptions, Http, ResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('HeroService', () => {
  let mockResponse, matchingHero, connection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });

    const heroes = [
      {id: 2, name: 'Rubberman'},
      {id: 4, name: 'Dynama'}
    ];
    mockResponse = new Response(new ResponseOptions({body: {data: heroes}, status: 200}));
  });

  describe('getHero', () => {
    it('should return the correct hero when called with a valid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {

        backend.connections.subscribe(c => connection = c);
        service.getHero(4).then(hero => matchingHero = hero);
        connection.mockRespond(mockResponse);
        tick();

        expect(matchingHero.id).toBe(4);
        expect(matchingHero.name).toBe('Dynama');
      })));

    it('should return nothing when called with an invalid id', fakeAsync(
      inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {

        backend.connections.subscribe(c => connection = c);
        service.getHero(6).then(hero => matchingHero = hero);
        connection.mockRespond(mockResponse);
        tick();

        expect(matchingHero).toBeUndefined();
      })));
  });
});
