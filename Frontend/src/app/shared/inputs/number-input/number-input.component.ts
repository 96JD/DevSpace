import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";

@Component({
	selector: "app-number-input",
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, InputLabelComponent],
	templateUrl: "./number-input.component.html"
})
export class NumberInputComponent implements OnInit {
	@Output() numberInputChange = new EventEmitter<number>();
	@Input() label = "";
	@Input() value = 0;

	numberInput?: FormControl;

	ngOnInit() {
		this.numberInput = new FormControl(this.value, [Validators.required]);
		this.numberInput.valueChanges.subscribe(() => {
			this.numberInputChange.emit(this.value);
		});
	}
}
