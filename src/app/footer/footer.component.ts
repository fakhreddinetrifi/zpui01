import { Component, OnInit , ElementRef, VERSION} from '@angular/core';
import { AppConfig } from '../services/appconfig';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
ngVersion: string;
  constructor(private environment : AppConfig) { 
this.ngVersion=environment.version;
  }

  ngOnInit(): void {
 //   this.ngVersion = VERSION.full;
    console.log('ng-verion',this.ngVersion)

  }

}
