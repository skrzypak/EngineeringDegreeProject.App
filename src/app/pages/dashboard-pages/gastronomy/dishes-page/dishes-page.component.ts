import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DishesService} from "../../../../services/msv/gastronomy-msv/dishes/dishes.service";
import {ProductsService} from "../../../../services/msv/gastronomy-msv/products/products.service";
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";

@Component({
  selector: 'app-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.css']
})
export class DishesPageComponent implements OnInit {

  @ViewChild(MultiSelectSearchComponent) frmProductsChild!: MultiSelectSearchComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    dishes: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

  productsSearch = {
    currentBtnKey: "All",
    btnSetup: new Map<any, any>([
      ["List", {
        color: "is-primary",
        func: () => {
          this.productsSearch.currentBtnKey = "List";
          this.publishProducts(this.productsSearch.fetched.list.length);
        }
      }],
      ["All", {
        color: "is-warning",
        func: () => {
          this.productsSearch.currentBtnKey = "All";
          this.publishProducts(this.productsSearch.fetched.all.length);
        }
      }],
    ]),
    fetched: {
      headers: new Map<any, any>([
        ["id", false],
        ["code", "Code"],
        ["description", "Description"],
      ]),
      list: Array<any>(),
      all: Array<any>(),
      display: Array<any>(),
      rxjs: new BehaviorSubject<number>(0),
    }
  }

  constructor(private dishesService: DishesService, private productsService: ProductsService, private fb: FormBuilder) {
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
      this.fetched.dishes.data = data;
      this.publishDishes(data.length);
    } catch (e) {
      this.publishDishes(0);
    }
  }

  async trigFetchProducts() {
    try {
      let data = await this.productsService.fetchGetProducts();
      data.forEach((o : any) => o["selected"] = false);
      this.productsSearch.fetched.all = data;
      this.publishProducts(data.length);
    } catch (e) {
      this.publishProducts(0);
    }
  }

  publishDishes(o: number) {
    this.fetched.dishes.rxjs.next(o);
  }

  publishProducts(o: number) {
    this.productsSearch.fetched.rxjs.next(o);
  }

  async ngOnInit(): Promise<void> {
    await this.trigFetchDishes();
    await this.trigFetchProducts();
  }

  subscribeRenderer(e: any) {
    this.fetched.dishes.display = this.fetched.dishes.data.slice(e[0], e[1]);
  }

  subscribeRendererProductsPagination(e: Array<number>) {
    switch (this.productsSearch.currentBtnKey) {
      case "List":
        this.productsSearch.fetched.display = this.productsSearch.fetched.list.slice(e[0], e[1]);
        break;
      default:
        this.productsSearch.fetched.display = this.productsSearch.fetched.all.slice(e[0], e[1]);
    }
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

  showProducts() {
    this.frmProductsChild.show();
  }

  zero() {
    return 0
  }

}
