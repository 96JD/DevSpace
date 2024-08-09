import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { AuthService } from "../../auth/auth.service";
import { NavigationButtonsComponent } from "../../shared/buttons/navigation-buttons/navigation-buttons.component";
import { UserMenuButtonsComponent } from "../../shared/buttons/user-menu-buttons/user-menu-buttons.component";
import { ImageComponent } from "../../shared/components/image/image.component";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { UserLocalStorage } from "../../shared/interfaces";
import { SearchComponent } from "./search/search.component";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		LogoComponent,
		SearchComponent,
		ImageComponent,
		NavigationButtonsComponent,
		UserMenuButtonsComponent
	],
	templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
	appRoutes = APP_ROUTES;

	loggedInUser!: UserLocalStorage;
	isMobileMenuOpen = false;
	isSearchPaletteOpen = false;
	isUserMenuOpen = false;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.loggedInUser = this.authService.loggedInUser;
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}

	toggleSearchPalette() {
		this.isSearchPaletteOpen = !this.isSearchPaletteOpen;
	}

	openSearchPalette(event: KeyboardEvent | MouseEvent) {
		if ((event instanceof KeyboardEvent && event.key === "Enter") || event instanceof MouseEvent) {
			this.toggleSearchPalette();
		}
	}

	toggleUserMenu() {
		this.isUserMenuOpen = !this.isUserMenuOpen;
	}

	closeUserMenu(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest(".user-menu")) {
			this.isUserMenuOpen = false;
		}
	}

	@HostListener("document:click", ["$event"])
	onClick(event: MouseEvent) {
		if (this.isUserMenuOpen) {
			this.closeUserMenu(event);
		}
	}
}
