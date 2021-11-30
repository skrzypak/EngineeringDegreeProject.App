import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "../../services/common/loader/loader.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() message = '';

  subscription!: Subscription;
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {

    this.subscription = this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
