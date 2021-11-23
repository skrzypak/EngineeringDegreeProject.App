import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {DishesService} from "../../../../services/msv/gastronomy-msv/dishes/dishes.service";

@Component({
  selector: 'app-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.css']
})
export class DishesPageComponent implements OnInit {

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    dishes: {
      display: Array<any>(),
      rxjs: new Subject<any>()
    }
  }

  constructor(private dishesService: DishesService, private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
    });
  }

  async trigFetchDishes() {
    try {
      let data = await this.dishesService.fetchGetDishes();
      data.forEach((o : any) => o["selected"] = false);
      this.publishDishes(data);
    } catch (e) {
      this.publishDishes([]);
    }
  }

  publishDishes(o: any) {
    this.fetched.dishes.rxjs.next(o);
  }

  async ngOnInit(): Promise<void> {
    await this.trigFetchDishes();
  }

  subscribeRenderer(e: any) {
    this.fetched.dishes.display = e;
  }

  async onSelectDish(id: number) {
    try {
      let resp = await this.dishesService.fetchGetDishById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        name: resp.name,
        description: resp.description
      });

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {

  }

  async onUpdate() {

  }

  async onDelete() {
    try {
      await this.dishesService.fetchDeleteDish(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }
}
