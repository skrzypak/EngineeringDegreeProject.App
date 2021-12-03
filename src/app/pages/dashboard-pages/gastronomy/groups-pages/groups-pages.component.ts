import {Component, OnInit, ViewChild} from '@angular/core';
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";
import {SpinnerWrapperComponent} from "../../../../components/spinner-wrapper/spinner-wrapper.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {NutritionPlansService} from "../../../../services/msv/gastronomy-msv/nutrition-plans/nutrition-plans.service";
import {MenusService} from "../../../../services/msv/gastronomy-msv/menus/menus.service";
import {NutritionGroupService} from "../../../../services/msv/gastronomy-msv/nutrition-groups/nutrition-group.service";
import {ParticipantsService} from "../../../../services/msv/gastronomy-msv/participants/participants.service";

@Component({
  selector: 'app-groups-pages',
  templateUrl: './groups-pages.component.html',
  styleUrls: ['./groups-pages.component.css']
})
export class GroupsPagesComponent implements OnInit {

  // {
  //   "name": "string",
  //   "description": "string",
  //   "participants": [
  //     0
  //   ]
  // }

  //@ViewChild(MultiSelectSearchComponent) frmPlansChild!: MultiSelectSearchComponent;
  //@ViewChild(MultiSelectSearchComponent) frmParticipantsChild!: MultiSelectSearchComponent;
  @ViewChild(SpinnerWrapperComponent) frmNutritionGroupsChildSpinner!: SpinnerWrapperComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    groups: {
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
    currentBtnKey: this.btnSetupKeys.dishes,
    btnSetup: new Map<any, any>([
      [this.btnSetupKeys.menus, {
        headers: new Map<any, any>([
          ["name", "Name"],
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
          ["description", "Description"],
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
          this.publishSearchableLength(this.searchable.btnSetup.get(this.btnSetupKeys.details).fetched.length);
        }
      }],
    ]),
    rxjs: new BehaviorSubject<number>(0),
  }

  constructor(
    private nutritionGroupService: NutritionGroupService,
    private nutritionPlansService: NutritionPlansService,
    private participantsService: ParticipantsService,
    private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchMain();
    // await this.fetchSearchable();
  }


  async fetchMain() {
    try {
      let data = await this.nutritionGroupService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      this.fetched.groups.data = data;

      this.publishMainLength(data.length);
    } catch (e) {
      this.publishMainLength(0);
    }
  }

  // async fetchSearchable() {
  //   try {
  //     let data = await this.menusService.fetchGet();
  //     // data.forEach((o : any) => o["selected"] = false);
  //     this.searchable.btnSetup.get(this.btnSetupKeys.products).fetched = data;
  //     this.publishSearchableLength(data.length);
  //   } catch (e) {
  //     this.publishSearchableLength(0);
  //   }
  // }

  publishMainLength(o: number) {
    this.fetched.groups.rxjs.next(o);
  }

  publishSearchableLength(o: number) {
    this.searchable.rxjs.next(o);
  }

  subscribeRenderer(e: any) {
    this.fetched.groups.display = this.fetched.groups.data.slice(e[0], e[1]);
  }

  async onSelectPlan(id: number) {
    try {

      let resp = await this.nutritionGroupService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        name: resp.name,
        description: resp.description
      });

      // this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched = resp.participants;
      // this.searchable.currentBtnKey = this.btnSetupKeys.ingredients
      // this.publishSearchableLength(resp.ingredients.length);
    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      this.frmNutritionGroupsChildSpinner.setState(true);

      // let ingredients = this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add.map((o: any) => {
      //   return (({ productId, valueOfUse }) => ({ productId, valueOfUse }))(o);
      // })
      //

      await this.nutritionGroupService.fetchCreate({
        "name": this.ngFrmCtrl.frm.value.name,
        "description": this.ngFrmCtrl.frm.value.description,
        "participants": []
      });

      this.onReset();
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmNutritionGroupsChildSpinner.setState(false);
    }
  }

  async onUpdate() {

  }

  async onDelete() {
    try {
      this.frmNutritionGroupsChildSpinner.setState(true);
      await this.nutritionGroupService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmNutritionGroupsChildSpinner.setState(false);
    }
  }

  onReset() {
    // this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched = [];
    // this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).display = [];
    // this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add = [];
    // this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.remove = [];
    // this.searchable.currentBtnKey = this.btnSetupKeys.products;
    this.ngFrmCtrl.frm.reset();
  }

  showPlans() {
    //this.frmPlansChild.show();
  }

  showParticipants() {
    //this.frmParticipantsChild.show();
  }

  zero() {
    return 0
  }

}
