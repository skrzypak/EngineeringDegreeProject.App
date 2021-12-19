import {Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import {DashboardService} from "../../../../services/msv/gastronomy-msv/dashboard.service";

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  fetched: any = {
    msv: {
      data: Array<any>(),
    },
  }

  d = new Date()
  now: string = this.d.getFullYear()+'-'+(this.d.getMonth()+1)+'-'+this.d.getDate();

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchGet();
  }


  async fetchGet() {
    try {
      this.fetched.msv.data = await this.dashboardService.fetchGetGroupPlansMenus(this.now);
    } catch (e) {
      this.fetched.msv.data = []
    }
  }

  async participantsListToPdf() {
    const doc = new jsPDF('l', 'pt', 'a4')
    autoTable(doc, {
      html: '#participantsList',
      styles: {
        font: 'Roboto',
        fontStyle: 'normal',
      }
    })
    doc.save(`participants-${this.now}.pdf`)
  }
}
