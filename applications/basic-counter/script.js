import {
  fromEvent,
  interval,
  mapTo,
  merge,
  NEVER,
  pipe,
  scan,
  skipUntil,
  switchMap,
  takeUntil,
} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const interval$ = interval(1000);

const count$ = merge(start$, pause$).pipe(switchMap(shouldRun => {
  return shouldRun ? interval$ : NEVER;
}),scan(total=>total+1,0))

count$.subscribe((val) => {
  setCount(val);
})
