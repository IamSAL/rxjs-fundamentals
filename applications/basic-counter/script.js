import { fromEvent, interval, merge, NEVER, scan, skipUntil, takeUntil } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

const count$ = interval(1000).pipe(
  skipUntil(start$),
  scan((acc,v)=>acc+1,0),
    takeUntil(pause$)
  );
let interval$
const startCount = () => {
 interval$=count$.subscribe((val) => {
    setCount(val)

 })

};


startCount();
