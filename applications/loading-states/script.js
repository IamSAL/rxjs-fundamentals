import { fromEvent, concat, of, race, timer } from 'rxjs';
import { tap, exhaustMap, delay, shareReplay, first } from 'rxjs/operators';

import {
  responseTimeField,
  showLoadingAfterField,
  showLoadingForAtLeastField,
  loadingStatus,
  showLoading,
  form,
  fetchData,
} from './utilities';

const loading$ = fromEvent(form, 'submit').pipe(
  exhaustMap(() => {

    const data$ = fetchData();

    const showLoading$ = of(true).pipe(
      delay(+showLoadingAfterField.value),
      tap(() => showLoading(true)),
    );

    const timeToHideLoading$ = timer(+showLoadingAfterField.value).pipe()

    const shouldShowLoading$ = concat(showLoading$, timeToHideLoading$,data$.pipe(tap(()=>showLoading(false))));

    return race(shouldShowLoading$, data$);
  }),
);
loading$.subscribe();
