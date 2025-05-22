import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { AuthLoginService } from './core/services/auth/auth-login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'fresh-cart';

  private readonly authLoginService = inject(AuthLoginService);

  ngOnInit(): void {
    /*deh tare2a 3l4an lma 23ml refresh el mafrod law me4 3aml login mytla34 el navbar el 3ady 
     lakn law 3aml ytla3 el navbar el 3ady fe tare2a tany h3mlha fe el authloginservice bel afterNextRender*/
    // this.authLoginService.isLoggedInUSer();
  }
}
