import { ToastrService } from "ngx-toastr";

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { LinkButtonComponent } from "../../shared/buttons/link-button/link-button.component";
import { ViewButtonComponent } from "../../shared/buttons/view-button/view-button.component";
import { ImageComponent } from "../../shared/components/image/image.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { stringifyJson } from "../../shared/functions/json";
import { toastError } from "../../shared/functions/toast";
import { ErrorResponse, UserLocalStorage } from "../../shared/interfaces";
import { EmailSvgComponent } from "../../shared/svgs/email-svg.component";
import { MyNetworkService } from "./my-network.service";

interface MyNetworkResponse {
	value: UserLocalStorage[];
}

@Component({
	selector: "app-my-network",
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		SpinnerComponent,
		LinkButtonComponent,
		ImageComponent,
		EmailSvgComponent,
		ViewButtonComponent
	],
	templateUrl: "./my-network.component.html"
})
export class MyNetworkComponent implements OnInit {
	appRoutes = APP_ROUTES;

	loading = true;
	myNetwork: UserLocalStorage[] = [];
	myNetworkCount = 0;
	top = 15;
	skip = 0;
	label = "View More";

	constructor(
		private myNetworkService: MyNetworkService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.loadMyNetworkUsers();
	}

	loadMyNetworkUsers() {
		this.myNetworkService.getMyNetworkList(this.top, this.skip).subscribe({
			next: (response) => {
				this.myNetworkCount = (response as { "@odata.count": number })["@odata.count"];
				const myNewNetworkUsers = (response as MyNetworkResponse).value;
				this.myNetwork = [...this.myNetwork, ...myNewNetworkUsers];
				if (this.myNetworkCount <= this.top + this.skip) {
					this.label = "";
				}
				this.loading = false;
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	loadMoreMyNetworkUsers() {
		this.skip += this.top;
		this.loadMyNetworkUsers();
	}

	stringifyJson = (object: UserLocalStorage) => stringifyJson(object);
}
