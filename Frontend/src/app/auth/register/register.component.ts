import _ from "lodash";

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { APP_ROUTES } from "../../app-routes";
import { LinkButtonComponent } from "../../shared/buttons/link-button/link-button.component";
import { SubmitButtonComponent } from "../../shared/buttons/submit-button/submit-button.component";
import { AnonymousFormWrapperComponent } from "../../shared/components/anonymous-form-wrapper/anonymous-form-wrapper.component";
import { checkPasswordsMatch } from "../../shared/functions/password";
import { CheckboxInputComponent } from "../../shared/inputs/checkbox-input/checkbox-input.component";
import { DateInputComponent } from "../../shared/inputs/date-input/date-input.component";
import { EmailInputComponent } from "../../shared/inputs/email-input/email-input.component";
import { FileInputComponent } from "../../shared/inputs/file-input/file-input.component";
import { NumberInputComponent } from "../../shared/inputs/number-input/number-input.component";
import { PasswordInputComponent } from "../../shared/inputs/password-input/password-input.component";
import { PhoneInputComponent } from "../../shared/inputs/phone-input/phone-input.component";
import { TextInputComponent } from "../../shared/inputs/text-input/text-input.component";
import { TextareaInputComponent } from "../../shared/inputs/textarea-input/textarea-input.component";
import { TextInput } from "../../shared/interfaces";
import { ErrorSpanComponent } from "../../shared/spans/error-span/error-span.component";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [
		CommonModule,
		AnonymousFormWrapperComponent,
		FileInputComponent,
		DateInputComponent,
		EmailInputComponent,
		TextInputComponent,
		NumberInputComponent,
		PhoneInputComponent,
		TextareaInputComponent,
		LinkButtonComponent,
		PasswordInputComponent,
		CheckboxInputComponent,
		ErrorSpanComponent,
		SubmitButtonComponent
	],
	templateUrl: "./register.component.html"
})
export class RegisterComponent {
	appRoutes = APP_ROUTES;

	formData = new FormData();

	profilePicture?: Blob;
	firstNameInput: TextInput = { value: "", validationStatus: false };
	lastNameInput: TextInput = { value: "", validationStatus: false };
	emailInput: TextInput = { value: "", validationStatus: false };
	phoneInput: TextInput = { value: "", validationStatus: false };
	birthdayInput: TextInput = { value: "", validationStatus: false };
	jobTitleInput: TextInput = { value: "", validationStatus: false };
	cityInput: TextInput = { value: "", validationStatus: false };
	salaryInputValue = 0;
	aboutInput: TextInput = { value: "", validationStatus: false };
	passwordInput: TextInput = { value: "", validationStatus: false };
	passwordConfirmInput: TextInput = { value: "", validationStatus: false };
	passwordsMatch = false;
	termsAndPrivacyValue = 0;

	isFormValid = false;

	constructor(private authService: AuthService) {}

	onInputChange(input: number | TextInput | Blob, type: string) {
		switch (type) {
			case "profilePicture":
				this.profilePicture = input as Blob;
				break;
			case "firstName":
				this.firstNameInput = input as TextInput;
				break;
			case "lastName":
				this.lastNameInput = input as TextInput;
				break;
			case "email":
				this.emailInput = input as TextInput;
				break;
			case "phone":
				this.phoneInput = input as TextInput;
				break;
			case "birthday":
				this.birthdayInput = input as TextInput;
				break;
			case "jobTitle":
				this.jobTitleInput = input as TextInput;
				break;
			case "city":
				this.cityInput = input as TextInput;
				break;
			case "salary":
				this.salaryInputValue = input as number;
				break;
			case "about":
				this.aboutInput = input as TextInput;
				break;
			case "newPassword":
				this.passwordInput = input as TextInput;
				this.passwordsMatch = checkPasswordsMatch(this.passwordInput.value, this.passwordConfirmInput.value);
				break;
			case "confirmPassword":
				this.passwordConfirmInput = input as TextInput;
				this.passwordsMatch = checkPasswordsMatch(this.passwordInput.value, this.passwordConfirmInput.value);
				break;
			case "termsAndPrivacy":
				this.termsAndPrivacyValue = input as number;
				break;
		}

		this.isFormValid =
			!!this.profilePicture &&
			this.firstNameInput.validationStatus &&
			this.lastNameInput.validationStatus &&
			this.emailInput.validationStatus &&
			this.phoneInput.validationStatus &&
			this.birthdayInput.validationStatus &&
			this.jobTitleInput.validationStatus &&
			this.cityInput.validationStatus &&
			this.aboutInput.validationStatus &&
			this.passwordInput.validationStatus &&
			this.passwordConfirmInput.validationStatus &&
			this.termsAndPrivacyValue === 1;
	}

	register() {
		this.formData.append("ProfilePicture", this.profilePicture as Blob);
		this.formData.append("FirstName", this.firstNameInput.value);
		this.formData.append("LastName", this.lastNameInput.value);
		this.formData.append("JobTitle", this.jobTitleInput.value);
		this.formData.append("Phone", this.phoneInput.value);
		this.formData.append("Email", this.emailInput.value);
		this.formData.append("City", this.cityInput.value);
		this.formData.append("Salary", _.toString(this.salaryInputValue));
		this.formData.append("Birthday", this.birthdayInput.value);
		this.formData.append("About", this.aboutInput.value);
		this.formData.append("Password", this.passwordInput.value);
		this.formData.append("IsTermsAndPrivacyAccepted", _.toString(this.termsAndPrivacyValue));

		this.authService.register(this.formData, {
			Email: this.emailInput.value,
			Password: this.passwordInput.value
		});
	}
}
