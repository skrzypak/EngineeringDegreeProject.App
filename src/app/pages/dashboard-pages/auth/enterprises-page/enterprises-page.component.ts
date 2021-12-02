import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EnterprisesService} from "../../../../services/msv/auth-msv/enterprise/enterprises.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ModalState} from "../../../../enums/modal-state";

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

  constructor(private enterprisesService: EnterprisesService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.fetchEnterprises = await this.enterprisesService.fetchGet();
      this.fetchEnterprises.forEach(item => item["selected"] = false)
      this.fetchEnterprises.sort((a: any, b: any) => {
        return ('' + a.companyName).localeCompare(b.comapnyName);
      });

      try {
        let espId = this.enterprisesService.getActiveEnterpriseId();
        this.fetchEnterprises.find((o: any) => o.id == espId).selected = true;
      } catch (e) {
        console.log(e)
        this.showModal(ModalState.CREATE);
      }

    } catch (e) {
      this.fetchEnterprises = [];
      this.showModal(ModalState.CREATE);
    }
  }

  onSelectEnterprise(id: number) {
    try {
      let prevId = this.enterprisesService.getActiveEnterpriseId();
      this.enterprisesService.setupEnterpriseActive(id);
      this.fetchEnterprises.find((o: any) => o.id == prevId).selected = false;
      this.fetchEnterprises.find((o: any) => o.id == id).selected = true;
    } catch (e: any) {
      console.log(e)
    }
  }

  async onDeleteEnterprise(id: number) {
    try {
      await this.enterprisesService.fetchDelete(id);
      window.location.reload();
    } catch (e) {}
  }

  async onShowEnterprise(id: number) {
    try {
      let resp = await this.enterprisesService.fetchGetById(id);

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
    }
  }

  async onCreateEnterpriseSubmit() {
    try {
      let data = this.ngForm.value;
      delete data.id;
      await this.enterprisesService.fetchCreate(data);
      this.hideModal();
      window.location.reload();
    } catch (e) {}
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
    if (this.fetchEnterprises.length > 0) {
      this.ngForm.reset();
      (this.modalRef?.nativeElement).style.display = 'none';
    }
  }

}
