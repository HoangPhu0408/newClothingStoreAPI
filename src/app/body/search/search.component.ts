import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Products } from 'src/app/model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  lstProd: Products[] = [];
  search_key = '';
  searchTitleHead = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.search_key = this.route.snapshot.params['search_key'];
      this.searchTitleHead =
        'Kết quả tìm kiếm cho ' + '"' + this.search_key + '"';
      this.productService
        .getProdBySearchKeyAPI(this.search_key)
        .subscribe((lstProd) => (this.lstProd = lstProd));
    });
  }
}
