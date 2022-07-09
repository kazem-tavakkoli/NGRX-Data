import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { map, Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>('https://vue-completecourse.firebaseio.com/posts.json')
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              posts.push({
                id: key,
                ...data[key],
              });
            }
          }
          return posts;
        })
      );
  }

  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        'https://vue-completecourse.firebaseio.com/posts.json',
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://vue-completecourse.firebaseio.com/posts/${post.id}.json`,
      { ...post.changes }
    );
  }
}
