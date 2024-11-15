// we will remove all become now we want app.module.ts loads first not AppComponent

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";


platformBrowserDynamic().bootstrapModule(AppModule)