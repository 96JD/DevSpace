import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

import { ImageComponent } from "../../components/image/image.component";
import { InputLabelComponent } from "../../components/input-label/input-label.component";
import { ErrorSpanComponent } from "../../spans/error-span/error-span.component";

@Component({
	selector: "app-file-input",
	standalone: true,
	imports: [CommonModule, InputLabelComponent, ImageComponent, ErrorSpanComponent],
	templateUrl: "./file-input.component.html"
})
export class FileInputComponent {
	@Output() fileInputChange = new EventEmitter<Blob>();
	@Input() label = "";
	@Input() fileSrc = "";

	@ViewChild("fileInput") fileInput!: ElementRef;

	uploadedFile?: Blob;

	onFileUpload() {
		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const result = e.target?.result;
			if (result) {
				this.fileSrc = result instanceof ArrayBuffer ? new TextDecoder().decode(result) : result;
			}
		};
		this.uploadedFile = (this.fileInput.nativeElement as HTMLInputElement).files?.[0];
		reader.readAsDataURL(this.uploadedFile!);
		this.fileInputChange.emit(this.uploadedFile);
	}
}
