import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit, AfterViewInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';

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
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  isBrowser = false;
  currentSlide = 0;
  currentIndex = 1;
  activeIndex = 0;
  autoplayInterval: any;

  navigateToDetails(product: Product) {
    this.router.navigate(['/product-details'], {
      state: { productName: product.name, subProducts: product.subProducts }
    });

  }

  imageContainer: HTMLElement | null = null;
  nameElement: HTMLElement | null = null;
  designationElement: HTMLElement | null = null;
  quoteElement: HTMLElement | null = null;
  prevButton: HTMLElement | null = null;
  nextButton: HTMLElement | null = null;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
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



  ngOnInit(): void {
    if (this.isBrowser) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Initialize DOM elements
    this.imageContainer = document.getElementById('image-container') as HTMLElement;
    this.nameElement = document.getElementById('name') as HTMLElement;
    this.designationElement = document.getElementById('designation') as HTMLElement;
    this.quoteElement = document.getElementById('quote') as HTMLElement;
    this.prevButton = document.getElementById('prev-button') as HTMLElement;
    this.nextButton = document.getElementById('next-button') as HTMLElement;

    // Initialize other interactive features
    this.setupMobileMenu();
    this.initCounters();
    this.setupBlobHover();
    this.initHeroSlider();
    this.initCarousel();
  }




  animateWords(): void {
    const words = this.quoteElement?.querySelectorAll('.word');
    words?.forEach((word, index) => {
      const element = word as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      element.style.filter = 'blur(10px)';
      setTimeout(() => {
        element.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.filter = 'blur(0)';
      }, index * 20);
    });
  }


  private setupMobileMenu(): void {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn') as HTMLElement | null;
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement | null;

    if (!mobileMenuBtn || !mobileMenu) return;

    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('active');

      const spans = mobileMenuBtn.querySelectorAll('span') as NodeListOf<HTMLElement>;
      if (spans.length >= 3) {
        spans[0].style.transform = isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = isMenuOpen ? '0' : '1';
        spans[2].style.transform = isMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a')?.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
    document.addEventListener('click', (e) => {
      if (isMenuOpen && !mobileMenu.contains(e.target as Node) && !mobileMenuBtn.contains(e.target as Node)) {
        toggleMenu();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isMenuOpen) toggleMenu();
    });
  }

  private initCounters(): void {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target')!;
        const count = +counter.textContent!;
        const increment = target / 100;
        if (count < target) {
          counter.textContent = `${Math.ceil(count + increment)}`;
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = `${target}`;
        }
      };
      updateCount();
    });
  }

  private setupBlobHover(): void {
    document.querySelectorAll('.constr-card').forEach(card => {
      const blob = card.querySelector('.constr-blob') as HTMLElement;
      if (!blob) return;

      card.addEventListener('mouseenter', () => {
        blob.style.transform = 'translate(-50%, -50%) scale(1.3)';
      });
      card.addEventListener('mouseleave', () => {
        blob.style.transform = 'translate(-50%, -50%) scale(1.2)';
      });
    });
  }

  private initHeroSlider(): void {
    const slides = document.querySelectorAll('.hero-slide') as NodeListOf<HTMLElement>;
    const nextButton = document.getElementById('next-btn');

    nextButton?.addEventListener('click', () => {
      slides[this.currentSlide]?.classList.remove('active');
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      slides[this.currentSlide]?.classList.add('active');
    });
  }

  private initCarousel(): void {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const items = Array.from(document.querySelectorAll('.carousel-item')) as HTMLElement[];
    const prevBtn = document.querySelector('.prev') as HTMLElement;
    const nextBtn = document.querySelector('.next') as HTMLElement;

    const updateCarousel = () => {
      const itemWidth = items[0]?.getBoundingClientRect().width || 0;
      const trackOffset = ((track.parentElement?.offsetWidth || 0) - itemWidth) / 3;

      track.style.transform = `translateX(calc(-${this.currentIndex * itemWidth}px + ${trackOffset}px))`;
      items.forEach((item, index) => {
        item.classList.toggle('active', index === this.currentIndex);
      });
    };

    nextBtn?.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % items.length;
      updateCarousel();
    });

    prevBtn?.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });

    updateCarousel();
  }
}
