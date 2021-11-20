import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth-msv/auth/auth.service";
import {EnterprisesService} from "../../../services/auth-msv/enterprise/enterprises.service";
import {EspService} from "../../../services/common/local-storage/esp.service";

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
      this.espActive = this.espService.getActiveEsp();
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
}
