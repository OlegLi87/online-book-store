import { NotFoundComponent } from './../not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { BookItemComponent } from './books-list/book-item/book-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { SearchFilterSortBarComponent } from './search-filter-sort-bar/search-filter-sort-bar.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
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
    NewArrivalsComponent,
    SearchFilterSortBarComponent,
    BooksListComponent,
    BookItemComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [
    MainPageComponent,
    NewArrivalsComponent,
    SearchFilterSortBarComponent,
    BooksListComponent,
    BookItemComponent,
  ],
})
export class MainPageModule {}
