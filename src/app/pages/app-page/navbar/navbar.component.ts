import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/msv/auth-msv/auth.service";
import {EnterprisesService} from "../../../services/msv/auth-msv/enterprise/enterprises.service";
import {EspService} from "../../../services/common/local-managments/esp.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  espActive : any = null;

  constructor(
    private authService : AuthService,
    private espService: EspService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.espActive = this.espService.getEsp();
    } catch {
      this.espActive = null;
    }
  }

  public async sendLogoutRequest() {
    try {
      await this.authService.fetchLogout();
    } catch (e) {
      console.log("Unable logout")
    }
  }
}
