import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InventoryService} from "../../../../services/msv/inventory-msv/inventory.service";
import {UnitPackage} from "../../../../classes/unit-package";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inventory-statistic-page',
  templateUrl: './inventory-statistic-page.component.html',
  styleUrls: ['./inventory-statistic-page.component.css']
})
export class InventoryStatisticPageComponent implements OnInit {

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

  constructor(private msvService: InventoryService, private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  async fetch() {
    try {
      const {startDate, endDate} = this.ngFrmCtrl.frm.value;
      this.fetched.msv.data = await this.msvService.fetchGetSummary(startDate, endDate);
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
      await this.fetch();
    } catch (e) {
      console.log(e)
    } finally {
      this.searchBtn.nativeElement.classList.remove('is-loading')
    }
  }
}
