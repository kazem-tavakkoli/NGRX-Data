import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { first, map, mergeMap, Observable, of, tap } from 'rxjs';
import { PostService } from './post.service';

@Injectable()
export class PostResolver implements Resolve<boolean> {
    constructor(private postServise:PostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
   return this.postServise.loaded$.pipe(
   tap(loaded => { // در صورتی که لود شده باشد
        if (!loaded) {
        this.postServise.getAll();
        }
   }),
    first() // با کلیک روی لینک روت انجام نمی شود که با این کد برطرف می شود
   )
  }
}
