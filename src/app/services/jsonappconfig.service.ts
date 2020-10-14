import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './appconfig';
import { ROUTER_CONFIGURATION } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JsonappconfigService extends AppConfig {

constructor(private http: HttpClient) {
  super();
}

     load() {
    return this.http.get<AppConfig>('./assets/config/configuration.json')
    .toPromise()
    .then(data=>{
  this.production = data.production;
  this.debugEnabled = data.debugEnabled;
  this.simplysign_url = data.simplysign_url;
  this.emc_protocol = data.emc_protocol;
  this.emc_host = data.emc_host;
  this.ecm_port = data.ecm_port;
  this.ecm_app_name = data.ecm_app_name;
  this.ecm_gettoken_service = data.ecm_gettoken_service;
  this.ecm_cpi_validatepin_service = data.ecm_cpi_validatepin_service;
  this.ecm_document_sign_service = data.ecm_document_sign_service;
  this.ecm_document_list_service = data.ecm_document_list_service;
  this.ecm_document_listSigned_service = data.ecm_document_listSigned_service;
  this.ecm_document_download_service = data.ecm_document_download_service;
  this.ecm_document_updatestatus_service = data.ecm_document_updatestatus_service;
  this.otcs_auth_service = data.otcs_auth_service;
  this.default_language = data.default_language;
  this.ecm_getprofile_service = data.ecm_getprofile_service ;
  this.version = data.version ;
    } )
    .catch(()=> {
      console.error('Could not load configuration')
     });
   }
}
