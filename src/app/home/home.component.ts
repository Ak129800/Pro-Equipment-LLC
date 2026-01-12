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
      name: 'Autoclaves & Labware Washers',
      description: 'Advanced sterilization and washing systems ensuring contamination-free laboratory operations.',
      imageUrl: '11.jpg',
      subProducts: [
        {
          name: 'Glassware Washer Standard and Spindle Racks by Labconco',
          imageUrl: '11.jpg'
        },
        {
          name: 'Labware Inserts for Glassware Washers by Labconco',
          imageUrl: '12.jpg'
        },
        {
          name: 'BioClave 8L, 18L, 28L Autoclaves by Benchmark Scientific',
          imageUrl: '13.jpg'
        },
        {
          name: 'Micro Bead Sterilizer by Benchmark Scientific',
          imageUrl: '1.4.webp'
        },
        {
          name: 'UVClave Ultraviolet Chambers by Benchmark Scientific',
          imageUrl: '1.5.webp'
        },
        {
          name: 'BactiZapper™ Infrared MicroSterilizer by Benchmark Scientific',
          imageUrl: '1.6.webp'
        }
      ]
    }
    ,
    {
      name: 'Balances',
      description: 'High-precision weighing instruments designed for analytical, research, and industrial laboratory use.',
      imageUrl: '22.webp',
      subProducts: [
        {
          name: 'Cubis II Ultra Hi-Resolution High-Capacity Micro Balances with Motorized Draft Shield by Sartorius',
          imageUrl: '21.webp'
        },
        {
          name: 'Cubis II Ultra Hi-Res High Capacity Micro Balances with Manual Draft Shield and Software Packages by Sartorius',
          imageUrl: '22.webp'
        },
        {
          name: 'Cubis II Ultra Hi-Resolution High-Capacity Micro Balances with Manual Draft Shield by Sartorius',
          imageUrl: '23.webp'
        },
        {
          name: 'Cubis II Ultra-Micro and Microbalances by Sartorius',
          imageUrl: '24.webp'
        },
        {
          name: 'Cubis II Semi-Micro Balances by Sartorius',
          imageUrl: '25.webp'
        },
        {
          name: 'Cubis II Analytical Balances by Sartorius',
          imageUrl: '26.jfif'
        }
      ]
    }
    ,
    {
      name: 'Baths & Chillers',
      description: 'Laboratory temperature control equipment for heating, cooling, and stable thermal processing.',
      imageUrl: '33.webp',
      subProducts: [
        {
          name: 'MaxQ™ 7000 Water Bath Orbital Shaker by Thermo Scientific',
          imageUrl: '31.webp'
        },
        {
          name: 'PRESTO A45 and A45t Air-Cooled Temperature Control Process Systems by Julabo',
          imageUrl: '32.webp'
        },
        {
          name: 'Dry Bath; Digital, 4 Programmable, Benchmark, 120 V',
          imageUrl: '33.webp'
        }
      ]
    }
    ,
    {
      name: 'Calorimeters',
      description: 'High-precision instruments for measuring heat flow, energy content, and thermal properties of materials.',
      imageUrl: '42.webp',
      subProducts: [
        {
          name: 'C6000 Calorimeters',
          imageUrl: '41.webp'
        },
        {
          name: 'C200 Calorimeters',
          imageUrl: '42.webp'
        }
      ]
    }
    ,
    {
      name: 'Cell Culture Equipment',
      description: 'Specialized laboratory equipment designed to maintain, grow, and handle biological cell cultures under controlled conditions.',
      imageUrl: '51.webp',
      subProducts: [
        {
          name: 'Anaerobic/Hypoxia Glove Box Chambers by Shel Lab',
          imageUrl: '51.webp'
        },
        {
          name: 'MaxQ™ 6000 Incubated/Refrigerated Stackable Shakers by Thermo Scientific',
          imageUrl: '52.webp'
        },
        {
          name: 'Logic Class II A2 Biological Safety Cabinets by Labconco',
          imageUrl: '53.webp'
        }
      ]
    }
    ,
    {
      name: 'Centrifuges',
      description: 'High-performance centrifugation systems for clinical, research, and industrial laboratory applications.',
      imageUrl: '62.webp',
      subProducts: [
        {
          name: 'Z36-HK Super Speed Refrigerated Centrifuges by Hermle',
          imageUrl: '61.webp'
        },
        {
          name: 'Multifuge X4/X4F Pro Series Centrifuge Packages by Thermo Scientific',
          imageUrl: '62.webp'
        },
        {
          name: 'TX-750 Swinging Bucket Rotor Package by Thermo Fisher Scientific',
          imageUrl: '63.webp'
        }
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
