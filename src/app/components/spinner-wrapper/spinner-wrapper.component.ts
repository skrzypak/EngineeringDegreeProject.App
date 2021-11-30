import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LoaderService} from "../../services/common/loader/loader.service";

@Component({
  selector: 'app-spinner-wrapper',
  templateUrl: './spinner-wrapper.component.html',
  styleUrls: ['./spinner-wrapper.component.css']
})
export class SpinnerWrapperComponent implements OnInit {

  loading: boolean = false;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
  }

  public setState(state: boolean) {
    this.loading = state;
    this.loaderService.isLoading.next(state);
  }

}
