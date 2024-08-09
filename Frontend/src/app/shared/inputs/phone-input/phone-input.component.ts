import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from "ngx-intl-tel-input";

import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { VALID_STATUS } from "../../constants";
import { TextInput } from "../../interfaces";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

interface PhoneInputValue {
	internationalNumber: string;
}

@Component({
	selector: "app-phone-input",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule, InputLabelComponent, ErrorSpanComponent],
	templateUrl: "./phone-input.component.html",
	styleUrls: ["./phone-input.component.css"],
	encapsulation: ViewEncapsulation.None
})
export class PhoneInputComponent implements OnInit {
	@Output() phoneInputChange = new EventEmitter<TextInput>();
	@Input() value = "";

	searchCountryField = SearchCountryField;
	countryISO = CountryISO;
	phoneInput?: FormControl;

	ngOnInit() {
		this.phoneInput = new FormControl(this.value, [Validators.required]);
		this.phoneInput.valueChanges.subscribe(() => {
			this.phoneInputChange.emit({
				value: (this.phoneInput?.value as PhoneInputValue)?.internationalNumber,
				validationStatus: this.phoneInput?.status === VALID_STATUS
			});
		});
	}
}
