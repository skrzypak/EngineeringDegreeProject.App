import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public async sendLogoutRequest() {
    try {
      await this.authService.logout();
    } catch (e) {
      console.log("Unable logout")
    }
  }
}
