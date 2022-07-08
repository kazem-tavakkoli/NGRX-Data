import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { map, Observable } from "rxjs";
import { Post } from "../model/post.model";

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
constructor(http: HttpClient,httpUrlGenerator:HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
}  

override getAll(): Observable<Post[]> {
    return this.http.get<Post[]>('https://vue-completecourse.firebaseio.com/posts.json')
    .pipe(map((data)=>{
        const posts:Post[] = [];
        for(const key in data){
            if(data.hasOwnProperty(key)){
                posts.push({
                    id:key,
                    ...data[key]
                });
            }
        }
        return posts;
    }))
}
}