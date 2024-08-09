import _ from "lodash";

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { NgIconComponent } from "@ng-icons/core";

import { APP_ROUTES } from "../../../app-routes";
import { removeHashAndSlashFromUrl } from "../../functions/string";
import { NavigationButtons } from "../../interfaces";

@Component({
	selector: "app-navigation-buttons",
	standalone: true,
	imports: [RouterModule, CommonModule, NgIconComponent],
	templateUrl: "./navigation-buttons.component.html"
})
export class NavigationButtonsComponent implements OnInit {
	navigationButtons: NavigationButtons[] = [
		{ name: "Home", route: APP_ROUTES.Home, iconName: "heroHome" },
		{ name: "My Network", route: APP_ROUTES.MyNetwork, iconName: "heroUsers" },
		{ name: "Trending", route: APP_ROUTES.Trending, iconName: "heroArrowTrendingUp" }
	];
	selectedNavigationButton = "";
	IsNavigatedAway = false;

	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const currentRoute = removeHashAndSlashFromUrl(location.hash);
				const routeMatches = _.find(this.navigationButtons, { route: currentRoute });
				this.IsNavigatedAway = _.isNil(routeMatches);
			}
		});
	}

	ngOnInit() {
		this.selectedNavigationButton =
			location.hash === "" ? this.navigationButtons[0].route : removeHashAndSlashFromUrl(location.hash);
	}

	onNavigationButtonClick(route: string) {
		this.selectedNavigationButton = route;
	}
}
