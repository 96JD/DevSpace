import _ from "lodash";

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../auth/auth.service";
import { parseJson } from "../../../shared/functions/json";
import { UserLocalStorage } from "../../../shared/interfaces";

@Component({
	selector: "app-my-bio",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./my-bio.component.html"
})
export class MyBioComponent implements OnInit {
	user?: UserLocalStorage;

	userInfo?: { label: string; value: string | number }[];

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const user = params["user"] as string;
			this.user = _.isNil(user) ? this.authService.loggedInUser : (parseJson(user) as UserLocalStorage);
			this.userInfo = [
				{ label: "Job", value: this.user.JobTitle },
				{ label: "Salary", value: this.user.Salary },
				{ label: "Email", value: this.user.Email },
				{ label: "Phone", value: this.user.Phone },
				{ label: "City", value: this.user.City },
				{ label: "Birthday", value: this.user.Birthday }
			];
		});
	}
}
