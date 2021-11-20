import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "../../../../services/gastronomy-msv/participants/participants.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.css']
})
export class ParticipantsPageComponent implements OnInit {

  fetchParticipants: Array<any> = [];

  ngFormContainer: any = {
    ngForm: new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      description: new FormControl(),
      nutritionGroups: new FormControl([]),
    })
  }

  constructor(private participantsService: ParticipantsService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.fetchParticipants = await this.participantsService.fetchGetParticipants();
      this.fetchParticipants.forEach(item => item["selected"] = false);
    } catch (e) {
      console.log(e);
      this.fetchParticipants = [];
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
        nutritionGroups: resp.nutritionGroups,
      });

    } catch (e) {
      this.ngFormContainer.ngForm.reset();
      console.log(e);
    }
  }

  async onSave() {
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
  }
}
