import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InvoicingService} from "../../../../services/msv/invoicing-msv/invoicing.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UnitPackage} from "../../../../classes/unit-package";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  @ViewChild('searchBtn') searchBtn!: ElementRef;

  fetched: any = {
    msv: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
  }

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  unitPackage: UnitPackage = new UnitPackage();

  constructor(private msvService: InvoicingService, private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      suppliersIds: new FormControl([]),
      documentTypesIds: new FormControl([]),
      documentStates: new FormControl([]),
      productsIds: new FormControl([]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchProductsView();
    //await this.fetchSuppliersView();
  }

  async fetchProductsView() {
    try {
      let query = this.ngFrmCtrl.frm.value;
      delete query.suppliersIds
      this.fetched.msv.data = await this.msvService.fetchGetProductsSummary(query);
    } catch (e) {
      console.log(e)
    }
  }

  async fetchSuppliersView() {
    try {
      this.fetched.msv.data = await this.msvService.fetchGetSuppliersProductsSummary(this.ngFrmCtrl.frm.value);
    } catch (e) {
      console.log(e)
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  async search() {
    try {
      this.searchBtn.nativeElement.classList.add('is-loading')
      const {suppliersIds} =  this.ngFrmCtrl.frm.suppliersIds;

      if(suppliersIds == null || suppliersIds.length == 0) {
        await this.fetchProductsView();
      } else {
        await this.fetchSuppliersView();
      }

    } catch (e) {
      console.log(e)
    } finally {
      this.searchBtn.nativeElement.classList.remove('is-loading')
    }
  }

}
