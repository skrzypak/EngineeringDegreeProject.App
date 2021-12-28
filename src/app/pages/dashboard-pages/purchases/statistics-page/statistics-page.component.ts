import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PurchasesService} from "../../../../services/msv/purchases-msv/purchases.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitPackage} from "../../../../classes/unit-package";
import {SuppliersService} from "../../../../services/msv/purchases-msv/suppliers/suppliers.service";
import {DocumentsService} from "../../../../services/msv/purchases-msv/documents/documents.service";
import {ProductsService} from "../../../../services/msv/purchases-msv/products/products.service";
import {DocumentStatesPackage} from "../../../../classes/document-states-package";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  @ViewChild('searchBtn') searchBtn!: ElementRef;

  fetched: any = {
    msv: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
    suppliers: {
      data: Array<any>(),
    },
    documentTypes: {
      data: Array<any>(),
    },
    products: {
      data: Array<any>(),
    },
  }

  ngFrmCtrl: any = {
    frm: FormGroup,
    currentView: 0
  }

  documentStatesPackage: DocumentStatesPackage = new DocumentStatesPackage();
  unitPackage: UnitPackage = new UnitPackage();

  constructor(
    private msvService: PurchasesService,
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private documentsService: DocumentsService,
    private productsService: ProductsService
  ) {
    this.ngFrmCtrl.frm = this.fb.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      suppliersIds: new FormControl(null),
      documentTypesIds: new FormControl(null),
      documentStates: new FormControl(null),
      productsIds: new FormControl(null),
      viewMode: new FormControl(0, [
        Validators.required
      ]),
    });
  }


  async ngOnInit(): Promise<void> {
    await this.fetchSuppliers();
    await this.fetchProducts();
    await this.fetchDocumentTypes();

    if(this.ngFrmCtrl.frm.value.viewMode == 0) {
      await this.fetchProductsView();
    } else {
      await this.fetchSuppliersView();
    }
  }

  async fetchSuppliers() {
    try {
      this.fetched.suppliers.data = await this.suppliersService.fetchGet();
    } catch (e) {
      console.log(e)
    }
  }

  async fetchDocumentTypes() {
    try {
      this.fetched.documentTypes.data = await this.documentsService.fetchGetTypes();
    } catch (e) {
      console.log(e)
    }
  }

  async fetchProducts() {
    try {
      this.fetched.products.data = await this.productsService.fetchGet();
    } catch (e) {
      console.log(e)
    }
  }

  async fetchProductsView() {
    try {
      this.fetched.msv.data = await this.msvService.fetchGetProductsSummary(this.ngFrmCtrl.frm.value);
    } catch (e) {
      console.log(e)
    }
  }

  async fetchSuppliersView() {
    try {
      this.fetched.msv.data = await this.msvService.fetchGetSuppliersProductsSummary(this.ngFrmCtrl.frm.value);
    } catch (e) {
      console.log(e)
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  async search() {
    try {
      this.searchBtn.nativeElement.classList.add('is-loading')

      if(this.ngFrmCtrl.frm.value.viewMode == 0) {
        await this.fetchProductsView();
      } else {
        await this.fetchSuppliersView();
      }

      this.ngFrmCtrl.currentView = this.ngFrmCtrl.frm.value.viewMode;

    } catch (e) {
      console.log(e)
    } finally {
      this.searchBtn.nativeElement.classList.remove('is-loading')
    }
  }

  resetFromAttribute(atr: string) {
    switch (atr) {
      case 'suppliersIds':
        this.ngFrmCtrl.frm.patchValue({
          suppliersIds: null
        });
        break;
      case 'documentTypesIds':
        this.ngFrmCtrl.frm.patchValue({
          documentTypesIds: null
        });
        break;
      case 'documentStates':
        this.ngFrmCtrl.frm.patchValue({
          documentStates: null
        });
        break;
      case 'productsIds':
        this.ngFrmCtrl.frm.patchValue({
          productsIds: null
        });
        break;
    }
  }
}
