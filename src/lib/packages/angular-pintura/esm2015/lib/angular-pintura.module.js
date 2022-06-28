import { NgModule } from '@angular/core';
import { PinturaEditorComponent } from './pintura-editor.component';
import { PinturaEditorModalComponent } from './pintura-editor-modal.component';
import { PinturaEditorOverlayComponent } from './pintura-editor-overlay.component';
export class AngularPinturaModule {
}
AngularPinturaModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PinturaEditorComponent,
                    PinturaEditorModalComponent,
                    PinturaEditorOverlayComponent,
                ],
                imports: [],
                exports: [PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1waW50dXJhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYW5ndWxhci1waW50dXJhL3Byb2plY3RzL2FuZ3VsYXItcGludHVyYS9zcmMvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1waW50dXJhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBV25GLE1BQU0sT0FBTyxvQkFBb0I7OztZQVRoQyxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtvQkFDdEIsMkJBQTJCO29CQUMzQiw2QkFBNkI7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDO2FBQ2hHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBpbnR1cmFFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3BpbnR1cmEtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaW50dXJhRWRpdG9yTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpbnR1cmEtZWRpdG9yLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQaW50dXJhRWRpdG9yT3ZlcmxheUNvbXBvbmVudCB9IGZyb20gJy4vcGludHVyYS1lZGl0b3Itb3ZlcmxheS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQaW50dXJhRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBQaW50dXJhRWRpdG9yTW9kYWxDb21wb25lbnQsXG4gICAgICAgIFBpbnR1cmFFZGl0b3JPdmVybGF5Q29tcG9uZW50LFxuICAgIF0sXG4gICAgaW1wb3J0czogW10sXG4gICAgZXhwb3J0czogW1BpbnR1cmFFZGl0b3JDb21wb25lbnQsIFBpbnR1cmFFZGl0b3JNb2RhbENvbXBvbmVudCwgUGludHVyYUVkaXRvck92ZXJsYXlDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyUGludHVyYU1vZHVsZSB7fVxuIl19