import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit, OnDestroy {

  @Input() title: string = "";
  @Input() leftTitle: string = "";
  @Input() rightTitle: string = "";
  @Input() sourceObservable!: Observable<any>;
  @Output() onChangeEvent = new EventEmitter<any>();

  subscription!: Subscription;

  ngFrmCtrl: any = {
    frm: FormGroup,
    left: [],
    right : []
  }

  constructor(private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      left : new FormControl(),
      right: new FormControl()
    });
  }

  ngOnInit(): void {
    this.subscription = this.sourceObservable.subscribe((o: any) => {
      this.ngFrmCtrl.left = o.left;
      this.ngFrmCtrl.right = o.right;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendChangeEvent() {
    this.onChangeEvent.emit({
      left: this.ngFrmCtrl.left,
      right: this.ngFrmCtrl.right
    })
  }

  transferToLeft() {
    this.transferItem("right", "left");
  }

  transferToRight() {
    this.transferItem("left", "right");
  }

  private transferItem(src: string, desc: string) {
    let ids : Array<number> = this.ngFrmCtrl.frm.value[src];
    if(ids != null && ids.length > 0) {
      let values = this.ngFrmCtrl[src].filter((o: any) => ids.includes(o.id));
      this.ngFrmCtrl[desc] = this.ngFrmCtrl[desc].concat(values);
      this.ngFrmCtrl[src] = this.ngFrmCtrl[src].filter((o: any) => !ids.includes(o.id));
      this.sendChangeEvent();
      this.frmCtrlClsFrm();
    }
  }

  private frmCtrlClsFrm() {
    this.ngFrmCtrl.frm.reset();
  }

}
