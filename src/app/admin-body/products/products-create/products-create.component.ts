import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit{
  image1Url: string = ""
  image2Url: string = ""
  image3Url: string = ""
  product: any
  notification = ""

  cateLst: any;
  categoriesID = 1;
  showSalePrice: boolean = false;

  selectedSizeS: string = ''
  selectedSizeM: string = ''
  selectedSizeL: string = ''
  stateSizeS: boolean = false;
  stateSizeM: boolean = false;
  stateSizeL: boolean = false;
  btnSizeS = 'S'
  btnSizeM = 'M'
  btnSizeL = 'L'
  countS: number = 0
  countM: number = 0
  countL: number = 0
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.productService.getCategoryListAPI().subscribe(cate => this.cateLst = cate)
  }
  onSizeSClick(selectedSize:string): void {
    if (this.countS % 2 == 0) {
      this.stateSizeS = true;
      this.selectedSizeS = this.btnSizeS
      console.log('selectedSizeS:',this.selectedSizeS)
      this.countS = this.countS + 1
    }else{
      this.stateSizeS = false;
      this.selectedSizeS = ''
      console.log(this.selectedSizeS)
      this.countS = this.countS + 1
    }
  }
  onSizeMClick(): void {
    if (this.countM % 2 == 0) {
      this.stateSizeM = true;
      this.selectedSizeM = this.btnSizeM
      console.log(this.selectedSizeM)
      this.countM = this.countM + 1
    }else{
      this.stateSizeM = false;
      this.selectedSizeM = ''
      console.log(this.selectedSizeS)
      this.countM = this.countM + 1
    }
  }
  onSizeLClick(): void {
    if (this.countL % 2 == 0) {
      this.stateSizeL = true;
      this.selectedSizeL = this.btnSizeL
      console.log(this.selectedSizeL)
      this.countL = this.countL + 1
    }else{
      this.stateSizeL = false;
      this.selectedSizeL = ''
      console.log(this.selectedSizeS)
      this.countL = this.countL + 1
    }
  }

  // onCheckboxChange() {
  //   this.isCheckboxChecked = !this.isCheckboxChecked;
  // }
  // onCountClick(){
  //   if()
  // }



  CreateProduct(f: NgForm) {
    
    if (f.value.ProductName != ''
      //  &&  f.value.price != '' && f.value.amount != '' && f.value.productIntroduction != '' 
    ) {

      const dataProd = {
        categoryId: Number(f.value.categoryId),
        productName: f.value.ProductName,
        createdDate: f.value.CreatedDate,
        officialPrice: Number(f.value.officialPrice),
        initialPrice: Number(f.value.initialPrice),
        size1: 'S',
        size2: 'M',
        size3: 'L',
        amount1: Number(f.value.Amount1),
        amount2: Number(f.value.Amount2),
        amount3: Number(f.value.Amount3),
        introduction: f.value.productIntroduction,
        imgPath1: this.image1Url,
        imgPath2: this.image2Url,
        imgPath3: this.image3Url
      }
      console.log(dataProd)

      this.productService.postProductAPI(dataProd).subscribe()
      alert('Thêm sản phẩm thành công')
      console.log('sau thêm', this.selectedSizeS)

      this.router.navigate(['/products']);
    }
    else {
      this.notification = "Vui lòng nhập đầy đủ thông tin"
    }
  }
}
