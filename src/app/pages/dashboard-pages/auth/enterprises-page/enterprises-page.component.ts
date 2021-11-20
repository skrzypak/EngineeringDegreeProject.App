import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EnterprisesService} from "../../../../services/auth-msv/enterprise/enterprises.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalState} from "../../../../enums/modal-state";
import {EspService} from "../../../../services/common/local-storage/esp.service";

@Component({
  selector: 'app-enterprises-page',
  templateUrl: './enterprises-page.component.html',
  styleUrls: ['./enterprises-page.component.css']
})
export class EnterprisesPageComponent implements OnInit {

  modalState = ModalState.READ;
  @ViewChild("modal", {read: ElementRef, static: true}) modalRef: ElementRef | undefined;

  fetchEnterprises: Array<any> = [];

  ngForm = new FormGroup({
    id: new FormControl(),
    nip: new FormControl(),
    companyName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    streetAddress: new FormControl(),
    postalCode: new FormControl(),
    city: new FormControl(),
    state: new FormControl()
  });

  constructor(private enterprisesService: EnterprisesService, private espService: EspService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.fetchEnterprises = await this.enterprisesService.fetchGetEnterprises();
      this.fetchEnterprises.forEach(item => item["selected"] = false)

      this.fetchEnterprises.sort((a: any, b: any) => {
        return ('' + a.companyName).localeCompare(b.comapnyName);
      });

      try {
        let currSelectedId = this.espService.getActiveEspId();
        if(currSelectedId != null) {
          let currSelectedItem = this.fetchEnterprises.find((o:any) => o.id == currSelectedId);
          if(currSelectedItem != null) {
            // Set active esp form local storage
            currSelectedItem.selected = true;
            return;
          }
        }
      } catch (e) {}

      // Set first esp as active. Save to local storage
      this.espService.setActiveEsp(this.fetchEnterprises[0]);
      this.fetchEnterprises[0].selected = true;
      return;

    } catch (e) {
      console.log(e);
      this.fetchEnterprises = [];
    }
  }

  onSelectEnterprise(item: any) {
    let selectedItem: any = this.fetchEnterprises.find((o:any) => o.id == item.id);
    if(selectedItem != null){
      let currSelectedId = this.espService.getActiveEspId();
      if(currSelectedId != null){
        let currSelectedItem = this.fetchEnterprises.find((o:any) => o.id == currSelectedId);
        if(currSelectedItem != null) {
          currSelectedItem.selected = false
        }
      }
      this.espService.setActiveEsp(item);
      selectedItem.selected = true;
    } else {
      console.log("TODO://ERROR")
    }
  }

  async onDeleteEnterprise(id: number) {
    try {
      await this.enterprisesService.fetchDeleteEnterprise(id);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async onShowEnterprise(id: number) {
    try {
      let resp = await this.enterprisesService.fetchGetEnterpriseById(id);

      this.ngForm.setValue({
        id: resp.id,
        nip: resp.nip,
        companyName: resp.companyName,
        email: resp.email,
        phoneNumber: resp.phoneNumber,
        streetAddress: resp.streetAddress,
        postalCode: resp.postalCode,
        city: resp.city,
        state: resp.state
      });

      this.showModal(ModalState.READ);
    } catch (e) {
      this.ngForm.reset();
      console.log(e);
    }
  }

  async onCreateEnterpriseSubmit() {
    try {
      let data = this.ngForm.value;
      delete data.id;
      await this.enterprisesService.fetchCreateEnterprise(data);
      this.hideModal();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  onUpdateEnterpriseSubmit() {
    this.hideModal();
    throw new Error(`TODO://${this.ngForm.value.id}`);
  }

  public showModal(state : ModalState) {
    this.modalState = state;
    (this.modalRef?.nativeElement).style.display = 'flex';
  }

  public hideModal() {
    this.ngForm.reset();
    (this.modalRef?.nativeElement).style.display = 'none';
  }

}
