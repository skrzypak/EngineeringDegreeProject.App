import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {ProductsService} from "../../../../services/msv/inventory-msv/products/products.service";
import {MultiSelectComponent} from "../../../../components/multi-select/multi-select.component";
import {AllergensService} from "../../../../services/msv/inventory-msv/allergens/allergens.service";
import {CategoriesService} from "../../../../services/msv/inventory-msv/categories/categories.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  @ViewChild(MultiSelectComponent) frmAllergensChild!: MultiSelectComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    products: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
    categories: {
      data: Array<any>()
    }
  }

  constructor(
    private productsService: ProductsService,
    private allergensService: AllergensService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      code: new FormControl('',[
        Validators.maxLength(6),
      ]),
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
      ]),
      description: new FormControl('',[
        Validators.maxLength(3000),
      ]),
      category: new FormControl('',[
        Validators.required,
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
    await this.fetchCategories();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.fetchAllergens();
  }

  async fetch() {
    try {
      let data = await this.productsService.fetchGet();
      //data.forEach((o : any) => o["selected"] = false);
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async fetchAllergens() {
    try {
      this.frmAllergensChild.fetchedData = await this.allergensService.fetchGet();
    } catch (e) {
      this.frmAllergensChild.fetchedData = [];
    } finally {
      this.onReset();
    }
  }

  async fetchCategories() {
    try {
      this.fetched.categories.data = await this.categoriesService.fetchGet();
    } catch (e) {
      this.fetched.categories.data = [];
    } finally {
      this.onReset();
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.productsService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        code: resp.code,
        name: resp.name,
        description: resp.description,
        category: resp.category.id
      });

      this.frmAllergensChild.response = resp.allergens;

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;
      data.allergens = this.frmAllergensChild.localRight;
      data.allergens = data.allergens.map((o: any) => o.id);
      await this.productsService.fetchCreate(data);
      window.location.reload();
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onUpdate() {
  }

  async onDelete() {
    try {
      await this.productsService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
      this.onReset();
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
    this.frmAllergensChild.hardReset();
  }

  publish(o: Array<any>) {
    this.fetched.products.data = o;
    this.fetched.products.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.products.display = this.fetched.products.data.slice(e[0], e[1]);
  }

}
