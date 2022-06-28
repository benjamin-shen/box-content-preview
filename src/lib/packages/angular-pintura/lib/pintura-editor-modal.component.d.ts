import { OnInit } from '@angular/core';
import { PinturaEditorModal, PinturaEditorOptions } from '@pqina/pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';
export declare class PinturaEditorModalComponent<T> extends PinturaEditorAbstractComponent<T> implements OnInit {
    preventZoomViewport?: boolean;
    preventScrollBodyIfNeeded?: boolean;
    preventFooterOverlapIfNeeded?: boolean;
    enableAutoHide?: boolean;
    enableAutoDestroy?: boolean;
    get modal(): HTMLElement;
    initEditor(element: HTMLElement, props: PinturaEditorOptions): PinturaEditorModal;
    showEditor(): void;
    hideEditor(): void;
    ngOnDestroy(): void;
}
