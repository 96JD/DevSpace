import { ToastrService } from "ngx-toastr";

import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../../app-routes";
import { AuthService } from "../../../auth/auth.service";
import { DividerComponent } from "../../components/divider/divider.component";
import {
	JWT_TOKEN,
	LOGGED_IN_USER,
	removeObjectFromLocalStorage,
	setInLocalStorage
} from "../../functions/localStorage";
import { toastError, toastSuccess } from "../../functions/toast";
import { ErrorResponse } from "../../interfaces";
import { UserMenuButtonsService } from "./user-menu-buttons.service";

@Component({
	selector: "app-user-menu-buttons",
	standalone: true,
	imports: [RouterModule, DividerComponent],
	templateUrl: "./user-menu-buttons.component.html"
})
export class UserMenuButtonsComponent {
	appRoutes = APP_ROUTES;

	constructor(
		private authService: AuthService,
		private userMenuButtonsService: UserMenuButtonsService,
		private toastrService: ToastrService,
		private router: Router
	) {}

	logout() {
		this.authService.logout();
	}

	deleteUser() {
		this.userMenuButtonsService.deleteUser(this.authService.loggedInUser.Id).subscribe({
			next: () => {
				toastSuccess(this.toastrService, "Successfully deleted your account!");
				this.authService.isAuthenticated = false;
				this.authService.authChange.next(false);
				setInLocalStorage(JWT_TOKEN, "");
				removeObjectFromLocalStorage(LOGGED_IN_USER);
				this.router.navigate([APP_ROUTES.Login]);
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	onKeyDown(event: KeyboardEvent) {
		if (event instanceof KeyboardEvent && event.key === "Enter") {
			this.deleteUser();
		}
	}
}
