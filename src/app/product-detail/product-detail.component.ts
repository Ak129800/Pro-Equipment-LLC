import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

interface SubProduct {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  subProducts: SubProduct[] = [];
  productName: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      productName?: string;
      subProducts?: SubProduct[];
    };

    if (state) {
      this.productName = state.productName ?? '';
      this.subProducts = state.subProducts ?? [];
    } else {
      this.router.navigate(['/']);
    }
  }
}
