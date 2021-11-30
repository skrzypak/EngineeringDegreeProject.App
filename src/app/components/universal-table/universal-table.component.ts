import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.css']
})
export class UniversalTableComponent implements OnInit {

  @Input() sourceObservable!: Observable<any>;
  @Input() keysDisplay: Map<any, any> = new Map<any, any>();
  @Output() clickedObject: EventEmitter<any> = new EventEmitter<any>();

  subscription!: Subscription;
  data: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.sourceObservable.subscribe((o: any) => {
      this.data = o;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  zero() {
    return 0
  }

  click(o: any) {
    this.clickedObject.next(o);
  }

}
