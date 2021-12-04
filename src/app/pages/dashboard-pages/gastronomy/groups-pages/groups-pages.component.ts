import {Component, OnInit, ViewChild} from '@angular/core';
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";
import {SpinnerWrapperComponent} from "../../../../components/spinner-wrapper/spinner-wrapper.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {NutritionPlansService} from "../../../../services/msv/gastronomy-msv/nutrition-plans/nutrition-plans.service";
import {NutritionGroupService} from "../../../../services/msv/gastronomy-msv/nutrition-groups/nutrition-group.service";
import {ParticipantsService} from "../../../../services/msv/gastronomy-msv/participants/participants.service";

@Component({
  selector: 'app-groups-pages',
  templateUrl: './groups-pages.component.html',
  styleUrls: ['./groups-pages.component.css']
})
export class GroupsPagesComponent implements OnInit {

  @ViewChild('multiSelectPlans') multiSelectPlans!: MultiSelectSearchComponent;
  @ViewChild('multiSelectParticipants') multiSelectParticipants!: MultiSelectSearchComponent;

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

  searchable = {
    plans: {
      keys: {
        list: "List",
        plans: "Plans",
      },
      current: "Plans",
      btnSetup: new Map<any, any>([
        ["List", {
          headers: new Map<any, any>([
            ["name", "Name"],
            ["code", "Code"],
            ["description", "Description"],
            ["startDate", "Start"],
            ["endDate", "End"],
          ]),
          color: "is-primary",
          display: Array<any>(),
          fetched: Array<any>(),
          tmp: {
            add: new Array<any>(),
            remove: new Array<any>(),
          },
          func: () => {
            const {list} = this.searchable.plans.keys
            this.searchable.plans.current = list;
            const {btnSetup} = this.searchable.plans;
            let len = btnSetup.get(list).fetched.length;
            len += btnSetup.get(list).tmp.add.length;
            this.publishSearchablePlansLength(len);
          }
        }],
        ["Plans", {
          headers:  new Map<any, any>([
            ["name", "Name"],
            ["code", "Code"],
            ["description", "Description"],
          ]),
          color: "is-warning",
          display: Array<any>(),
          fetched: Array<any>(),
          func: () => {
            const {plans} = this.searchable.plans.keys
            const {btnSetup} = this.searchable.plans;
            this.searchable.plans.current = plans;
            this.publishSearchablePlansLength(btnSetup.get(plans).fetched.length);
          }
        }],
      ]),
      rxjs: new BehaviorSubject<number>(0),
    },

    participants: {
      keys: {
        available: "Available",
        selected: "Selected",
      },
      current: "Available",
      btnSetup: new Map<any, any>([
        ["Available", {
          headers: new Map<any, any>([
            ["fullName", "Full Name"],
            ["description", "Description"],
          ]),
          color: "is-primary",
          display: Array<any>(),
          fetched: Array<any>(),
          hidden: Array<any>(),
          func: () => {
            const {available} = this.searchable.participants.keys
            const {btnSetup} = this.searchable.participants;
            this.searchable.participants.current = available;
            this.publishSearchableParticipantsLength(btnSetup.get(available).fetched.length);
          }
        }],
        ["Selected", {
          headers:  new Map<any, any>([
            ["fullName", "Full name"],
            ["description", "Description"],
            ["startDate", "Start Date"],
            ["endDate", "End Date"],
          ]),
          color: "is-warning",
          display: Array<any>(),
          fetched: Array<any>(),
          tmp: {
            add: new Array<any>(),
            remove: new Array<any>(),
          },
          func: () => {
            const {selected} = this.searchable.participants.keys
            this.searchable.participants.current = selected;
            const {btnSetup} = this.searchable.participants;
            let len = btnSetup.get(selected).fetched.length;
            len += btnSetup.get(selected).tmp.add.length;
            this.publishSearchableParticipantsLength(len);
          }
        }],
      ]),
      rxjs: new BehaviorSubject<number>(0),
    }
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
    await this.fetchSearchablePlans();
    await this.fetchSearchableParticipants();
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

  async fetchSearchablePlans() {
    try {
      let data = await this.nutritionPlansService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      const {plans} = this.searchable.plans.keys
      this.searchable.plans.btnSetup.get(plans).fetched = data;
      this.publishSearchablePlansLength(data.length);
    } catch (e) {
      this.publishSearchablePlansLength(0);
    }
  }

  async fetchSearchableParticipants() {
    try {
      let data = await this.participantsService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      const {available} = this.searchable.participants.keys
      this.searchable.participants.btnSetup.get(available).fetched = data;
      this.publishSearchableParticipantsLength(data.length);
    } catch (e) {
      this.publishSearchableParticipantsLength(0);
    }
  }

  publishMainLength(o: number) {
    this.fetched.groups.rxjs.next(o);
  }

  publishSearchablePlansLength(o: number) {
    this.searchable.plans.rxjs.next(o);
  }

  publishSearchableParticipantsLength(o: number) {
    this.searchable.participants.rxjs.next(o);
  }

  subscribeRenderer(e: any) {
    this.fetched.groups.display = this.fetched.groups.data.slice(e[0], e[1]);
  }

  async onSelectGroup(id: number) {
    try {
      this.onReset();

      let resp = await this.nutritionGroupService.fetchGetById(id);
      const {name, description, nutritionPlans, participants} = resp;

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        name: name,
        description: description
      });

      const {list} = this.searchable.plans.keys
      this.searchable.plans.btnSetup.get(list).fetched = nutritionPlans;
      this.searchable.plans.current = list;
      const {selected, available} = this.searchable.participants.keys
      this.searchable.participants.btnSetup.get(selected).fetched = participants;

      // Uniq available
      this.searchable.participants.btnSetup.get(available).hidden = participants;

      participants.forEach((r: any) => {
        this.searchable.participants.btnSetup.get(available).fetched =
          this.searchable.participants.btnSetup.get(available).fetched.filter((o: any) => {
            return o.id != r.id;
          })
      });

      this.searchable.participants.current = selected;
      this.publishSearchablePlansLength(nutritionPlans.length);
      this.publishSearchableParticipantsLength(this.searchable.participants.btnSetup.get(available).fetched.length);
    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      this.frmNutritionGroupsChildSpinner.setState(true);

      const {selected} = this.searchable.participants.keys
      let participants = this.searchable.participants.btnSetup.get(selected).tmp.add.map((o: any) => {
        return (({ participantId, startDate, endDate }) => ({ participantId, startDate, endDate }))(o)
      })

      const {list} = this.searchable.plans.keys
      let plans = this.searchable.plans.btnSetup.get(list).tmp.add.map((o: any) => {
        return (({ nutritionPlanId, startDate, endDate }) => ({ nutritionPlanId, startDate, endDate }))(o);
      })

      await this.nutritionGroupService.fetchCreate({
        "name": this.ngFrmCtrl.frm.value.name,
        "description": this.ngFrmCtrl.frm.value.description,
        "participants": participants,
        "plans": plans
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

  onResetPlans() {
    const {list, plans} = this.searchable.plans.keys
    this.searchable.plans.current = plans;
    this.searchable.plans.btnSetup.get(list).fetched = [];
    this.searchable.plans.btnSetup.get(list).display = [];
    this.searchable.plans.btnSetup.get(list).tmp.add = [];
    this.searchable.plans.btnSetup.get(list).tmp.remove = [];
    this.ngFrmCtrl.frm.reset();
  }

  onResetParticipants() {
    const {selected, available} = this.searchable.participants.keys
    this.searchable.participants.current = available;
    this.searchable.participants.btnSetup.get(selected).fetched = [];
    this.searchable.participants.btnSetup.get(selected).display = [];
    this.searchable.participants.btnSetup.get(selected).tmp.add = [];
    this.searchable.participants.btnSetup.get(selected).tmp.remove = [];

    this.searchable.participants.btnSetup.get(available).fetched
      .concat(this.searchable.participants.btnSetup.get(available).hidden)
    this.searchable.participants.btnSetup.get(available).hidden = [];

    this.ngFrmCtrl.frm.reset();
  }

  showPlans() {
    this.multiSelectPlans.show();
  }

  showParticipants() {
    this.multiSelectParticipants.show();
  }

  zero() {
    return 0
  }

  onReset() {
    this.onResetPlans()
    this.onResetParticipants()
  }

  subscribeRendererPlansPagination(e: Array<number>) {
    let item: any;
    const {plans, list} = this.searchable.plans.keys;

    switch (this.searchable.plans.current) {
      case list:
        item = this.searchable.plans.btnSetup.get(list);
        let arr =  item.fetched.concat(item.tmp.add)
        this.searchable.plans.btnSetup.get(list).display = arr.slice(e[0], e[1]);
        break;
      default:
        item = this.searchable.plans.btnSetup.get(plans);
        this.searchable.plans.btnSetup.get(plans).display = item.fetched.slice(e[0], e[1]);
    }
  }

  addNutritionPlan(e: any) {
    const {list} = this.searchable.plans.keys;
    this.searchable.plans.btnSetup.get(list).tmp.add.push(e);
  }

  removeNutritionPlan(e: any) {
    const {list} = this.searchable.plans.keys;
    if(e.toString().includes("TMP_")) {
      this.searchable.plans.btnSetup.get(list).tmp.add =
        this.searchable.plans.btnSetup.get(list).tmp.add.filter((o: any) => {
          return o.id != e;
        });
    } else {
      this.searchable.plans.btnSetup.get(list).fetched =
        this.searchable.plans.btnSetup.get(list).fetched.filter((o: any) => {
          return o.id != e;
        });
      this.searchable.plans.btnSetup.get(list).tmp.remove.push(e)
    }

    let len = this.searchable.plans.btnSetup.get(list).fetched.length;
    len += this.searchable.plans.btnSetup.get(list).tmp.add.length;
    this.publishSearchablePlansLength(len);
  }

  subscribeRendererParticipantsPagination(e: Array<number>) {
    let item: any;
    const {selected, available} = this.searchable.participants.keys;

    switch (this.searchable.participants.current) {
      case selected:
        item = this.searchable.participants.btnSetup.get(selected);
        let arr =  item.fetched.concat(item.tmp.add)
        this.searchable.participants.btnSetup.get(selected).display = arr.slice(e[0], e[1]);
        break;
      default:
        item = this.searchable.participants.btnSetup.get(available);
        this.searchable.participants.btnSetup.get(available).display = item.fetched.slice(e[0], e[1]);
    }
  }

  addParticipant(e: any) {
    const {selected, available} = this.searchable.participants.keys;

    this.searchable.participants.btnSetup.get(selected).tmp.add.push(e);

    // Update available part
    this.searchable.participants.btnSetup.get(available).fetched =
      this.searchable.participants.btnSetup.get(available).fetched.filter((o: any) => {
        return o.id != e.participantId;
      });

    this.searchable.participants.btnSetup.get(selected).tmp.remove =
      this.searchable.participants.btnSetup.get(selected).fetched.filter((o: number) => {
        return o != e.participantId;
      });

    this.publishSearchableParticipantsLength(this.searchable.participants.btnSetup.get(available).fetched.length);
  }

  removeParticipant(e: any) {
    const {selected, available} = this.searchable.participants.keys;

    let id = e.id;

    if(id.toString().includes("TMP_")) {
      this.searchable.participants.btnSetup.get(selected).tmp.add =
        this.searchable.participants.btnSetup.get(selected).tmp.add.filter((o: any) => {
          return o.id != id;
        });

      // Restore to original fetch
      e.id = e.participantId;
      delete e.participantId;
    } else {
      this.searchable.participants.btnSetup.get(selected).fetched =
        this.searchable.participants.btnSetup.get(selected).fetched.filter((o: any) => {
          return o.id != id;
        });
      this.searchable.participants.btnSetup.get(selected).tmp.remove.push(id)
    }

    this.searchable.participants.btnSetup.get(available).fetched.push(e)

    let len = this.searchable.participants.btnSetup.get(selected).fetched.length;
    len += this.searchable.participants.btnSetup.get(selected).tmp.add.length;
    this.publishSearchableParticipantsLength(len);
  }
}
