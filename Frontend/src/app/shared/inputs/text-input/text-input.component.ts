import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-text-input",
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./text-input.component.html"
})
export class TextInputComponent implements OnInit {
	@Output() textInputChange = new EventEmitter<TextInput>();
	@Input() label = "";
	@Input() value = "";

	textInput?: FormControl;

	ngOnInit() {
		this.textInput = new FormControl(this.value, [Validators.required]);
		this.textInput.valueChanges.subscribe(() => {
			this.textInputChange.emit({
				value: this.textInput?.value as string,
				validationStatus: this.textInput?.status === VALID_STATUS
			});
		});
	}
}
