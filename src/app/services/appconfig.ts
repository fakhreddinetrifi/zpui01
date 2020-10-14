export abstract class AppConfig {
  production: boolean;
  debugEnabled: boolean;
  simplysign_url: string;
  emc_protocol: string;
  emc_host: string;
  ecm_port: string;
  ecm_app_name: string;
  ecm_gettoken_service: string;
  ecm_getprofile_service: string ;
  ecm_cpi_validatepin_service: string;
  ecm_document_sign_service: string;
  ecm_document_list_service: string;
  ecm_document_listSigned_service: string;
  ecm_document_download_service: string;
  ecm_document_updatestatus_service: string;
  otcs_auth_service: string;
  default_language: string;
  version: string
}