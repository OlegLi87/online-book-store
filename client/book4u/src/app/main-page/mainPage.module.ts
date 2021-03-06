import { SharedComponentsModule } from './../shared-components/sharedComponents.module';
import { NotFoundComponent } from './../not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { BookItemComponent } from './books-list/book-item/book-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { SearchFilterSortBarComponent } from './search-filter-sort-bar/search-filter-sort-bar.component';
import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    MainPageComponent,
    SearchFilterSortBarComponent,
    BooksListComponent,
    BookItemComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MainPageComponent,
    SearchFilterSortBarComponent,
    BooksListComponent,
    BookItemComponent,
  ],
})
export class MainPageModule {}
