import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { Discrepancy_ProtocolComponent } from './Discrepancy_Protocol/Discrepancy_Protocol.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
  { path: 'shopId/:shopId/access_token/:access_token', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'document-upload/doc_type/:doc_type/access_token/:access_token', component: DocumentUploadComponent , canActivate: [AuthGuardService]},
  { path: 'discrepancy_protocol', component: Discrepancy_ProtocolComponent, canActivate: [AuthGuardService] },
  { path: '403', component: ForbiddenComponent },
  { path: '**', redirectTo: '/403' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
