import { Component } from "@angular/core";

import { APP_ROUTES } from "../../../app-routes";
import { LinkButtonComponent } from "../../../shared/buttons/link-button/link-button.component";
import { SubmitButtonComponent } from "../../../shared/buttons/submit-button/submit-button.component";
import { AnonymousFormWrapperComponent } from "../../../shared/components/anonymous-form-wrapper/anonymous-form-wrapper.component";
import { EmailInputComponent } from "../../../shared/inputs/email-input/email-input.component";
import { TextInput } from "../../../shared/interfaces";
import { AuthService } from "../../auth.service";

@Component({
	selector: "app-forgot-your-password",
	standalone: true,
	imports: [AnonymousFormWrapperComponent, EmailInputComponent, LinkButtonComponent, SubmitButtonComponent],
	templateUrl: "./forgot-your-password.component.html"
})
export class ForgotYourPasswordComponent {
	appRoutes = APP_ROUTES;

	emailInputValue = "";
	isFormValid = false;

	constructor(private authService: AuthService) {}

	onEmailInputChange(emailInput: TextInput) {
		this.emailInputValue = emailInput.value;
		this.isFormValid = emailInput.validationStatus;
	}

	forgotYourPassword() {
		this.authService.forgotYourPassword({ Email: this.emailInputValue });
	}
}
