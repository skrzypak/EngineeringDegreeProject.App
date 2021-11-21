import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "../../../../services/gastronomy-msv/participants/participants.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NutritionGroupService} from "../../../../services/gastronomy-msv/nutrition-groups/nutrition-group.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.css']
})
export class ParticipantsPageComponent implements OnInit {

  fetched : any = {
    participants: Array<any>(),
    nutritionGroups: Array<any>()
  }

  ngFrmCtrl: any = {
    frm: FormGroup,
    nutritionGroups: {
      left: [],
      right: []
    }
  }

  private rxjsSubjectNutritionGroup = new BehaviorSubject<any>({
    left: this.fetched.nutritionGroups,
    right: [],
  });

  rxjsObservableNutritionGroup = this.rxjsSubjectNutritionGroup.asObservable();

  constructor(
    private participantsService: ParticipantsService,
    private nutritionGroupService : NutritionGroupService,
    private fb: FormBuilder
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      description: new FormControl(),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.triggerFetchParticipants();
    await this.triggerFetchNutritionGroups();
  }

  async triggerFetchParticipants() {
    try {
      this.fetched.participants = await this.participantsService.fetchGetParticipants();
      this.fetched.participants.forEach((o : any) => o["selected"] = false);
    } catch (e) {
      this.fetched.participants = [];
    }
  }

  async triggerFetchNutritionGroups() {
    try {
      this.fetched.nutritionGroups = await this.nutritionGroupService.fetchGetNutritionGroups();
    } catch (e) {
      this.fetched.nutritionGroups = [];
    } finally {
      this.onReset();
    }
  }

  async onSelectParticipant(id: number) {
    try {
      let resp = await this.participantsService.fetchGetParticipantById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        firstName: resp.firstName,
        lastName: resp.lastName,
        description: resp.description
      });

      this.ngFrmCtrl.nutritionGroups.left =
        this.subArrays(this.fetched.nutritionGroups, resp.nutritionGroups, "id");

      this.ngFrmCtrl.nutritionGroups.right = resp.nutritionGroups;

      this.rxjsSubjectNutritionGroup.next({
        left: this.ngFrmCtrl.nutritionGroups.left,
        right: this.ngFrmCtrl.nutritionGroups.right
      });

    } catch (e) {
      this.ngFrmCtrl.frm.reset();
      console.log(e);
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      data.nutritionGroups = this.ngFrmCtrl.nutritionGroups.right.map((o: any) => o.id);
      await this.participantsService.fetchCreateParticipant(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      this.onReset()
    }
  }

  async onUpdate() {

  }

  async onDelete() {
    try {
      await this.participantsService.fetchDeleteParticipant(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
    this.ngFrmCtrl.nutritionGroups.left = this.fetched.nutritionGroups;
    this.ngFrmCtrl.nutritionGroups.right = [];

    this.rxjsSubjectNutritionGroup.next({
      left: this.ngFrmCtrl.nutritionGroups.left,
      right: this.ngFrmCtrl.nutritionGroups.right
    });
  }

  receiveNutritionGroupMultiSelectEvent(e: any) {
    this.ngFrmCtrl.nutritionGroups.left = e.left;
    this.ngFrmCtrl.nutritionGroups.right = e.right;
  }

  private subArrays(arr1: any, arr2: any, key: string) {
    return arr1.filter((leftValue: any) => !arr2.some((rightValue: any) =>
            leftValue[key] == rightValue[key])
    );
  }
}
