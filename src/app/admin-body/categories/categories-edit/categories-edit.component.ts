import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit{
  cate: any
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  EditCate(){
    const editedCate = {

      categoryId: Number(this.cate.categoryId),
      categoryName: this.cate.categoryName.toString(),
      createdDate: this.cate.createdDate.toString(),
    
    }
    console.log(editedCate)

    this.productService.putCategoryAPI(Number(this.cate.categoryId), editedCate).subscribe();
    alert('Lưu chỉnh sửa thành công');
    this.router.navigate(['categories'])
  }
}
