import { provideToastr } from "ngx-toastr";

import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withHashLocation } from "@angular/router";
import { provideIcons, provideNgIconsConfig } from "@ng-icons/core";
import { heroArrowTrendingUp, heroHome, heroUsers } from "@ng-icons/heroicons/outline";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withHashLocation()),
		provideHttpClient(),
		provideAnimations(),
		provideNgIconsConfig({}),
		provideIcons({ heroUsers, heroHome, heroArrowTrendingUp }),
		provideToastr({
			positionClass: "toast-top-right",
			closeButton: true,
			progressBar: true
		})
	]
};
