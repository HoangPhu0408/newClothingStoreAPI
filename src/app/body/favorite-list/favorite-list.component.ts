import { Component, OnInit } from '@angular/core';
import { FavoriteProductService } from 'src/app/services/favoriteproduct.service';
import { FavoriteProduct } from 'src/app/model/favorite-product';
import { Customer } from 'src/app/model/customer.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  userId: any;
  prod: any;
  prodImage: any;
  idprod: any;
  favoriteList: any;
  productDetails: any[] = [];

  constructor(
    private favoriteService: FavoriteProductService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUser();
    this.favoriteService.getFavoritesByUserId(this.userId).subscribe((list) => {
      this.favoriteList = list.reverse();
      this.loadProductDetails();
      this.deleteFavoriteProduct(this.favoriteList.favoriteId);
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.idprod = Number(this.route.snapshot.paramMap.get('id'));
    //   this.prod = this.productService.getProductIdAPI(this.idprod).subscribe((data: any) => {
    //     this.prodImage = data.imgPath1;
    //   })
    //   this.productService.getProductIdAPI(this.idprod).subscribe((prod: number) => {
    //     this.prod = prod;
    //   })
    // })
  }

  loadProductDetails() {
    for (const favorite of this.favoriteList) {
      this.productService
        .getProductIdAPI(favorite.productId)
        .subscribe((product: any) => {
          this.productDetails.push(product);
        });
    }
  }
  deleteFavoriteProduct(favoriteId: number) {
    const idToRemove = favoriteId; // Lưu trữ favoriteId vào biến khác
    this.favoriteService.removeFromFavorites(favoriteId).subscribe(
      () => {
        this.favoriteList = this.favoriteList.filter(
          (favorite: any) => favorite.favoriteId !== idToRemove
        );
      },
      (error) => {
        // Xử lý lỗi nếu có
      }
    );
    console.log(favoriteId);
  }
  getProductIntroduction(productId: number): string {
    const product = this.productDetails.find((p) => p.productId === productId);
    return product?.introduction || '';
  }

  getProductOfficialPrice(productId: number): number {
    const product = this.productDetails.find((p) => p.productId === productId);
    return product?.officialPrice || 0;
  }

  getProductName(productId: number): string {
    const product = this.productDetails.find((p) => p.productId === productId);
    return product?.productName || '';
  }
  getProductImg(productId: number): string {
    const product = this.productDetails.find((p) => p.productId === productId);
    return product?.imgPath1 || '';
  }
}
