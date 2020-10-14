import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './services/appconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,private appConfig: AppConfig) {
    translate.setDefaultLang(this.appConfig.default_language);
    console.log (' Retrieving AppConfig',this.appConfig)
  }

  ngOnInit(): void {
  }

}