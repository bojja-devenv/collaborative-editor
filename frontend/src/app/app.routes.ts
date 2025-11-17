import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CollaborativeEditorComponent } from './collaborative-editor/collaborative-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'collaborative-editor' },
      { path: 'collaborative-editor', component: CollaborativeEditorComponent },
    ],
  },
];
