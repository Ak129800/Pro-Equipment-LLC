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
      name: 'Peripheral Instruments',
      description: 'Essential components to enhance and extend the capabilities of analytical instruments.',
      imageUrl: 'gc.png',
      subProducts: [
        { name: 'GC - APPI', imageUrl: 'gc.png' },
        { name: 'Upgrades', imageUrl: 'Upgrades.png' },
        { name: 'GC, LC, Autosampler', imageUrl: 'Autosampler.png' },
        { name: 'Accessory Devices', imageUrl: 'Accessory_Devices.png' }
      ]
    },
    {
      name: 'MS Spare Parts',
      description: 'High-quality spare parts for maintenance and repair of mass spectrometry systems.',
      imageUrl: 'Multipliers.png',
      subProducts: [
        { name: 'Filament Repair', imageUrl: 'Filament_Repair.png' },
        { name: 'Filaments, new', imageUrl: 'Filaments_new.png' },
        { name: 'Heaters, Lamps & Probes', imageUrl: 'Heaters.png' },
        { name: 'Ion Source Parts for MS', imageUrl: 'Ion.png' },
        { name: 'Multipliers and Slits for MS', imageUrl: 'Multipliers.png' },
        { name: 'Sample Supply, GC Coupling', imageUrl: 'Sample_Supply.png' },
        { name: 'Gaskets', imageUrl: 'Gaskets.png' },
        { name: 'Accessory Devices', imageUrl: 'Accessory.png' },
        { name: 'MS Electronics', imageUrl: 'MS.png' }
      ]
    },
    {
      name: 'Data Processing',
      description: 'Advanced software tools and MS libraries for efficient and reliable data analysis.',
      imageUrl: 'Software.png',
      subProducts: [
        { name: 'Software', imageUrl: 'Software.png' },
        { name: 'MS Libraries', imageUrl: 'MS_Lib.png' }
      ]
    },
    {
      name: 'Vacuum Generation',
      description: 'Reliable vacuum solutions for instrument stability and performance.',
      imageUrl: 'Vacuum_oils.png',
      subProducts: [
        { name: 'Forepumps and Accessories', imageUrl: 'Forepumps.png' },
        { name: 'Turbopumps', imageUrl: 'Turbopumps.png' },
        { name: 'Vacuum Oils', imageUrl: 'Vacuum_oils.png' },
        { name: 'Vacuum Measurement', imageUrl: 'Vacuum_Measurements.png' },
        { name: 'Noise Reduction Boxes', imageUrl: 'Noise.png' }
      ]
    },
    {
      name: 'Vacuum Components',
      description: 'Complete set of vacuum fittings and components for system integration.',
      imageUrl: 'Vaccum_hoses.png',
      subProducts: [
        { name: 'KF Series Components', imageUrl: 'KF.png' },
        { name: 'ISO Series Components', imageUrl: 'ISO.png' },
        { name: 'CF Series Components', imageUrl: 'CF.png' },
        { name: 'Vaccum hoses', imageUrl: 'Vaccum_hoses.png' }
      ]
    },
    {
      name: 'GC Accessories',
      description: 'All necessary accessories to maintain and optimize Gas Chromatography systems.',
      imageUrl: 'GC_Gas.png',
      subProducts: [
        { name: 'GC Coloumns and Accessories', imageUrl: 'GC_Coloumns.png' },
        { name: 'GC Gas Supply', imageUrl: 'GC_Gas.png' },
        { name: 'GC Injector Lines etc.', imageUrl: 'GC_Injector.png' },
        { name: 'GC Septa', imageUrl: 'GC_Septa.png' },
        { name: 'GC Ferrules', imageUrl: 'GC_Ferrules.png' },
        { name: 'GC Autosampler Vials', imageUrl: 'GC_Autosampler.png' }
      ]
    },
    {
      name: 'LC Accessories',
      description: 'Accessories tailored for Liquid Chromatography to ensure smooth operation and accuracy.',
      imageUrl: 'Peek_tubbing.png',
      subProducts: [
        { name: 'Nitrogengenerator', imageUrl: 'Nitrogengenerator.png' },
        { name: 'Vacuum Degasser', imageUrl: 'Vacuum_Degasser.png' },
        { name: 'PEEK Tubing', imageUrl: 'Peek_tubbing.png' },
        { name: 'Tubbing, Fittings, Filter etc.', imageUrl: 'Tubbing.png' },
        { name: 'Syringe Filter', imageUrl: 'Syringe_Filter.png' },
        { name: 'Diffusion Caps', imageUrl: 'Diffussion_cap.png' },
        { name: 'Wash Vials', imageUrl: 'Wash_Vials.png' }
      ]
    },
    {
      name: 'Cleaning & Standards',
      description: 'Cleaning tools and certified calibration standards for precise instrumentation.',
      imageUrl: 'Tools.png',
      subProducts: [
        { name: 'Cleaning Supplies', imageUrl: 'Cleaning_Supplies.png' },
        { name: 'Tools', imageUrl: 'Tools.png' },
        { name: 'Calibration & Stds.', imageUrl: 'ToolsCalibration_Stds.png' }
      ]
    },
    {
      name: 'Art. by Suppliers',
      description: 'Vendor-specific products categorized for convenience and compatibility.',
      imageUrl: 'GC_LC_MS.png',
      subProducts: [
        { name: 'GC LC MS', imageUrl: 'GC_LC_MS.png' },
        { name: 'Vacuum', imageUrl: 'Vaccum.png' }
      ]
    },
    {
      name: 'Art. by Instruments',
      description: 'Instrument-specific parts and assemblies for Thermo Fisher GC/MS platforms.',
      imageUrl: 'TRACE_FOCUS_GC.png',
      subProducts: [
        { name: 'TRACE GC, FOCUS GC', imageUrl: 'TRACE_FOCUS_GC.png' },
        { name: 'TriPlus and CTC Autosampler', imageUrl: 'Triplis_CTC_Autosampler.png' },
        { name: 'DSQ / DSQ II GC/MS', imageUrl: 'DSQorDSQII_GCorMS.png' },
        { name: 'PolarisQ GC/MS', imageUrl: 'PolarisQ_GCorMS.png' },
        { name: 'TSQ Quantum GC GC/MS', imageUrl: 'TSQ_Quantum_GC_GCorMS.png' },
        { name: 'DFS High Resolution GC/MS', imageUrl: 'DFS_High_Resolution_GCorMS.png' },
        { name: 'MAT95 High Resolution GC/MS', imageUrl: 'MAT95_High_Resolution_GCorMS.png' },
        { name: 'ITD®, ITS40®', imageUrl: 'ITD_ITS40.png' },
        { name: 'Element 1/2/GD/XR HR ICP MS', imageUrl: 'Element_1or2orGDorXR_HR_ICP_MS.png' },
        { name: 'LTQ, LTQ XL, Velos, Velos Pro®', imageUrl: 'LTQ.png' },
        { name: 'LTQ OrbiTrap®', imageUrl: 'LTQ_OrbiTrap.png' },
        { name: 'IDmicro Breath', imageUrl: 'IDmicro_Breath.png' }
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
