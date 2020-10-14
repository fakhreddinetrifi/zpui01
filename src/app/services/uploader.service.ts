import { Injectable } from '@angular/core';
import { Observable, interval, forkJoin } from 'rxjs';
import { tap, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor() { }

  uploadFiles(files) {
    let uploadCalls = [];
    for(let file of files) {
      if(file.progress === 0) {
        uploadCalls.push(this.uploadFile(file));
      }
    }
    return forkJoin(uploadCalls);
  }
  
  uploadFile(file) {
    return interval(1000).pipe(
      tap(() => {file.progress += 5;}),
      takeWhile (() => file.progress < 100)
    )
    // return new Observable<number>(observer => {
    //   const progressInterval = setInterval(() => {
    //     if (file.progress === 100) {
    //       clearInterval(progressInterval);
    //     } else {
    //       observer.next(file.progress + 5)
    //     }
    //   }, 1000);
    // });



    // const progressInterval = setInterval(() => {
    //   if (file.progress === 100) {
    //     clearInterval(progressInterval);
    //   } else {
    //     file.progress += 5;
    //   }
    // }, 1000);
  }
}
