import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {AllergensService} from "../../../../services/msv/inventory-msv/allergens/allergens.service";

@Component({
  selector: 'app-allergens-page',
  templateUrl: './allergens-page.component.html',
  styleUrls: ['./allergens-page.component.css']
})
export class AllergensPageComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    allergens: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

  constructor(
    private allergensService: AllergensService,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      code: new FormControl('',[
        Validators.maxLength(6),
      ]),
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
      ]),
      description: new FormControl('',[
        Validators.maxLength(3000),
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  async fetch() {
    try {
      let data = await this.allergensService.fetchGet();
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.allergensService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        code: resp.code,
        name: resp.name,
        description: resp.description
      });

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      await this.allergensService.fetchCreate(data);
      setTimeout( function () {window.location.reload()}, 1500)
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      await this.allergensService.fetchUpdate(data);
      setTimeout( function () {window.location.reload()}, 1500)
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onDelete() {
    try {
      await this.allergensService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.allergens.data = o;
    this.fetched.allergens.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.allergens.display = this.fetched.allergens.data.slice(e[0], e[1]);
  }

}
