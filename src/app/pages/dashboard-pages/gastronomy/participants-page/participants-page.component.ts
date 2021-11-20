import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "../../../../services/gastronomy-msv/participants/participants.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NutritionGroupService} from "../../../../services/gastronomy-msv/nutrition-groups/nutrition-group.service";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.css']
})
export class ParticipantsPageComponent implements OnInit {

  fetchParticipants: Array<any> = [];
  fetchNutritionGroups: Array<any> = [];

  ngFormContainer: any = {
    ngForm: FormGroup,
    leftNutritionGroups: [],
    rightNutritionGroups : []
  }

  constructor(
    private participantsService: ParticipantsService,
    private nutritionGroupService : NutritionGroupService,
    private fb: FormBuilder
  ) {
    this.ngFormContainer.ngForm = this.fb.group({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      description: new FormControl(),
      leftNutritionGroups : new FormControl(),
      rightNutritionGroups: new FormControl()
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.fetchParticipants = await this.participantsService.fetchGetParticipants();
      this.fetchParticipants.forEach(item => item["selected"] = false);
    } catch (e) {
      console.log(e);
      this.fetchParticipants = [];
    }

    try {
      this.fetchNutritionGroups = await this.nutritionGroupService.fetchGetNutritionGroups();
      this.ngFormContainer.leftNutritionGroups = this.fetchNutritionGroups;
    } catch (e) {
      console.log(e);
      this.fetchNutritionGroups = [];
    }
  }

  async onSelectParticipant(id: number) {
    try {
      let resp = await this.participantsService.fetchGetParticipantById(id);

      this.ngFormContainer.ngForm.setValue({
        id: resp.id,
        firstName: resp.firstName,
        lastName: resp.lastName,
        description: resp.description,
        leftNutritionGroups: [],
        rightNutritionGroups: []
      });

      this.ngFormContainer.leftNutritionGroups =
        this.subArrays(this.fetchNutritionGroups, resp.nutritionGroups, "id");

      this.ngFormContainer.rightNutritionGroups = resp.nutritionGroups;

    } catch (e) {
      this.ngFormContainer.ngForm.reset();
      console.log(e);
    }
  }

  async onCreate() {
    try {
      let data = this.ngFormContainer.ngForm.value
      delete data.id;
      await this.participantsService.fetchCreateParticipant(data);
      window.location.reload();
    } catch (e) {
      this.onReset();
      console.log(e);
    }
  }

  async onUpdate() {

  }

  async onDelete() {
    try {
      await this.participantsService.fetchDeleteParticipant(this.ngFormContainer.ngForm.value.id);
      window.location.reload();
    } catch (e) {
      this.onReset();
      console.log(e);
    }
  }

  onReset() {
    this.ngFormContainer.ngForm.reset();
    this.ngFormContainer.leftNutritionGroups = this.fetchNutritionGroups;
    this.ngFormContainer.rightNutritionGroups = [];
  }

  itemToLeft() {
    let rightIds = this.ngFormContainer.ngForm.value.rightNutritionGroups;
    let rightValues = this.ngFormContainer.rightNutritionGroups.filter((o: any) => rightIds.includes(o.id));
    this.ngFormContainer.leftNutritionGroups = this.ngFormContainer.leftNutritionGroups.concat(rightValues);
    this.ngFormContainer.rightNutritionGroups =
      this.ngFormContainer.rightNutritionGroups.filter((o: any) => !rightIds.includes(o.id));
    this.itemFormCls();
  }

  itemToRight() {
    let leftIds = this.ngFormContainer.ngForm.value.leftNutritionGroups;
    let leftValues = this.ngFormContainer.leftNutritionGroups.filter((o: any) => leftIds.includes(o.id));
    this.ngFormContainer.rightNutritionGroups = this.ngFormContainer.rightNutritionGroups.concat(leftValues);
    this.ngFormContainer.leftNutritionGroups =
      this.ngFormContainer.leftNutritionGroups.filter((o: any) => !leftIds.includes(o.id));
    this.itemFormCls();
  }

  private itemFormCls() {
    this.ngFormContainer.ngForm.patchValue({
      leftNutritionGroups: [],
      rightNutritionGroups: [],
    });
  }

  private subArrays(arr1: any, arr2: any, key: string) {
    return arr1.filter((leftValue: any) => !arr2.some((rightValue: any) =>
            leftValue[key] == rightValue[key])
    );
  }
}
