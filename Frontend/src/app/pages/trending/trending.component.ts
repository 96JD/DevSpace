import { ToastrService } from "ngx-toastr";

import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { TrendingService } from "../../layout/aside/trending/trending.service";
import { ViewButtonComponent } from "../../shared/buttons/view-button/view-button.component";
import { DividerComponent } from "../../shared/components/divider/divider.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { toastError } from "../../shared/functions/toast";
import { ErrorResponse, TrendingArticles } from "../../shared/interfaces";

interface TrendingResponse {
	articles: TrendingArticles[];
}

@Component({
	selector: "app-trending",
	standalone: true,
	imports: [RouterModule, CommonModule, SpinnerComponent, DividerComponent, ViewButtonComponent],
	templateUrl: "./trending.component.html"
})
export class TrendingComponent implements OnInit {
	appRoutes = APP_ROUTES;
	@Input() label = "View All";
	@Input() top = 15;

	loading = true;
	trendingArticles: TrendingArticles[] = [];

	constructor(
		private trendingService: TrendingService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.trendingService.getTrendingArticles().subscribe({
			next: (response) => {
				this.trendingArticles = (response as TrendingResponse).articles;
				this.loading = false;
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}
}
