import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
  pluck,
  first,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
  renderPokemon,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/search/';


const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((event) => event.target.value ),
  distinctUntilChanged(),
  switchMap(searchTerm => {
    return fromFetch(endpoint + searchTerm+'?delay=1000&chaos=true').pipe(
      mergeMap(res=>res.json())
    )
  }),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults),

)


const search2$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((event) => event.target.value),
  // distinctUntilChanged(),
  switchMap((searchTerm) =>
    fromFetch(endpoint + searchTerm + '?delay=5000&chaos=true').pipe(
      mergeMap((response) => response.json()),
    ),
  ),
  pluck('pokemon'),
  mergeMap((poke) => poke),
  first(),
  tap((v) => console.log({ v })),
  tap(renderPokemon),
);

search2$.subscribe()
