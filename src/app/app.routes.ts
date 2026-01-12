import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermAndConditionComponent } from './term-and-condition/term-and-condition.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: 'termAnCondition', component: TermAndConditionComponent },
    { path: 'product-details', component: ProductDetailComponent}
];
