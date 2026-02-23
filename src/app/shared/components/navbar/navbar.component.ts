import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  menuOpen = false;

  isLoggedIn = computed(() => this.auth.isLoggedIn());

  constructor(private auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
