import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component'
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-term-and-condition',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './term-and-condition.component.html',
  styleUrl: './term-and-condition.component.css'
})
export class TermAndConditionComponent {

  constructor(
    private readonly router: Router,
  ) {
  }

  navigateToPrivacyPolicy() {
    this.router.navigate(['/privacyPolicy']);
  }
}
