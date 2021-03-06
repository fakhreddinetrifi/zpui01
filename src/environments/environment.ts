// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  debugEnabled: true,
  simplysign_url: "https://model.simplysign.webnotarius.pl/idp/oauth2.0/authorize?response_type=code&client_id=RT5qxMX7C6T557eH83Ea&redirect_uri=https://dev.ecm.zabka.pl:8443/zpui01",
  emc_protocol: "http",
  emc_host: "localhost",
  ecm_port: "8080",
  ecm_app_name: "zpecm-rest",
  ecm_gettoken_service: "cpi/gettoken",
  ecm_getprofile_service: "cpi/getprofile",
  ecm_cpi_validatepin_service: "cpi/validatepin",
  ecm_document_sign_service: "document/sign",
  ecm_document_list_service: "document/list",
  ecm_document_listSigned_service: "document/listSigned",
  ecm_document_download_service: "document/download",
  ecm_document_updatestatus_service: "document/updatestatus",
  otcs_auth_service: "otcs/auth",
  default_language: "en"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
