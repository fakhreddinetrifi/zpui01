import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DoAuthorizationResponse } from '../Models/do-authorization-response.model';
import { GetProfileResponse } from '../Models/getprofile-reponse.model';
import { PINResponse, PINStateCode } from '../Models/pin-response.model';
import { TokenApiResponse } from '../Models/token-api-reponse.model';
import { DoAuthorizationService } from '../services/do-authorization.service';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.css']
})
export class ValidatePINComponent implements OnInit {
  pinForm: FormGroup;
  requestInProgress: boolean = false;
  errorMessage: string;
  shopId: string;
  profileId: string;
  // @ViewChild("pin") pinElement : ElementRef;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValidatePINComponent>,
    private doAuthService: DoAuthorizationService) {
    this.pinForm = this.formBuilder.group({
      pin: ['', [Validators.required/*, Validators.minLength(2), Validators.maxLength(10)/*, this.validateNameViaServer.bind(this)*/]]
    })
  }

  ngOnInit(): void {
    this.shopId = sessionStorage.getItem("shopId");
    // this.pinElement.nativeElement.focus();
    let assecoProfileId = sessionStorage.getItem("assecoProfileId")
    if (assecoProfileId && assecoProfileId != undefined) {
      this.profileId = assecoProfileId
    }
    else {
      let assecoTokenApi = sessionStorage.getItem("assecoTokenApi");
      if (assecoTokenApi && assecoTokenApi != undefined) {
        this.requestInProgress = true;
        this.doAuthService.getProfile(assecoTokenApi).subscribe(
          (data: GetProfileResponse) => {
            console.log(data);
            if (!data) {
              this.pin.setErrors({});
            } else {
              console.log("Profile ID Valid");
              this.profileId = data.id;
            }
            this.requestInProgress = false;
          },
          (error) => {
            console.log("typeof error: ", typeof error);
            console.log("error: ", error);
            this.requestInProgress = false;
            if (typeof error === 'string') {
              this.errorMessage = error;
              this.pin.setErrors({});
            }
          }
        );
      }
    }
  }

  onSubmit() {
    this.requestInProgress = true;
    let pinValue: string = this.pinForm.value.pin;

    this.doAuthService.getTokenApi()
      .pipe(
        mergeMap((dataTokenResponse: TokenApiResponse) => {
          return this.doAuthService.doPinValidation(this.pinForm.value.pin, dataTokenResponse.access_token)
        }),
        mergeMap((dataPINResponse: PINResponse) => {
          if (dataPINResponse.state === PINStateCode.done) {
            return this.doAuthService.doAuthorization(pinValue)
          } else {
            // throw different error depending the dataPINResponse.message
            console.log("pin message: ", dataPINResponse.message);
            return throwError(dataPINResponse.message);
          }
        })
      )
      .subscribe(
        (data: DoAuthorizationResponse) => {
          console.log(data);
          if (!data) {
            console.log("PIN Not Valid");
            this.pin.setErrors({});
            this.requestInProgress = false;
          } else {
            console.log("PIN Valid");
            this.dialogRef.close({});
          }
          if (!data || data.state !== "done" || data.message !== "Your request has been processed.") {
            console.log("PIN Not Valid");
            this.pin.setErrors({});
          } else {
            console.log("PIN Valid");
            this.dialogRef.close({
              pin: pinValue,
              result: data
            });
          }
        },
        (error) => {
          console.log("typeof error: ", typeof error);
          console.log("error: ", error);
          this.requestInProgress = false;
          if (typeof error === 'string') {
            console.log("PIN Not Valid");
            this.errorMessage = error;
            this.pin.setErrors({});
          }
        }
      );
  }

  // showDialog() {

  // }

  get pin() { return this.pinForm.get('pin') };
}