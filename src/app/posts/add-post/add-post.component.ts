import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addPostForm!: FormGroup;

  constructor(private postService: PostService, private route: Router) {}

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onAddPost() {
    if (this.addPostForm.invalid) {
      this.addPostForm.markAllAsTouched();
    }
    const post: Post = this.addPostForm.value;
    this.postService.add(post).subscribe((data) => {
      this.route.navigate(['posts']);
    });
  }
}
