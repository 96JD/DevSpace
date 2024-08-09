import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { PASSWORD_VALIDATION_PATTERN, VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-password-input",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./password-input.component.html"
})
export class PasswordInputComponent implements OnInit {
	@Output() passwordInputChange = new EventEmitter<TextInput>();
	@Input() label = "";
	@Input() isPasswordPatternRequired!: boolean;

	passwordInput = new FormControl("", [Validators.required]);

	ngOnInit() {
		if (this.isPasswordPatternRequired) {
			this.passwordInput = new FormControl("", [
				Validators.required,
				Validators.pattern(PASSWORD_VALIDATION_PATTERN)
			]);
		}

		this.passwordInput.valueChanges.subscribe(() => {
			if (this.passwordInput.value) {
				this.passwordInputChange.emit({
					value: this.passwordInput.value,
					validationStatus: this.passwordInput.status === VALID_STATUS
				});
			}
		});
	}
}
