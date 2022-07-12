import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private router: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.postService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === id);
    });
  }
}
