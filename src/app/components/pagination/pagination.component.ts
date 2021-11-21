import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnDestroy, OnInit {

  @Input() itemToDisplay: number = 15;
  @Input() sourceObservable!: Observable<any>;
  @Output() rendererEmitter = new EventEmitter<any>();

  pagination = {
    currPageNum: 1,
    lastPageNum: 1,
    itemsDisplay: this.itemToDisplay,
    navigator: {
      max: 5,
      current: 0,
      links: {
        middle: Array<any>()
      },
    }
  }

  subscription!: Subscription;
  data: Array<any> = new Array<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.subscription = this.sourceObservable.subscribe((o: any) => {
      this.data = o;
      this.setupPages();
      this.processRenderer();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setupPages() {
    let len = this.data.length;
    this.pagination.lastPageNum = Math.max(1, Math.ceil(len / this.pagination.itemsDisplay));

    if(this.pagination.currPageNum > this.pagination.lastPageNum) {
      this.pagination.currPageNum = this.pagination.lastPageNum;
    }

    for(let i = 2, j = 0; i < this.pagination.lastPageNum && j < this.pagination.navigator.max; i++, j++) {
      this.pagination.navigator.links.middle.push(i);
    }

  }

  private processRenderer() {
    let start = (this.pagination.currPageNum - 1) * this.pagination.itemsDisplay;
    let count = start + (this.pagination.itemsDisplay - 1);
    this.sendRendererData(this.data.slice(start, count));
  }

  onClickPage(pageNum: number, linkIndex: number) {
    if(pageNum > 0 && pageNum <= this.pagination.lastPageNum) {
      this.pagination.currPageNum = pageNum;
      this.pagination.navigator.current = linkIndex;
      this.processRenderer();
    }
  }

  onPreviousClick() {
    if(this.pagination.currPageNum > 1) {
      if(this.pagination.currPageNum > 2) {
        if(this.pagination.currPageNum < this.pagination.lastPageNum) {
          this.pagination.currPageNum--;
          if(this.pagination.navigator.current > 1) {
            this.pagination.navigator.current--;
          } else {
            this.pagination.navigator.links.middle = this.pagination.navigator.links.middle.map((n: number) => n - 1);
          }
        } else {
          // Currently active is last page
          this.pagination.navigator.current--;
          this.pagination.currPageNum--;
          this.pagination.navigator.links.middle = [];

          const {lastPageNum} = this.pagination;
          const {max} = this.pagination.navigator;

          for(let i = lastPageNum - 1, j = 0; i > 1 && j < max; i--, j++) {
            this.pagination.navigator.links.middle.unshift(i);
          }
        }
      } else {
        this.pagination.currPageNum = 1;
        this.pagination.navigator.current = 0;
      }
      this.processRenderer();
    }
  }

  onNextClick() {
    if(this.pagination.currPageNum < this.pagination.lastPageNum) {
      if(this.pagination.currPageNum < this.pagination.lastPageNum - 1) {
        if(this.pagination.currPageNum > 1) {
          this.pagination.currPageNum++;
          if(this.pagination.navigator.current < this.pagination.navigator.max) {
            this.pagination.navigator.current++;
          } else {
            this.pagination.navigator.links.middle = this.pagination.navigator.links.middle.map((n: number) => n + 1);
          }
        } else {
          // Currently active is first page
          this.pagination.navigator.current++;
          this.pagination.currPageNum++;
          this.pagination.navigator.links.middle = [];

          const {lastPageNum} = this.pagination;
          const {max} = this.pagination.navigator;

          for(let i = 2, j = 0; i < lastPageNum && j < max; i++, j++) {
            this.pagination.navigator.links.middle.push(i);
          }
        }
      } else {
        this.pagination.currPageNum = this.pagination.lastPageNum;
        const {max} = this.pagination.navigator
        const len = this.pagination.navigator.links.middle.length;
        this.pagination.navigator.current = max > len ? len + 1 : max + 1;
      }
      this.processRenderer();
    }
  }

  private sendRendererData(data: any) {
    this.rendererEmitter.emit(data);
  }

}
