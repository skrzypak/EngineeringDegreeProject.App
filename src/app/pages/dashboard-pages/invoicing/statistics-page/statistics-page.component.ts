import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InvoicingService} from "../../../../services/msv/invoicing-msv/invoicing.service";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  fetched: any = {
    msv: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
  }

  constructor(private msvService: InvoicingService) { }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }


  async fetch() {
    try {
      this.fetched.msv.data = await this.msvService.fetchGetSummary();
    } catch (e) {
      console.log(e)
    }
  }

}
