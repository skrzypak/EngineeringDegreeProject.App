import {Component, OnInit, ViewChild} from '@angular/core';
import {MenusService} from "../../../../services/msv/gastronomy-msv/menus/menus.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, retry} from "rxjs";
import {DishesService} from "../../../../services/msv/gastronomy-msv/dishes/dishes.service";
import {MultiSelectSearchComponent} from "../../../../components/multi-select-search/multi-select-search.component";
import {MealType} from "../../../../enums/meal-type";
import {SpinnerWrapperComponent} from "../../../../components/spinner-wrapper/spinner-wrapper.component";
import {UnitPackage} from "../../../../classes/unit-package";

@Component({
  selector: 'app-menus-pages',
  templateUrl: './menus-pages.component.html',
  styleUrls: ['./menus-pages.component.css']
})
export class MenusPagesComponent implements OnInit {

  @ViewChild(MultiSelectSearchComponent) frmMealsChild!: MultiSelectSearchComponent;
  @ViewChild(SpinnerWrapperComponent) frmMenuChildSpinner!: SpinnerWrapperComponent;

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  fetched: any = {
    menus: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
    menuInfo: {
      allergens: Array<any>(),
      ingredients: Array<any>(),
    }
  }

  btnSetupKeys: any = {
    dishes: "Dishes",
    meals: "Meals",
  }

  searchable = {
    currentBtnKey: this.btnSetupKeys.dishes,
    btnSetup: new Map<any, any>([
      [this.btnSetupKeys.dishes, {
        headers: new Map<any, any>([
          ["name", "Name"],
          ["description", "Description"],
        ]),
        color: "is-primary",
        display: Array<any>(),
        fetched: Array<any>(),
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.dishes;
          this.publishSearchableLength(this.searchable.btnSetup.get(this.btnSetupKeys.dishes).fetched.length);
        }
      }],
      [this.btnSetupKeys.meals, {
        headers:  new Map<any, any>([
          ["name", "Name"],
          ["description", "Description"],
        ]),
        color: "is-warning",
        tmp: {
          add: new Array<any>(),
          remove: new Array<any>(),
        },
        display: Array<any>(),
        fetched: Array<any>(),
        currMeal: MealType.Breakfast,
        func: () => {
          this.searchable.currentBtnKey = this.btnSetupKeys.meals;
          this.changeMealView(MealType.Breakfast);
        }
      }],
    ]),
    rxjs: new BehaviorSubject<number>(0),
  }

  unitPackage: UnitPackage = new UnitPackage();

  constructor(private menusService: MenusService, private dishesService: DishesService, private fb: FormBuilder) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      code: new FormControl(),
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
      let data = await this.menusService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      this.fetched.menus.data = data;
      this.publishMainLength(data.length);
    } catch (e) {
      this.publishMainLength(0);
    }
  }

  async fetchSearchable() {
    try {
      let data = await this.dishesService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
      this.searchable.btnSetup.get(this.btnSetupKeys.dishes).fetched = data;
      this.publishSearchableLength(data.length);
    } catch (e) {
      this.publishSearchableLength(0);
    }
  }

  publishMainLength(o: number) {
    this.fetched.menus.rxjs.next(o);
  }

  publishSearchableLength(o: number) {
    this.searchable.rxjs.next(o);
  }

  subscribeRenderer(e: any) {
    this.fetched.menus.display = this.fetched.menus.data.slice(e[0], e[1]);
  }

  subscribeRendererDishesPagination(e: Array<number>) {
    let item: any;
    const dishes = this.btnSetupKeys.dishes;
    const meals = this.btnSetupKeys.meals;

    switch (this.searchable.currentBtnKey) {
      case this.btnSetupKeys.meals:
        let arr = this.getCurrentMealDishes();
        this.searchable.btnSetup.get(meals).display = arr.slice(e[0], e[1]);
        break;
      default:
        item = this.searchable.btnSetup.get(dishes);
        this.searchable.btnSetup.get(dishes).display = item.fetched.slice(e[0], e[1]);
    }
  }

  async onSelectMenu(id: number) {
    try {
      let resp = await this.menusService.fetchGetById(id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.key.menuId,
        code: resp.key.code,
        name: resp.key.name,
        description: resp.key.description
      });

      this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched = resp.meals;

      this.searchable.currentBtnKey = this.btnSetupKeys.meals;

      this.fetched.menuInfo.allergens = resp.allergens;
      this.fetched.menuInfo.ingredients = resp.ingredients;

      this.changeMealView(this.searchable.btnSetup.get(this.btnSetupKeys.meals).currMeal);
    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      this.frmMenuChildSpinner.setState(true);

      let dishes = this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add.map((o: any) => {
        return {
          "dish": o.value.dishId,
          "mealType": parseInt(o.meal)
        }
      })

      await this.menusService.fetchCreate({
        "name": this.ngFrmCtrl.frm.value.name,
        "code": this.ngFrmCtrl.frm.value.code,
        "description": this.ngFrmCtrl.frm.value.description,
        "dishes": dishes
      });

      this.onReset();
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmMenuChildSpinner.setState(false);
    }
  }

  async onUpdate() {
    try {
      this.frmMenuChildSpinner.setState(true);

      let fetched = this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched.map((o: any) => {
        return o.dishes.map((o1: any) => {
          return {
            "dish": o1.dishId,
            "mealType": parseInt(o.key.meal)
          }
        });
      })

      if(fetched.length > 0) {
        fetched = [].concat.apply([], fetched);
      }

      let remove = this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.remove;

      let dishes = fetched.filter((o: any) => {
        return !remove.includes(o);
      });

      let add = this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add.map((o: any) => {
        return {
          "dish": o.value.dishId,
          "mealType": parseInt(o.meal)
        }
      })

      dishes = dishes.concat(add);

      await this.menusService.fetchUpdate(this.ngFrmCtrl.frm.value.id, {
        "name": this.ngFrmCtrl.frm.value.name,
        "code": this.ngFrmCtrl.frm.value.code,
        "description": this.ngFrmCtrl.frm.value.description,
        "dishes": dishes
      });

      this.onReset();
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
      this.frmMenuChildSpinner.setState(false);
    }
  }

  async onDelete() {
    try {
      await this.menusService.fetchDelete(this.ngFrmCtrl.frm.value.id);
      window.location.reload();
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  onReset() {
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).display = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add = [];
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.remove = [];
    this.searchable.currentBtnKey = this.btnSetupKeys.available;
    this.fetched.menuInfo.allergens = [];
    this.fetched.menuInfo.ingredients =[];
    this.ngFrmCtrl.frm.reset();
  }

  showDishes() {
    this.frmMealsChild.show();
  }

  zero() {
    return 0
  }

  changeMealView(e: MealType) {
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).currMeal = e;
    let arr = this.getCurrentMealDishes();
    this.publishSearchableLength(arr.length);
  }

  getCurrentMealDishes(): Array<any> {
    let item = this.searchable.btnSetup.get(this.btnSetupKeys.meals);

    let mealFetchedDishes = this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched.find((o: any) => o.key.meal == item.currMeal);
    mealFetchedDishes  = mealFetchedDishes != null ? mealFetchedDishes.dishes : [];

    let mealAddedDishes = item.tmp.add.filter((o: any) => o.meal == item.currMeal);

    if(mealAddedDishes != null) {
      mealAddedDishes = mealAddedDishes.map((o: any) => {
        return o.value;
      })
    } else {
      mealAddedDishes =  [];
    }

    return mealFetchedDishes.concat(mealAddedDishes);
  }

  addDishToMeal(e: any) {
    this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add.push(e);
  }

  removeDishFromMeal(e: any) {

    let currMealKey = this.searchable.btnSetup.get(this.btnSetupKeys.meals).currMeal;

    if(e.toString().includes("TMP_")) {
      this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add =
        this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.add.filter((o: any) => {
          return o.value.menuDishId != e;
        });
    } else {
      let fetched = this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched;

      for(let x = 0; x < fetched.length; x++) {
        if(fetched[x].key.meal === currMealKey) {
          fetched[x].dishes = fetched[x].dishes.filter((itm: any) => itm.menuDishId != e);
          break;
        }
      }

      this.searchable.btnSetup.get(this.btnSetupKeys.meals).fetched = fetched;
      this.searchable.btnSetup.get(this.btnSetupKeys.meals).tmp.remove.push({
        "dish": e,
        "mealType": parseInt(currMealKey)
      })

    }

    this.changeMealView(currMealKey);
  }

}
