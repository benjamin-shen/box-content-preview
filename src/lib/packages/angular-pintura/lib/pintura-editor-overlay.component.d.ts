import { OnInit } from '@angular/core';
import { PinturaEditor, PinturaEditorOptions } from '@pqina/pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';
export declare class PinturaEditorOverlayComponent<T> extends PinturaEditorAbstractComponent<T> implements OnInit {
    initEditor(element: HTMLElement, props: PinturaEditorOptions): PinturaEditor;
}
