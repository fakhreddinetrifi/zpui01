export const environment = {
  production: true,
  debugEnabled: false,
  simplysign_url: "https://model.simplysign.webnotarius.pl/idp/oauth2.0/authorize?response_type=code&client_id=RT5qxMX7C6T557eH83Ea&redirect_uri=https://dev.ecm.zabka.pl:8443/zpui01",
  emc_protocol: "https",
  emc_host: "dev.ecm.zabka.pl",
  ecm_port: "8443",
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
  default_language: "pl"
};
