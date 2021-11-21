import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() title: string = "";
  @Input() leftTitle: string = "";
  @Input() rightTitle: string = "";

  private _fetchedData: any;

  private _ngFrmCtrl: any = {
    frm: FormGroup,
    left: [],
    right : []
  }

  constructor(private fb: FormBuilder) {
    this._ngFrmCtrl.frm = this.fb.group({
      left : new FormControl(),
      right: new FormControl()
    });
  }

  ngOnInit(): void {}

  transferToLeft() {
    this.transferItem("right", "left");
  }

  transferToRight() {
    this.transferItem("left", "right");
  }

  private transferItem(src: string, desc: string) {
    let ids : Array<number> = this._ngFrmCtrl.frm.value[src];
    if(ids != null && ids.length > 0) {
      let values = this._ngFrmCtrl[src].filter((o: any) => ids.includes(o.id));
      this._ngFrmCtrl[desc] = this._ngFrmCtrl[desc].concat(values);
      this._ngFrmCtrl[src] = this._ngFrmCtrl[src].filter((o: any) => !ids.includes(o.id));
      this.frmReset();
    }
  }

  get fetchedData() {
    return this._fetchedData;
  }

  set fetchedData(o: any) {
    this._fetchedData = o;
  }

  get localLeft() {
    return this._ngFrmCtrl.left;
  }

  get localRight() {
    return this._ngFrmCtrl.right;
  }

  set response(resp: any) {
    this._ngFrmCtrl.left = this.subtractArrays(this._fetchedData, resp, "id");
    this._ngFrmCtrl.right = resp;
  }

  localReset() {
    this._ngFrmCtrl.frm.reset();
    this._ngFrmCtrl.left = this._fetchedData;
    this._ngFrmCtrl.right = [];
  }

  public getNgFrmCtrl() {
    return this._ngFrmCtrl;
  }

  public frmReset() {
    this._ngFrmCtrl.frm.reset();
  }

  public hardReset() {
    this.frmReset();
    this._ngFrmCtrl.left = this._fetchedData;
    this._ngFrmCtrl.right = [];
  }

  private subtractArrays(arr1: any, arr2: any, key: string) {
    return arr1.filter((leftValue: any) => !arr2.some((rightValue: any) =>
      leftValue[key] == rightValue[key])
    );
  }

}
