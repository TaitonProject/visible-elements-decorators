import { Component, OnInit } from '@angular/core';
import { Unsubscribe, AutoUnsubscribe } from '../utils/decorators/tooltip.decorator';
import { interval, Subscription, Subject } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.less']
})
export class MyComponentComponent implements OnInit {

  myObs = interval(1000);
  myObs2 = interval(1000);
  gg: Subject<any> = new Subject();
  subscriptions: Array<Subscription> = [this.myObs2.subscribe(_ => console.log('efe', _))];

  constructor() { }

  ngOnInit() {
    this.myObs.subscribe(res => this.gg.next(res));
    this.gg.subscribe(res => console.log('gg', res));
    // this.subscriptions.push(this.myObs.subscribe(res => console.log(res)));
    this.myObs.subscribe(res => console.log(res));
  }

}
