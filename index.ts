import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { timer, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// const myButton = document.getElementById('myButton');

// const myObservable = fromEvent(myButton, 'click');
// const subscription = myObservable.subscribe(event => console.log(event));

// const subscription2 = myObservable.subscribe({
//   next: event => console.log(event),
//   error: error => console.log(error),
//   complete: () => console.log('complete')
// });

// //subscription.unsubscribe();
  

// const dataSource = of(1,2,3,4,5,6);
// const observable2 = dataSource
// .pipe(
//   filter(value => value>3)
//   ,map(value=>value+1)
// );

// const sub2 = observable2.subscribe(value => {console.log(value)});
// //const sub3 = observable2.subscribe(value => console.log(value));
  
// //const sub = observable.subscribe(value => console.log('value '+value));



// const source = of('World').pipe(
//   map(x => `Hello ${x}!`)
// );

// source.subscribe(x => console.log(x));

// const sub = fromEvent(window, 'scroll')
// .subscribe(event => {
//   console.log(event);
//   //console.log(window.scrollY);
//   //console.log(window.innerHeight);
// });


// simulate url change with subject
const routeEnd = new Subject<{data: any, url: string}>();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
  tap(_ => console.log('executed')),
  pluck('url'),
  shareReplay(1)
);

// initial subscriber required
const initialSubscriber = lastUrl.subscribe(value => console.log('first:'+value));


// simulate route change
routeEnd.next({data: {}, url: 'my-path'});
routeEnd.next({data: {}, url: 'my-path2'});


// nothing logged
const lateSubscriber = lastUrl.subscribe(value => console.log('second:'+value));

//change to test branch

