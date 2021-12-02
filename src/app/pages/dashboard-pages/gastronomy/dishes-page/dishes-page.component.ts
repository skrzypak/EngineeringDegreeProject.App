import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DishesService} from "../../../../services/msv/gastronomy-msv/dishes/dishes.service";
import {ProductsService} from "../../../../services/msv/gastronomy-msv/products/products.service";
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";
import {LoaderService} from "../../../../services/common/loader/loader.service";
import {SpinnerWrapperComponent} from "../../../../components/spinner-wrapper/spinner-wrapper.component";

@Component({
  selector: 'app-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.css']
})
export class DishesPageComponent implements OnInit {

  @ViewChild(MultiSelectSearchComponent) frmProductsChild!: MultiSelectSearchComponent;
  @ViewChild(SpinnerWrapperComponent) frmProductsChildSpinner!: SpinnerWrapperComponent;

  ngFrmCtrl: any = {
    currId: 0,
    frm: FormGroup,
  }

  fetched: any = {
    dishes: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    }
  }

  btnSetupKeys: any = {
    ingredients: "Ingredients",
    products: "Products",
  }

  searchable = {
    currentBtnKey: this.btnSetupKeys.products,
    btnSetup: new Map<any, any>([
      [this.btnSetupKeys.ingredients, {
        headers: new Map<any, any>([
          ["name", "Name"],
          ["code", "Code"],
          ["valueOfUse", "Value"],
          ["unit", "Unit"],
        ]),
        tmp: {
          add: new Array<any>(),
          remove: new Array<any>(),
        },
        color: "is-primary",
        display: Array<any>(),
        fetched: Array<any>(),
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.ingredients;
          this.publishSearchableLength(this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched.length);
        }
      }],
      [this.btnSetupKeys.products, {
        headers:  new Map<any, any>([
          ["name", "Name"],
          ["code", "Code"],
          ["description", "Description"],
          ["unit", "Unit"],
        ]),
        color: "is-warning",
        display: Array<any>(),
        fetched: Array<any>(),
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.products;
          this.publishSearchableLength(this.searchable.btnSetup.get(this.btnSetupKeys.products).fetched.length);
        }
      }],
    ]),
    rxjs: new BehaviorSubject<number>(0),
  }

  constructor(
    private dishesService: DishesService,
    private productsService: ProductsService,
    private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchMain();
    await this.fetchSearchable();
  }


  async fetchMain() {
    try {
      let data = await this.dishesService.fetchGetDishes();
      // data.forEach((o : any) => o["selected"] = false);
      this.fetched.dishes.data = data;
      this.publishMainLength(data.length);
    } catch (e) {
      this.publishMainLength(0);
    }
  }

  async fetchSearchable() {
    try {
      let data = await this.productsService.fetchGetProducts();
      // data.forEach((o : any) => o["selected"] = false);
      this.searchable.btnSetup.get(this.btnSetupKeys.products).fetched = data;
      this.publishSearchableLength(data.length);
    } catch (e) {
      this.publishSearchableLength(0);
    }
  }

  publishMainLength(o: number) {
    this.fetched.dishes.rxjs.next(o);
  }

  publishSearchableLength(o: number) {
    this.searchable.rxjs.next(o);
  }

  subscribeRenderer(e: any) {
    this.fetched.dishes.display = this.fetched.dishes.data.slice(e[0], e[1]);
  }

  subscribeRendererProductsPagination(e: Array<number>) {
    let item: any;
    const ingredients = this.btnSetupKeys.ingredients;
    const products = this.btnSetupKeys.products;

    switch (this.searchable.currentBtnKey) {
      case this.btnSetupKeys.ingredients:
        item = this.searchable.btnSetup.get(ingredients);
        let arr =  item.fetched.concat(item.tmp.add)
        this.searchable.btnSetup.get(ingredients).display = arr.slice(e[0], e[1]);
        break;
      default:
        item = this.searchable.btnSetup.get(products);
        this.searchable.btnSetup.get(products).display = item.fetched.slice(e[0], e[1]);
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

      this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched = resp.ingredients;
      this.searchable.currentBtnKey = this.btnSetupKeys.ingredients
      this.publishSearchableLength(resp.ingredients.length);
    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      this.frmProductsChildSpinner.setState(true);

      let ingredients = this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add.map((o: any) => {
        return (({ productId, valueOfUse }) => ({ productId, valueOfUse }))(o);
      })

      await this.dishesService.fetchCreateDish({
        "name": this.ngFrmCtrl.frm.value.name,
        "description": this.ngFrmCtrl.frm.value.description,
        "ingredients": ingredients
      });

      this.onReset();
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmProductsChildSpinner.setState(false);
    }
  }

  async onUpdate() {

  }

  async onDelete() {
    try {
      this.frmProductsChildSpinner.setState(true);
      await this.dishesService.fetchDeleteDish(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmProductsChildSpinner.setState(false);
    }
  }

  onReset() {
    this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).display = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.remove = [];
    this.searchable.currentBtnKey = this.btnSetupKeys.products;
    this.ngFrmCtrl.frm.reset();
  }

  showProducts() {
    this.frmProductsChild.show();
  }

  zero() {
    return 0
  }

  addIngredientView(e: any) {
    this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add.push(e);
  }

  removeIngredientView(e: any) {
    if(e.toString().includes("TMP_")) {
      this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add =
        this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add.filter((o: any) => {
          return o.id != e;
        });
    } else {
      this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched =
        this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched.filter((o: any) => {
          return o.id != e;
        });
      this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.remove.push(e)
    }

    let len = this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).fetched.length;
    len += this.searchable.btnSetup.get(this.btnSetupKeys.ingredients).tmp.add.length;
    this.publishSearchableLength(len);
  }

}
