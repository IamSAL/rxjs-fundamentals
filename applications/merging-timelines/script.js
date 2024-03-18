//@ts-check
import { fromEvent, merge, interval, concat, race, forkJoin } from 'rxjs';
import { mapTo, startWith, take, map } from 'rxjs/operators';
import {
  labelWith,
  startButton,
  pauseButton,
  setStatus,
  bootstrap,
} from './utilities';



const first$ = interval(1500).pipe(map(labelWith('First')),take(4))
const second$ = interval(1000).pipe(map(labelWith('Second')),take(4))
const combined$ = forkJoin(first$,second$)

bootstrap({first$, second$, combined$})
