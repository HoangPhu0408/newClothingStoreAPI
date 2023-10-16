import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-delete',
  templateUrl: './categories-delete.component.html',
  styleUrls: ['./categories-delete.component.css']
})
export class CategoriesDeleteComponent implements OnInit{
  categoryId : any;
  category : any;
  constructor(private route:ActivatedRoute, private productService : ProductService, private router: Router){}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

      this.productService.getCategoryIdAPI(this.categoryId).subscribe((cate: any) => 
          this.category = cate
        )

    })
  }
  DeleteCate(){
    this.productService.deleteCategoryAPI(this.categoryId).subscribe()
    console.log(this.categoryId)
   this.router.navigate(['/categories'])
 }

}
