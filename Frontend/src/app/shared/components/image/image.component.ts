import _ from "lodash";

import { Component, Input, isDevMode, OnInit } from "@angular/core";

import { BACKEND_API_URL } from "../../constants";

@Component({
	selector: "app-image",
	standalone: true,
	templateUrl: "./image.component.html"
})
export class ImageComponent implements OnInit {
	@Input() classNames = "";
	@Input() url = "";
	@Input() tabindex = "";
	@Input() openOnCLick = true;

	ngOnInit() {
		this.classNames += " cursor-pointer";
	}

	getImageUrl() {
		if (!isDevMode() || !_.startsWith(this.url, "images/")) {
			return this.url;
		}
		return `${BACKEND_API_URL}/${this.url}`;
	}

	openImage(url: string) {
		if (this.openOnCLick) {
			window.open(url, "_blank");
		}
	}

	onKeyDown(event: KeyboardEvent, url: string) {
		if (event instanceof KeyboardEvent && event.key === "Enter") {
			this.openImage(url);
		}
	}
}
