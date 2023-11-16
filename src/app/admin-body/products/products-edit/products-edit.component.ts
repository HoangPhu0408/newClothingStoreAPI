import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/model/category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  product: any;

  image1Url: string = "";
  image2Url: string = "";
  image3Url: string = "";
  currentDate: any;
  cateProd: any;
  // categorySelected :string;
  cateLst: Categories[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.route.params.subscribe(() => {
      var productID = Number(this.route.snapshot.paramMap.get('id'));
      // alert(productID)
      this.productService.getProductIdAPI(productID).subscribe((prod: any) => {
        {
          this.product = prod;

          this.image1Url = this.product.imgPath1
          this.image2Url = this.product.imgPath2
          this.image3Url = this.product.imgPath3
        }
      });
      // alert(this.product)

      this.productService.getCategoryListAPI().subscribe(lstCate => this.cateLst = lstCate);

      // var cateID = this.product.categoryId;
      this.productService.getCategoryIdAPI(3).subscribe((cate: any) => {
        this.cateProd = cate;
        console.log(cate)
      }
      );

      console.log(this.product)
    });

  }



  EditProd() {
    const editedProduct = {

      categoryId: Number(this.product.categoryId),
      productName: this.product.productName.toString(),
      createdDate: this.product.createdDate.toString(),
      initialPrice: Number(this.product.initialPrice),
      officialPrice: Number(this.product.officialPrice),
      size1: 'S',
      size2: 'M',
      size3: 'L',
      amount1: Number(this.product.amount1),
      amount2: Number(this.product.amount2),
      amount3: Number(this.product.amount3),
      introduction: this.product.introduction.toString(),
      imgPath1: this.product.imgPath1,
      imgPath2: this.product.imgPath2,
      imgPath3: this.product.imgPath3
    }
    console.log(editedProduct)

    this.productService.putProductAPI(Number(this.product.productId), editedProduct).subscribe();
    alert('Lưu chỉnh sửa thành công');
    this.router.navigate(['products'])
  }
}
