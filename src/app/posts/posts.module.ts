import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDataService } from './post.data.service';
import { PostResolver } from './post.resolver';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostResolver },
  },
  {
    path: 'add',
    component: AddPostComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostResolver },
  },
  {
    path: 'detail/:id',
    component: SinglePostComponent,
    resolve: { posts: PostResolver },
  },
];

const entityMetadata: EntityMetadataMap = {
  Post:{
      // برای اینکه منتظر پاسخ سرور باشد بعد به روز شود
      entityDispatcherOptions: {
          optimisticUpdate: true,
          optimisticDelete: true     
      }
  }
}

@NgModule({
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [],
  providers: [PostResolver,PostDataService],
})
export class PostsModule {
  constructor(
    eds:EntityDefinitionService,
    entityDataService: EntityDataService,
    PostDataService:PostDataService
  ) {
    eds.registerMetadataMap(entityMetadata),
    entityDataService.registerService('Post', PostDataService);
    
  }
}
