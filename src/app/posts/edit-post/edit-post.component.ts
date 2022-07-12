import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;
  id?: string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
    this.id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe((Posts) => {
      if(Posts.length > 0){
      const post = Posts.find((q) => q.id == this.id);
      this.editPostForm.patchValue({
        title: post?.title,
        description: post?.description,
      })}
    });
  }

  onEditPost() {
    if (this.editPostForm.invalid) {
      this.editPostForm.markAllAsTouched();
    }
    const postData = {
      ...this.editPostForm.value,
      id:this.id
    }
    this.postService.update(postData).subscribe((data) => {
      this.router.navigate(['posts'])
    });
  }
}
