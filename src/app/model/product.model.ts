import { HttpClient } from "@angular/common/http";

export class Products {
    constructor(public productId: number, public categoryId: number, public productName: string, public initialPrice: number,public officialPrice: number, public size1:string, public size2:string, public size3:string,public amount1: number,public amount2: number,public amount3: number, public Createdate: string , public introduction: string, public imgPath1: string, public imgPath2: string, public imgPath3: string) 
    { 
       
    };
}
