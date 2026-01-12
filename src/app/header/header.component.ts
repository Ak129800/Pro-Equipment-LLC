import { Component, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SubProduct {
  name: string;
  imageUrl: string;
}

interface Product {
  name: string;
  description: string;
  imageUrl: string;
  subProducts: SubProduct[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  product: any;


  constructor(private router: Router, private ngZone: NgZone) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras?.state?.['product'];
  }
  noResults: boolean = false;
  showDropdown: boolean = false;
  hoveredProduct: Product | null = null;

  navigateToDetails(product: Product): void {
    this.router.navigate(['/product-details'], {
      state: {
        productName: product.name,
        subProducts: product.subProducts
      }
    });
  }

  products: Product[] = [
    {
      name: 'Autoclaves & Labware Washers',
      description: 'High-quality autoclaves and glassware washers designed for reliable sterilization and lab workflow efficiency.',
      imageUrl: '1.webp',
      subProducts: [
        { name: 'Glassware Washer Standard and Spindle Racks by Labconco', imageUrl: '11.jpg' },
        { name: 'Labware Inserts for Glassware Washers by Labconco', imageUrl: '12.jpg' },
        { name: 'BioClave 8L, 18L, 28L Autoclaves by Benchmark Scientific', imageUrl: '13.jpg' },
        { name: 'Micro Bead Sterilizer by Benchmark Scientific', imageUrl: '1.4.webp' },
        { name: 'UVClave Ultraviolet Chambers by Benchmark Scientific', imageUrl: '1.5.webp' },
        { name: 'BactiZapper™ Infrared MicroSterilizer by Benchmark Scientific', imageUrl: '1.6.webp' }
      ]
    },
    {
      name: 'Balances',
      description: 'Precision balances for accurate measurements in laboratory environments, offering high resolution and reliability.',
      imageUrl: '2.webp',
      subProducts: [
        { name: 'Cubis II Ultra Hi-Resolution High-Capacity Micro Balances with Motorized Draft Shield by Sartorius', imageUrl: '21.webp' },
        { name: 'Cubis II Ultra Hi-Res High Capacity Micro Balances with Manual Draft Shield and Software Packages by Sartorius', imageUrl: '22.webp' },
        { name: 'Cubis II Ultra Hi-Resolution High-Capacity Micro Balances with Manual Draft Shield by Sartorius', imageUrl: '23.webp' },
        { name: 'Cubis II Ultra-Micro and Microbalances by Sartorius', imageUrl: '24.webp' },
        { name: 'Cubis II Semi-Micro Balances by Sartorius', imageUrl: '25.webp' },
        { name: 'Cubis II Analytical Balances by Sartorius', imageUrl: '26.webp' }
      ]
    },
    {
      name: 'Baths & Chillers',
      description: 'Temperature-controlled baths and chillers for precise thermal management in laboratory processes and experiments.',
      imageUrl: '3.webp',
      subProducts: [
        { name: 'MaxQ™ 7000 Water Bath Orbital Shaker by Thermo Scientific', imageUrl: '31.webp' },
        { name: 'PRESTO A45 and A45t Air-Cooled Temperature Control Process Systems by Julabo', imageUrl: '32.webp' },
        { name: 'Dry Bath; Digital, 4 Programmable, Benchmark, 120 V', imageUrl: '33.webp' }
      ]
    },
    {
      name: 'Calorimeters',
      description: 'High-performance calorimeters for precise measurement of heat changes in chemical reactions and processes.',
      imageUrl: '4.webp',
      subProducts: [
        { name: 'C6000 Calorimeters', imageUrl: '41.webp' },
        { name: 'C200 Calorimeters', imageUrl: '42.webp' }
      ]
    },
    {
      name: 'Cell Culture Equipment',
      description: 'Innovative cell culture equipment including incubators and biosafety cabinets for optimal growth conditions.',
      imageUrl: '5.webp',
      subProducts: [
        { name: 'Anaerobic/Hypoxia Glove Box Chambers by Shel Lab', imageUrl: '51.webp' },
        { name: 'MaxQ™ 6000 Incubated/Refrigerated Stackable Shakers by Thermo Scientific', imageUrl: '52.webp' },
        { name: 'Logic Class II A2 Biological Safety Cabinets by Labconco', imageUrl: '53.webp' }
      ]
    },
    {
      name: 'Centrifuges',
      description: 'Reliable centrifuges for efficient sample separation and processing in research and clinical laboratories.',
      imageUrl: '6.webp',
      subProducts: [
        { name: 'Z36-HK Super Speed Refrigerated Centrifuges by Hermle', imageUrl: '61.webp' },
        { name: 'Multifuge X4/X4F Pro Series Centrifuge Packages by Thermo Scientific', imageUrl: '62.webp' },
        { name: 'TX-750 Swinging Bucket Rotor Package by Thermo Fisher Scientific', imageUrl: '63.webp' },
      ]
    }
  ];



  searchQuery: string = '';

  searchProduct(): void {
    const query = this.searchQuery.toLowerCase().trim();

    // Avoid searching for empty or 1–2 character inputs
    if (query.length < 3) {
      this.noResults = true;
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.noResults = false;
          });
        }, 3000);
      });
      return;
    }

    let matchedProduct: Product | null = null;
    let matchedSubProduct: { product: Product; sub: SubProduct } | null = null;

    for (const product of this.products) {
      if (product.name.toLowerCase() === query) {
        matchedProduct = product;
        break;
      }

      for (const sub of product.subProducts) {
        if (sub.name.toLowerCase() === query) {
          matchedSubProduct = { product, sub };
          break;
        }
      }

      if (matchedProduct || matchedSubProduct) break;
    }

    if (matchedProduct) {
      this.navigateToDetails(matchedProduct);
      this.noResults = false;
    } else if (matchedSubProduct) {
      this.navigateToDetails(matchedSubProduct.product);
      this.noResults = false;
    } else {
      this.noResults = true;
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.noResults = false;
          });
        }, 3000);
      });
    }
  }
  subDropdownDirection: 'left-up' | 'left-down' = 'left-down';

  onProductHover(event: MouseEvent, product: Product): void {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const dropdownHeight = product.subProducts.length * 60; // estimated height

    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.top;
    const spaceAbove = rect.top;

    // Determine best direction and scroll setting
    if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
      this.subDropdownDirection = 'left-down';
    } else {
      this.subDropdownDirection = 'left-up';
    }

    this.hoveredProduct = product;
  }
  resetDropdown(): void {
    this.showDropdown = false;
    this.hoveredProduct = null;
  }
}
