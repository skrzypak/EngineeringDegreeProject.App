import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantsService} from "../../../../services/msv/gastronomy-msv/participants/participants.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NutritionGroupService} from "../../../../services/msv/gastronomy-msv/nutrition-groups/nutrition-group.service";
import {Subject} from "rxjs";
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
      rxjs: new Subject<any>()
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

  async triggerFetchParticipants() {
    try {
      let data = await this.participantsService.fetchGetParticipants();
      data.forEach((o : any) => o["selected"] = false);
      this.rxjsNextParticipants(data);
    } catch (e) {
      this.rxjsNextParticipants([]);
    }
  }

  async triggerFetchNutritionGroups() {
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
      this.ngFrmCtrl.frm.reset();
      console.log(e);
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
      console.log(e);
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
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
    this.frmNutritionGroupChild.hardReset();
  }

  async ngOnInit(): Promise<void> {
    await this.triggerFetchParticipants();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.triggerFetchNutritionGroups();
  }

  rxjsNextParticipants(o: any) {
    this.fetched.participants.rxjs.next(o);
  }

  receiveRenderer(e: any) {
    this.fetched.participants.display = e;
  }

}
