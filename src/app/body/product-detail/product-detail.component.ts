import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FavoriteProductService } from 'src/app/services/favoriteproduct.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productID: number = 0;
  product: any;
  userId: any;
  // currentImage: string = 'assets/h1.jpg';//hình hiện tại trên màn hình chi tiết
  currentImage: any;
  category: any;
  countProd: number = 1;
  selectedItem: string = '';
  isOutOfStock: boolean = false;
  isLimitReached: boolean = false;
  isOutOfStockDB: boolean = false;
  // thumbnailImages: string[] = ['assets/h1.jpg', 'assets/h2.jpg', 'assets/h1.jpg']; //mảng hình
  thumbnailImages: any; //mảng hình

  content: string = '';
  comments: any;
  users: any[] = [];
  customers: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cusService: CustomerService,
    private shoppingCart: ShoppingCartService,
    private authen: AuthenticationService,
    private favoriteProd: FavoriteProductService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Di chuyển đến đầu trang của trang mới
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.productID = Number(this.route.snapshot.paramMap.get('id'));
      // this.category = "this.productService.getCategoryByIDProd(this.productID)";
      this.product = this.productService
        .getProductIdAPI(this.productID)
        .subscribe((data: any) => {
          this.currentImage = data.imgPath1;
          this.thumbnailImages = [data.imgPath1, data.imgPath2, data.imgPath3];
        });
      this.productService
        .getProductIdAPI(this.productID)
        .subscribe((prod: number) => {
          this.product = prod;
          this.updateOutOfStockStatus();
          this.onIsOutOfStock();
        });
      this.productService
        .getCommentByProductId(this.productID)
        .subscribe((prod: any) => {
          this.comments = prod;
          this.comments.forEach((comment: { userId: number }) => {
            this.cusService
              .getCustomerIdAPI(comment.userId)
              .subscribe((user: any) => {

                console.log('bla', user.userName)

                console.log(user)
                this.users.push(user);
                console.log(this.users)
              });
          });
          this.userId = this.comments.userId;
          console.log(this.userId);
        });
    });
  }
  nextImage() {
    // Tìm vị trí của hình ảnh hiện tại trong mảng thumbnailImages
    const currentIndex = this.thumbnailImages.indexOf(this.currentImage);

    // Chuyển đến hình ảnh tiếp theo trong mảng
    const nextIndex = (currentIndex + 1) % this.thumbnailImages.length;
    this.currentImage = this.thumbnailImages[nextIndex];
  }
  showImage(image: string) {
    this.currentImage = image;
  }
  onSelectorChange(event: any): void {
    const selectedValue = event.target.value;
    this.selectedItem = selectedValue;
    console.log('Đã chọn:', this.selectedItem);
  }
  onDropdownChange() {
    // console.log("Giá trị được chọn là: " + this.size);
    // Bạn có thể thực hiện các xử lý khác ở đây
  }
  AddToCart(prod: any) {
    //this.userId = this.authen.getCurrentUser();
    // var prod = this.productService.getCategoryByIDProd(prodID);
    if (
      (this.selectedItem == this.product.size1 && this.product.amount1 == 0) ||
      (this.selectedItem == this.product.size1 &&
        this.countProd > this.product.amount1) ||
      !this.selectedItem
    ) {
      alert(
        'Vui lòng chọn size hoặc chọn lại số lượng vì có thể vượt quá số lượng kho'
      );
      return;
    } else if (
      (this.selectedItem == this.product.size2 && this.product.amount2 == 0) ||
      (this.selectedItem == this.product.size2 &&
        this.countProd > this.product.amount2) ||
      !this.selectedItem
    ) {
      alert(
        'Vui lòng chọn size khác hoặc chọn lại số lượng vì có thể vượt quá số lượng kho'
      );
      return;
    } else if (
      (this.selectedItem == this.product.size3 && this.product.amount3 == 0) ||
      (this.selectedItem == this.product.size3 &&
        this.countProd > this.product.amount3) ||
      !this.selectedItem
    ) {
      alert(
        'Vui lòng chọn size khác hoặc chọn lại số lượng vì có thể vượt quá số lượng kho'
      );
      return;
    }
    this.shoppingCart.addToCart(
      this.product,
      this.countProd,
      this.selectedItem
    );
    // this.shoppingCart.AddToCart(this.product, this.countProd, this.selectedItem);
    // this.router.navigate(['/shopping-cart']);
    // alert(prodID)
    alert(this.selectedItem);
  }
  AddToFavorite(prod: any) {
    if (this.authen.customerLoginState) {
      const data = {
        productId: prod.productId,
        userId: this.authen.getCurrentUser(),
      };
      this.favoriteProd.addToFavorites(data).subscribe();
      console.log(this.authen.getCurrentUser());
      alert('Đã thêm vào danh sách yêu thích');
    } else {
      alert('Vui lòng đăng nhập');
      this.router.navigate(['/login']);
    }
  }
  CounterMinus() {
    if (this.countProd == 0) {
      this.countProd = 1;
    }
    if (this.countProd > 0) {
      this.countProd -= 1;
      this.updateOutOfStockStatus();
      this.isLimitReached = false;
    }
  }
  CounterPlus() {
    if (
      this.countProd < this.product.amount1 ||
      this.selectedItem == this.product.size1
    ) {
      this.countProd += 1;
      this.updateOutOfStockStatus();
    } else if (
      this.countProd < this.product.amount2 ||
      this.selectedItem == this.product.size2
    ) {
      this.countProd += 1;
      this.updateOutOfStockStatus();
    } else if (
      this.countProd < this.product.amount3 ||
      this.selectedItem == this.product.size3
    ) {
      this.countProd += 1;
      this.updateOutOfStockStatus();
    } else {
      this.isLimitReached = true; // Đánh dấu rằng giới hạn đã đạt được
    }
  }
  private updateOutOfStockStatus() {
    // Kiểm tra xem nút tăng sản phẩm cần vô hiệu hóa hay không
    if (this.selectedItem == this.product.size1) {
      this.isOutOfStock = this.countProd >= this.product.amount1;
    } else if (this.selectedItem == this.product.size2) {
      this.isOutOfStock = this.countProd >= this.product.amount2;
    } else if (this.selectedItem == this.product.size3) {
      this.isOutOfStock = this.countProd >= this.product.amount3;
    }
  }
  onIsOutOfStock() {
    if (this.product.amount1 == 0 && this.product.size1) {
      this.isOutOfStockDB = true;
    } else if (this.product.amount2 == 0 && this.product.size2) {
      this.isOutOfStockDB = true;
    } else if (this.product.amount3 == 0 && this.product.size3) {
      this.isOutOfStockDB = true;
    }
  }
  onSubmit(f: NgForm) {
    if (this.authen.customerLoginState) {
      const data = {
        userId: this.authen.getCurrentUser(),
        productId: this.productID,
        content: f.value.content,
      };
      this.productService.postCommentAPI(data).subscribe();
      this.router.navigate(['/product-detail', this.productID]);

    } else {
      console.log(this.authen.getCurrentUser);
      console.log('Bạn chưa đăng nhập ?');
    }
    console.log(f);

  }
}
