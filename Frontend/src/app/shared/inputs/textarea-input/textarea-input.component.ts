import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-textarea-input",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./textarea-input.component.html"
})
export class TextareaInputComponent implements OnInit {
	@Output() textareaInputChange = new EventEmitter<TextInput>();
	@Input() label = "";
	@Input() value = "";

	textareaInput?: FormControl;

	ngOnInit() {
		this.textareaInput = new FormControl(this.value, [Validators.required]);
		this.textareaInput.valueChanges.subscribe(() => {
			this.textareaInputChange.emit({
				value: this.textareaInput?.value as string,
				validationStatus: this.textareaInput?.status === VALID_STATUS
			});
		});
	}
}
