import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-date-input",
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./date-input.component.html"
})
export class DateInputComponent implements OnInit {
	@Output() dateInputChange = new EventEmitter<TextInput>();
	@Input() label = "";
	@Input() value = "";

	dateInput?: FormControl;

	ngOnInit() {
		this.dateInput = new FormControl(this.value, [Validators.required]);
		this.dateInput.valueChanges.subscribe(() => {
			this.dateInputChange.emit({
				value: this.dateInput?.value as string,
				validationStatus: this.dateInput?.status === VALID_STATUS
			});
		});
	}
}
