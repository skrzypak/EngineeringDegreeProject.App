import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NutritionPlansService} from "../../../../services/msv/gastronomy-msv/nutrition-plans/nutrition-plans.service";
import {MenusService} from "../../../../services/msv/gastronomy-msv/menus/menus.service";
import {BehaviorSubject} from "rxjs";
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";
import {SpinnerWrapperComponent} from "../../../../components/spinner-wrapper/spinner-wrapper.component";

@Component({
  selector: 'app-plans-pages',
  templateUrl: './plans-pages.component.html',
  styleUrls: ['./plans-pages.component.css']
})
export class PlansPagesComponent implements OnInit {

  @ViewChild(MultiSelectSearchComponent) frmMenusChild!: MultiSelectSearchComponent;
  @ViewChild(SpinnerWrapperComponent) frmPlansChildSpinner!: SpinnerWrapperComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    plans: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }


  btnSetupKeys: any = {
    details: "Details",
    menus: "Menus",
  }

  searchable = {
    currentBtnKey: this.btnSetupKeys.menus,
    btnSetup: new Map<any, any>([
      [this.btnSetupKeys.menus, {
        headers: new Map<any, any>([
          ["name", "Name"],
          ["code", "Code"],
          ["description", "Description"],
        ]),
        color: "is-primary",
        display: Array<any>(),
        fetched: Array<any>(),
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.menus;
          this.publishSearchableLength(this.searchable.btnSetup.get(this.btnSetupKeys.menus).fetched.length);
        }
      }],
      [this.btnSetupKeys.details, {
        headers:  new Map<any, any>([
          ["name", "Name"],
          ["code", "Code"],
          ["description", "Description"],
          ["order", "No."],
        ]),
        color: "is-warning",
        tmp: {
          add: new Array<any>(),
          remove: new Array<any>(),
        },
        display: Array<any>(),
        fetched: Array<any>(),
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.details;
          let len = this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched.length;
          len += this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.length;
          this.publishSearchableLength(len);
        }
      }],
    ]),
    rxjs: new BehaviorSubject<number>(0),
  }

  constructor(
    private nutritionPlansService: NutritionPlansService,
    private menusService: MenusService,
    private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      code: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchMain();
    await this.fetchSearchable();
  }


  async fetchMain() {
    try {
      let data = await this.nutritionPlansService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      this.fetched.plans.data = data;
      this.publishMainLength(data.length);
    } catch (e) {
      this.publishMainLength(0);
    }
  }

  async fetchSearchable() {
    try {
      let data = await this.menusService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      this.searchable.btnSetup.get(this.btnSetupKeys.menus).fetched = data;
      this.publishSearchableLength(data.length);
    } catch (e) {
      this.publishSearchableLength(0);
    }
  }

  publishMainLength(o: number) {
    this.fetched.plans.rxjs.next(o);
  }

  publishSearchableLength(o: number) {
    this.searchable.rxjs.next(o);
  }

  subscribeRenderer(e: any) {
    this.fetched.plans.display = this.fetched.plans.data.slice(e[0], e[1]);
  }

  async onSelectPlan(id: number) {
    try {

      let resp = await this.nutritionPlansService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        name: resp.name,
        code: resp.code,
        description: resp.description
      });

      this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched = resp.menus;
      this.searchable.currentBtnKey = this.btnSetupKeys.details
      this.publishSearchableLength(resp.menus.length);
    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      this.frmPlansChildSpinner.setState(true);

      let menus = this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.map((o: any) => {
        return {
          "menu": o.menuId,
          "order": o.order
        }
      })

      await this.nutritionPlansService.fetchCreate({
        "code": this.ngFrmCtrl.frm.value.code,
        "name": this.ngFrmCtrl.frm.value.name,
        "description": this.ngFrmCtrl.frm.value.description,
        "menus": menus
      });

      this.onReset();
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
    } finally {
      this.frmPlansChildSpinner.setState(false);
    }
  }

  async onUpdate() {
    try {
      this.frmPlansChildSpinner.setState(true);

      let fetched = this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched.map((o: any) => {
        return {"menu": o.menuId, "order": o.order}
      })

      let remove = this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.remove.map((o: any) => {
        return {"menu": o.menuId, "order": o.order}
      })

      let menus = fetched.filter((o: any) => {
        return !remove.includes(o);
      });

      let add = this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.map((o: any) => {
        return {"menu": o.menuId, "order": o.order}
      })

      menus = menus.concat(add);

      await this.nutritionPlansService.fetchUpdate(this.ngFrmCtrl.frm.value.id, {
        "code": this.ngFrmCtrl.frm.value.code,
        "name": this.ngFrmCtrl.frm.value.name,
        "description": this.ngFrmCtrl.frm.value.description,
        "menus": menus
      });

      this.onReset();
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
    } finally {
      this.frmPlansChildSpinner.setState(false);
    }
  }

  async onDelete() {
    try {
      this.frmPlansChildSpinner.setState(true);
      await this.nutritionPlansService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
    } finally {
      this.frmPlansChildSpinner.setState(false);
    }
  }

  onReset() {
    this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.details).display = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.remove = [];
    this.searchable.currentBtnKey = this.btnSetupKeys.menus;
    this.ngFrmCtrl.frm.reset();
  }

  showMenus() {
    this.frmMenusChild.show();
  }

  zero() {
    return 0
  }

  subscribeRendererMenusPagination(e: Array<number>) {
    let item: any;
    const menus = this.btnSetupKeys.menus;
    const details = this.btnSetupKeys.details;

    switch (this.searchable.currentBtnKey) {
      case details:
        item = this.searchable.btnSetup.get(details);
        let arr =  item.fetched.concat(item.tmp.add)
        this.searchable.btnSetup.get(details).display = arr.slice(e[0], e[1]);
        break;
      default:
        item = this.searchable.btnSetup.get(menus);
        this.searchable.btnSetup.get(menus).display = item.fetched.slice(e[0], e[1]);
        break;
    }
  }

  addMenuToPlan(e: any) {
    this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.push(e);
    this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.sort(function(a: any, b: any) {
      return a.order - b.order;
    });
  }

  removeMenuFromPlan(e: any) {
    if(e.toString().includes("TMP_")) {
      this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add =
        this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.filter((o: any) => {
          return o.id != e;
        });
    } else {
      this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched =
        this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched.filter((o: any) => {
          return o.id != e;
        });
      this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.remove.push(e)
    }

    let len = this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched.length;
    len += this.searchable.btnSetup.get(this.btnSetupKeys.details).tmp.add.length;
    this.publishSearchableLength(len);
  }
}
