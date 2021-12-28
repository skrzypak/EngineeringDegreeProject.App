import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../../../services/msv/purchases-msv/products/products.service";
import {DocumentsService} from "../../../../../services/msv/purchases-msv/documents/documents.service";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitPackage} from "../../../../../classes/unit-package";

@Component({
  selector: 'app-document-products',
  templateUrl: './document-products.component.html',
  styleUrls: ['./document-products.component.css']
})
export class DocumentProductsComponent implements OnInit {

  documentId: number = 0;

  fetched: any = {
    documentProducts: {
      display: Array<any>(),
      data: Array<any>(),
      rxjs: new BehaviorSubject<number>(0)
    },
    products: {
      data: Array<any>(),
      selectedProduct: null
    },
  }

  ngFrmCtrl: any = {
    frm: FormGroup,
  }

  unitPackage: UnitPackage = new UnitPackage();

  constructor( private location: Location,
               private route: ActivatedRoute,
               private productsService: ProductsService,
               private documentsService: DocumentsService,
               private fb: FormBuilder,
               ) {
    this.ngFrmCtrl.frm = this.fb.group({
      id: new FormControl(),
      product: new FormControl(0, [
        Validators.required,
      ]),
      quantity: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(4294967296),
      ]),
      unitMeasureValue: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(4294967296),
      ]),
      unitNetPrice: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999),
      ]),
      percentageVat: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      netValue: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999),
      ]),
      vatValue: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999),
      ]),
      grossValue: new FormControl(0,[
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999),
      ]),
      expirationDate: new FormControl(null),
      transfered: new FormControl(false),
    });
  }

  async ngOnInit(): Promise<void> {
    let paramId = this.route.snapshot.paramMap.get('documentId')

    try {
      this.documentId = Number(paramId);
    } catch (e) {
      this.location.back()
    } finally {
      if(this.documentId <= 0) {
        this.location.back()
      }
    }

    this.onChanges();

    await this.fetchProducts();
    await this.fetchMain();

  }

  onChanges(): void {
    this.ngFrmCtrl.frm.get('quantity').valueChanges.subscribe((val: number) => {
      const {unitNetPrice, percentageVat} = this.ngFrmCtrl.frm.value;
      let netValue = Number((val * unitNetPrice).toFixed(2));
      let vatValue = Number((netValue * (percentageVat / 100)).toFixed(2));
      let grossValue = Number((netValue + vatValue).toFixed(2));
      this.ngFrmCtrl.frm.controls['netValue'].setValue(netValue);
      this.ngFrmCtrl.frm.controls['vatValue'].setValue(vatValue);
      this.ngFrmCtrl.frm.controls['grossValue'].setValue(grossValue);
    });
    this.ngFrmCtrl.frm.get('unitNetPrice').valueChanges.subscribe((val: number) => {
      const {quantity, percentageVat} = this.ngFrmCtrl.frm.value
      let netValue = Number((quantity * val).toFixed(2));
      let vatValue = Number((netValue * (percentageVat / 100)).toFixed(2));
      let grossValue = Number((netValue + vatValue).toFixed(2));
      this.ngFrmCtrl.frm.controls['netValue'].setValue(netValue);
      this.ngFrmCtrl.frm.controls['vatValue'].setValue(vatValue);
      this.ngFrmCtrl.frm.controls['grossValue'].setValue(grossValue);
    });
    this.ngFrmCtrl.frm.get('percentageVat').valueChanges.subscribe((val: number) => {
      const {netValue} = this.ngFrmCtrl.frm.value;
      let vatValue = Number((netValue * (val / 100)).toFixed(2));
      let grossValue = Number((netValue + vatValue).toFixed(2));
      this.ngFrmCtrl.frm.controls['vatValue'].setValue(vatValue);
      this.ngFrmCtrl.frm.controls['grossValue'].setValue(grossValue);
    });
  }

  async fetchMain() {
    try {
      let data = await this.documentsService.fetchGetDocumentProducts(this.documentId);
      // data.forEach((o : any) => o["selected"] = false);
      this.fetched.documentProducts.data = data;
      this.publish(data);
    } catch (e) {
      this.publish([]);
    }
  }

  async fetchProducts() {
    try {
      this.fetched.products.data = await this.productsService.fetchGet();
      // data.forEach((o : any) => o["selected"] = false);
    } catch (e) {
      console.log(e);
    }
  }

  async onSelect(id: number) {
    try {
      let resp = await this.documentsService.fetchGetDocumentProductsById(this.documentId, id);

      this.ngFrmCtrl.frm.setValue({
        id: resp.id,
        product: resp.productId,
        quantity: resp.quantity,
        unitMeasureValue: resp.unitMeasureValue,
        unitNetPrice: resp.unitNetPrice,
        percentageVat: resp.percentageVat,
        netValue: resp.netValue,
        vatValue: resp.vatValue,
        grossValue: resp.grossValue,
        expirationDate:  resp.expirationDate == null ? null : new Date(resp.expirationDate).toISOString().split('T')[0],
        transfered: resp.transfered
      });

      this.fetched.products.selectedProduct = this.fetched.products.data.find((o: any) =>
        o.id == resp.productId);

    } catch (e) {
      console.log(e)
      this.ngFrmCtrl.frm.reset();
    }
  }

  async onCreate() {
    try {
      let data = this.ngFrmCtrl.frm.value
      delete data.id;

      if(data.expirationDate == "") {
        data.expirationDate = null;
      }

      data.transfered = false;
      data.id = await this.documentsService.fetchCreateDocumentProduct(this.documentId, data);
      data.product = this.fetched.products.selectedProduct;
      this.fetched.documentProducts.data.push(data)
      this.publish(this.fetched.documentProducts.data);
      this.onReset()
    } catch (e) {
      console.log(e)
    }
  }

  async onDelete() {
    try {
      let id = this.ngFrmCtrl.frm.value.id;
      await this.documentsService.fetchDeleteDocumentProduct(this.documentId, id);
      this.fetched.documentProducts.data = this.fetched.documentProducts.data.filter((o: any) => o.id != id);
      this.publish(this.fetched.documentProducts.data);
      this.onReset();
    } catch (e) {
      console.log(e)
    }
  }

  onReset() {
    this.ngFrmCtrl.frm.reset();
  }

  publish(o: Array<any>) {
    this.fetched.documentProducts.data = o;
    this.fetched.documentProducts.rxjs.next(o.length);
  }

  subscribeRenderer(e: any) {
    this.fetched.documentProducts.display = this.fetched.documentProducts.data.slice(e[0], e[1]);
  }

  navigateBackPage() {
    this.location.back()
  }

  onProductChanged() {
    this.fetched.products.selectedProduct = this.fetched.products.data.find((o: any) =>
      o.id == this.ngFrmCtrl.frm.value.product);
  }
}
