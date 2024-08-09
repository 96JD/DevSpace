import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-email-input",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./email-input.component.html"
})
export class EmailInputComponent implements OnInit {
	@Output() emailInputChange = new EventEmitter<TextInput>();
	@Input() value = "";

	emailInput?: FormControl;

	ngOnInit() {
		this.emailInput = new FormControl(this.value, [Validators.required, Validators.email]);
		this.emailInput.valueChanges.subscribe(() => {
			this.emailInputChange.emit({
				value: this.emailInput?.value as string,
				validationStatus: this.emailInput?.status === VALID_STATUS
			});
		});
	}
}
