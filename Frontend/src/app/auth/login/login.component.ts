import { CommonModule } from "@angular/common";
import { Component, isDevMode } from "@angular/core";

import { APP_ROUTES } from "../../app-routes";
import { LinkButtonComponent } from "../../shared/buttons/link-button/link-button.component";
import { SubmitButtonComponent } from "../../shared/buttons/submit-button/submit-button.component";
import { AnonymousFormWrapperComponent } from "../../shared/components/anonymous-form-wrapper/anonymous-form-wrapper.component";
import { DividerComponent } from "../../shared/components/divider/divider.component";
import { EmailInputComponent } from "../../shared/inputs/email-input/email-input.component";
import { PasswordInputComponent } from "../../shared/inputs/password-input/password-input.component";
import { TextInput } from "../../shared/interfaces";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [
		CommonModule,
		AnonymousFormWrapperComponent,
		DividerComponent,
		EmailInputComponent,
		PasswordInputComponent,
		LinkButtonComponent,
		SubmitButtonComponent
	],
	templateUrl: "./login.component.html"
})
export class LoginComponent {
	appRoutes = APP_ROUTES;
	devEnv = isDevMode();

	emailInput: TextInput = { value: "", validationStatus: false };
	passwordInput: TextInput = { value: "", validationStatus: false };

	isFormValid = false;

	constructor(private authService: AuthService) {}

	onInputChange(input: TextInput, type: string) {
		if (type === "email") {
			this.emailInput = input;
		} else {
			this.passwordInput = input;
		}
		this.isFormValid = this.emailInput.validationStatus && this.passwordInput.validationStatus;
	}

	login() {
		if (this.devEnv) {
			this.authService.login({ Email: this.emailInput.value, Password: this.passwordInput.value });
		} else {
			this.authService.login({ Email: "ds@ds.com", Password: "DevSpace#96" });
		}
	}
}
