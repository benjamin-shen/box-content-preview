import { Input, Component } from '@angular/core';
import { openEditor } from '@pqina/pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';
export class PinturaEditorModalComponent extends PinturaEditorAbstractComponent {
    get modal() {
        return this.editor.modal;
    }
    initEditor(element, props) {
        return openEditor(props);
    }
    showEditor() {
        this.editor.show();
    }
    hideEditor() {
        this.editor.hide();
    }
    ngOnDestroy() {
        if (!this.editor)
            return;
        this.editor = undefined;
    }
}
PinturaEditorModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'pintura-editor-modal',
                template: ` <ng-content></ng-content> `
            },] }
];
PinturaEditorModalComponent.propDecorators = {
    preventZoomViewport: [{ type: Input }],
    preventScrollBodyIfNeeded: [{ type: Input }],
    preventFooterOverlapIfNeeded: [{ type: Input }],
    enableAutoHide: [{ type: Input }],
    enableAutoDestroy: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGludHVyYS1lZGl0b3ItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hbmd1bGFyLXBpbnR1cmEvcHJvamVjdHMvYW5ndWxhci1waW50dXJhL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9waW50dXJhLWVkaXRvci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBNEMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU9yRixNQUFNLE9BQU8sMkJBQ1QsU0FBUSw4QkFBaUM7SUFTekMsSUFBSSxLQUFLO1FBQ0wsT0FBNEIsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFvQixFQUFFLEtBQTJCO1FBQ3hELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVO1FBQ0wsSUFBSSxDQUFDLE1BQTZCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELFVBQVU7UUFDTCxJQUFJLENBQUMsTUFBNkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQzs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsNkJBQTZCO2FBRTFDOzs7a0NBS0ksS0FBSzt3Q0FDTCxLQUFLOzJDQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvcGVuRWRpdG9yLCBQaW50dXJhRWRpdG9yTW9kYWwsIFBpbnR1cmFFZGl0b3JPcHRpb25zIH0gZnJvbSAnQHBxaW5hL3BpbnR1cmEnO1xuaW1wb3J0IHsgUGludHVyYUVkaXRvckFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSAnLi9waW50dXJhLWVkaXRvci1hYnN0cmFjdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BpbnR1cmEtZWRpdG9yLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gICAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgUGludHVyYUVkaXRvck1vZGFsQ29tcG9uZW50PFQ+XG4gICAgZXh0ZW5kcyBQaW50dXJhRWRpdG9yQWJzdHJhY3RDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIEBJbnB1dCgpIHByZXZlbnRab29tVmlld3BvcnQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHByZXZlbnRTY3JvbGxCb2R5SWZOZWVkZWQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHByZXZlbnRGb290ZXJPdmVybGFwSWZOZWVkZWQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVuYWJsZUF1dG9IaWRlPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBlbmFibGVBdXRvRGVzdHJveT86IGJvb2xlYW47XG5cbiAgICBnZXQgbW9kYWwoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gKDxQaW50dXJhRWRpdG9yTW9kYWw+dGhpcy5lZGl0b3IpLm1vZGFsO1xuICAgIH1cblxuICAgIGluaXRFZGl0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIHByb3BzOiBQaW50dXJhRWRpdG9yT3B0aW9ucyk6IFBpbnR1cmFFZGl0b3JNb2RhbCB7XG4gICAgICAgIHJldHVybiBvcGVuRWRpdG9yKHByb3BzKTtcbiAgICB9XG5cbiAgICBzaG93RWRpdG9yKCk6IHZvaWQge1xuICAgICAgICAodGhpcy5lZGl0b3IgYXMgUGludHVyYUVkaXRvck1vZGFsKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaGlkZUVkaXRvcigpOiB2b2lkIHtcbiAgICAgICAgKHRoaXMuZWRpdG9yIGFzIFBpbnR1cmFFZGl0b3JNb2RhbCkuaGlkZSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yKSByZXR1cm47XG4gICAgICAgIHRoaXMuZWRpdG9yID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==