import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DocumentsService} from "../../../../../services/msv/purchases-msv/documents/documents.service";
import {SuppliersService} from "../../../../../services/msv/purchases-msv/suppliers/suppliers.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {DocumentStatesPackage} from "../../../../../classes/document-states-package";

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.css']
})
export class DocumentsPageComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    documents: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
    documentsTypes: {
      data: Array<any>()
    },
    suppliers: {
      data: Array<any>()
    }
  }

  documentStatesPackage: DocumentStatesPackage = new DocumentStatesPackage();

  constructor(
    private documentsService: DocumentsService,
    private suppliersService: SuppliersService,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      signature: new FormControl('',[
        Validators.required,
        Validators.maxLength(300),
      ]),
      number: new FormControl('',[
        Validators.required,
      ]),
      type: new FormControl(null,[
        Validators.required,
      ]),
      date: new FormControl(null,[
        Validators.required,
      ]),
      supplier: new FormControl(null,[
        Validators.required,
      ]),
      state: new FormControl(null,[
        Validators.required,
      ]),
      description: new FormControl(null,[
        Validators.maxLength(3000),
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchDocumentsTypes();
    await this.fetchSuppliers();
    await this.fetch();
  }

  async fetch() {
    try {
      let data = await this.documentsService.fetchGet();
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async fetchDocumentsTypes() {
    try {
      this.fetched.documentsTypes.data = await this.documentsService.fetchGetTypes();
    } catch (e) {
      this.fetched.documentsTypes.data = [];
    }
  }

  async fetchSuppliers() {
    try {
      this.fetched.suppliers.data = await this.suppliersService.fetchGet();
    } catch (e) {
      this.fetched.suppliers.data = []
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.documentsService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        supplier: resp.supplierId,
        signature: resp.signature,
        number: resp.number,
        type: resp.documentTypeId,
        date: new Date(resp.date).toISOString().split('T')[0],
        state: resp.state,
        description: resp.description,
      });

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      data.products = [];
      data.id = await this.documentsService.fetchCreate(data);
      this.onReset()
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      await this.documentsService.fetchUpdate({
        id: data.id,
        signature: data.signature,
        number: data.number,
        type : data.type,
        date: data.date,
        state: data.state,
        description: data.description,
      });
      this.onReset()
      setTimeout( function () {window.location.reload()}, 1500)
    } catch (e) {
      console.log(e)
    }
  }

  async onDelete() {
    try {
      let id = this.ngFrmCtrl.frm.value.id;
      await this.documentsService.fetchDelete(id);
      this.fetched.documents.data = this.fetched.documents.data.filter((o: any) => o.id != id);
      this.publish(this.fetched.documents.data);
      this.onReset();
    } catch (e) {
      console.log(e)
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.documents.data = o;
    this.fetched.documents.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.documents.display = this.fetched.documents.data.slice(e[0], e[1]);
  }

}
