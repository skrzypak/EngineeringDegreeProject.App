import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantsService} from "../../../../services/msv/gastronomy-msv/participants/participants.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NutritionGroupService} from "../../../../services/msv/gastronomy-msv/nutrition-groups/nutrition-group.service";
import {BehaviorSubject, Subject} from "rxjs";
import {MultiSelectComponent} from "../../../../components/multi-select/multi-select.component";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.css']
})
export class ParticipantsPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MultiSelectComponent) frmNutritionGroupChild!: MultiSelectComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    participants: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

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

  async trigFetchParticipants() {
    try {
      let data = await this.participantsService.fetchGetParticipants();
      data.forEach((o : any) => o["selected"] = false);
      this.publishParticipants(data);
    } catch (e) {
      this.publishParticipants([]);
    }
  }

  async trigFetchNutritionGroups() {
    try {
      this.frmNutritionGroupChild.fetchedData = await this.nutritionGroupService.fetchGetNutritionGroups();
    } catch (e) {
      this.frmNutritionGroupChild.fetchedData = [];
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

      this.frmNutritionGroupChild.response = resp.nutritionGroups;

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      data.nutritionGroups = this.frmNutritionGroupChild.localRight;
      data.nutritionGroups = data.nutritionGroups.map((o: any) => o.id);
      await this.participantsService.fetchCreateParticipant(data);
      window.location.reload();
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
  }

  async onDelete() {
    try {
      await this.participantsService.fetchDeleteParticipant(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
    this.frmNutritionGroupChild.hardReset();
  }

  async ngOnInit(): Promise<void> {
    await this.trigFetchParticipants();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.trigFetchNutritionGroups();
  }

  publishParticipants(o: Array<any>) {
    this.fetched.participants.data = o;
    this.fetched.participants.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.participants.display = this.fetched.participants.data.slice(e[0], e[1]);
  }

}
