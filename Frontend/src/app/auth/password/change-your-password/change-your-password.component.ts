import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { APP_ROUTES } from "../../../app-routes";
import { LinkButtonComponent } from "../../../shared/buttons/link-button/link-button.component";
import { SubmitButtonComponent } from "../../../shared/buttons/submit-button/submit-button.component";
import { AnonymousFormWrapperComponent } from "../../../shared/components/anonymous-form-wrapper/anonymous-form-wrapper.component";
import { checkPasswordsMatch } from "../../../shared/functions/password";
import { PasswordInputComponent } from "../../../shared/inputs/password-input/password-input.component";
import { TextInput } from "../../../shared/interfaces";
import { ErrorSpanComponent } from "../../../shared/spans/error-span/error-span.component";
import { AuthService } from "../../auth.service";

@Component({
	selector: "app-change-your-password",
	standalone: true,
	imports: [
		CommonModule,
		AnonymousFormWrapperComponent,
		PasswordInputComponent,
		ErrorSpanComponent,
		LinkButtonComponent,
		SubmitButtonComponent
	],
	templateUrl: "./change-your-password.component.html"
})
export class ChangeYourPasswordComponent {
	appRoutes = APP_ROUTES;

	passwordInput: TextInput = { value: "", validationStatus: false };
	passwordConfirmInput: TextInput = { value: "", validationStatus: false };
	passwordsMatch = false;

	isFormValid = false;

	constructor(private authService: AuthService) {}

	onPasswordInputChange(passwordInput: TextInput, type: string) {
		if (type === "newPassword") {
			this.passwordInput = passwordInput;
		} else {
			this.passwordConfirmInput = passwordInput;
		}
		this.passwordsMatch = checkPasswordsMatch(this.passwordInput.value, this.passwordConfirmInput.value);
		this.isFormValid = this.passwordInput.validationStatus && this.passwordConfirmInput.validationStatus;
	}

	changeYourPassword() {
		this.authService.changeYourPassword({
			Email: this.authService.emailChangePassword!,
			Password: this.passwordInput.value
		});
	}
}
