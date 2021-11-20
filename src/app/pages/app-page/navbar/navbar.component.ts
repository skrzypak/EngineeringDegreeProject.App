import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth-msv/auth/auth.service";
import {EnterprisesService} from "../../../services/auth-msv/enterprise/enterprises.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  espActive : any = null;
  espItems : any = [];

  constructor(
    private authService : AuthService,
    private esp: EnterprisesService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.espItems = await this.esp.fetchGetEnterprises()
    } catch {
      this.espItems = [];
    }
    try {
      this.espActive = this.esp.getActiveEsp();
    } catch {
      this.espActive = null;
    }
  }

  public async sendLogoutRequest() {
    try {
      await this.authService.logout();
    } catch (e) {
      console.log("Unable logout")
    }
  }

  changeEnterprise(item: any) {
    this.esp.setActiveEsp(item);
    try {
      this.espActive = this.esp.getActiveEsp();
    } catch {
      this.espActive = null;
    }
  }
}
