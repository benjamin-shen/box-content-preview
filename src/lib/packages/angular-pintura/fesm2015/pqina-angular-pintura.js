import { EventEmitter, Component, ElementRef, NgZone, Input, Output, NgModule } from '@angular/core';
import { dispatchEditorEvents, appendEditor, openEditor, overlayEditor } from '@pqina/pintura';

class PinturaEditorAbstractComponent {
    constructor(element, zone) {
        this.unsubs = [];
        // A shortcut to assign multiple props at once
        this.options = undefined;
        // Events
        this.init = new EventEmitter();
        this.loadstart = new EventEmitter();
        this.loadabort = new EventEmitter();
        this.loaderror = new EventEmitter();
        this.loadprogress = new EventEmitter();
        this.load = new EventEmitter();
        this.processstart = new EventEmitter();
        this.processabort = new EventEmitter();
        this.processerror = new EventEmitter();
        this.processprogress = new EventEmitter();
        this.process = new EventEmitter();
        this.update = new EventEmitter();
        this.undo = new EventEmitter();
        this.redo = new EventEmitter();
        this.revert = new EventEmitter();
        this.destroy = new EventEmitter();
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
        this.close = new EventEmitter();
        this.ready = new EventEmitter();
        this.loadpreview = new EventEmitter();
        this.addshape = new EventEmitter();
        this.selectshape = new EventEmitter();
        this.updateshape = new EventEmitter();
        this.removeshape = new EventEmitter();
        this.selectstyle = new EventEmitter();
        // EventHandlerNonNull
        this.routeEvent = (e) => {
            const emitter = this[e.type.split(':')[1]];
            if (!emitter)
                return;
            emitter.emit(e.detail);
        };
        this._initialChanges = {};
        this.element = element;
        this.zone = zone;
    }
    get imageSize() {
        return this.editor.imageSize;
    }
    get imageAspectRatio() {
        return this.editor.imageAspectRatio;
    }
    get imageCropSize() {
        return this.editor.imageCropSize;
    }
    get imageCropRectAspectRatio() {
        return this.editor.imageCropRectAspectRatio;
    }
    get imageFile() {
        return this.editor.imageFile;
    }
    get imageLoadState() {
        return this.editor.imageLoadState;
    }
    get imageProcessState() {
        return this.editor.imageProcessState;
    }
    get imageRotationRange() {
        return this.editor.imageRotationRange;
    }
    ngAfterViewInit() {
        this.element.nativeElement.classList.add('PinturaRootWrapper');
        // will block angular from listening to events inside the editor
        this.zone.runOutsideAngular(() => {
            // create editor instance
            this.editor = this.initEditor(this.element.nativeElement, Object.assign({}, 
            // deprecated options object
            this.options, 
            // new changes object
            this._initialChanges));
            // route events to component native element
            this.unsubs = dispatchEditorEvents(this.editor, this.element.nativeElement);
        });
        // route events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
            this.element.nativeElement.addEventListener(`pintura:${key}`, this.routeEvent);
        });
    }
    ngOnChanges(changes) {
        // turn into options object ready to be assigned to editor
        const options = Object.entries(changes).reduce((options, [prop, change]) => {
            options[prop] = change.currentValue;
            return options;
        }, {});
        // no editor yet, let's store the object for when the editor loads
        if (!this.editor) {
            this._initialChanges = options;
            return;
        }
        // an editor is active, let's assign the options to the editor
        Object.assign(this.editor, 
        // old options object
        this.options, 
        // new merged changes
        options);
    }
    ngOnDestroy() {
        this._initialChanges = undefined;
        if (!this.editor)
            return;
        this.editor.destroy();
        // unsubscribe
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];
        // unroute events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
            this.element.nativeElement.removeEventListener(`pintura:${key}`, this.routeEvent);
        });
        this.editor = undefined;
    }
    ngOnInit() {
        // Do nothing
    }
}
PinturaEditorAbstractComponent.decorators = [
    { type: Component, args: [{
                selector: 'pintura-editor',
                template: ` <ng-content></ng-content> `
            },] }
];
PinturaEditorAbstractComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
PinturaEditorAbstractComponent.propDecorators = {
    options: [{ type: Input }],
    id: [{ type: Input }],
    class: [{ type: Input }],
    animations: [{ type: Input }],
    src: [{ type: Input }],
    util: [{ type: Input }],
    utils: [{ type: Input }],
    disabled: [{ type: Input }],
    status: [{ type: Input }],
    elasticityMultiplier: [{ type: Input }],
    layoutDirectionPreference: [{ type: Input }],
    layoutVerticalUtilsPreference: [{ type: Input }],
    layoutHorizontalUtilsPreference: [{ type: Input }],
    imageSourceToImageData: [{ type: Input }],
    previewImageData: [{ type: Input }],
    previewImageDataMaxSize: [{ type: Input }],
    previewUpscale: [{ type: Input }],
    shapePreprocessor: [{ type: Input }],
    enableButtonClose: [{ type: Input }],
    enableButtonExport: [{ type: Input }],
    enableButtonResetHistory: [{ type: Input }],
    enableButtonRevert: [{ type: Input }],
    enableNavigateHistory: [{ type: Input }],
    enableToolbar: [{ type: Input }],
    enableUtils: [{ type: Input }],
    enableDropImage: [{ type: Input }],
    enablePasteImage: [{ type: Input }],
    handleEvent: [{ type: Input }],
    willRequestResource: [{ type: Input }],
    willClose: [{ type: Input }],
    willRevert: [{ type: Input }],
    willProcessImage: [{ type: Input }],
    willRenderCanvas: [{ type: Input }],
    willSetHistoryInitialState: [{ type: Input }],
    willRenderToolbar: [{ type: Input }],
    beforeSelectShape: [{ type: Input }],
    beforeDeselectShape: [{ type: Input }],
    beforeAddShape: [{ type: Input }],
    beforeRemoveShape: [{ type: Input }],
    beforeUpdateShape: [{ type: Input }],
    willRenderShapeControls: [{ type: Input }],
    willRenderShapePresetToolbar: [{ type: Input }],
    locale: [{ type: Input }],
    imageReader: [{ type: Input }],
    imageWriter: [{ type: Input }],
    imageOrienter: [{ type: Input }],
    imageScrambler: [{ type: Input }],
    imageBackgroundColor: [{ type: Input }],
    imageColorMatrix: [{ type: Input }],
    imageConvolutionMatrix: [{ type: Input }],
    imageCrop: [{ type: Input }],
    imageCropAspectRatio: [{ type: Input }],
    imageCropLimitToImage: [{ type: Input }],
    imageCropMaxSize: [{ type: Input }],
    imageCropMinSize: [{ type: Input }],
    imageRedaction: [{ type: Input }],
    imageAnnotation: [{ type: Input }],
    imageDecoration: [{ type: Input }],
    imageFlipX: [{ type: Input }],
    imageFlipY: [{ type: Input }],
    imageGamma: [{ type: Input }],
    imageNoise: [{ type: Input }],
    imageRotation: [{ type: Input }],
    imageVignette: [{ type: Input }],
    imageTargetSize: [{ type: Input }],
    imageFrame: [{ type: Input }],
    imageMetadata: [{ type: Input }],
    imageState: [{ type: Input }],
    markupEditorToolbar: [{ type: Input }],
    markupEditorToolStyles: [{ type: Input }],
    markupEditorShapeStyleControls: [{ type: Input }],
    markupEditorToolSelectRadius: [{ type: Input }],
    markupEditorTextInputMode: [{ type: Input }],
    enableSelectToolToAddShape: [{ type: Input }],
    enableTapToAddText: [{ type: Input }],
    enableZoom: [{ type: Input }],
    enablePan: [{ type: Input }],
    enableZoomControls: [{ type: Input }],
    markupEditorZoomLevels: [{ type: Input }],
    markupEditorZoomAdjustStep: [{ type: Input }],
    markupEditorZoomAdjustFactor: [{ type: Input }],
    markupEditorWillStartInteraction: [{ type: Input }],
    cropAutoCenterImageSelectionTimeout: [{ type: Input }],
    cropWillRenderImageSelectionGuides: [{ type: Input }],
    cropEnableButtonFlipHorizontal: [{ type: Input }],
    cropEnableButtonFlipVertical: [{ type: Input }],
    cropEnableButtonRotateLeft: [{ type: Input }],
    cropEnableButtonRotateRight: [{ type: Input }],
    cropEnableButtonToggleCropLimit: [{ type: Input }],
    cropEnableCenterImageSelection: [{ type: Input }],
    cropEnableImageSelection: [{ type: Input }],
    cropEnableInfoIndicator: [{ type: Input }],
    cropEnableLimitWheelInputToCropSelection: [{ type: Input }],
    cropEnableRotationInput: [{ type: Input }],
    cropEnableSelectPreset: [{ type: Input }],
    cropEnableZoomInput: [{ type: Input }],
    cropEnableZoomMatchImageAspectRatio: [{ type: Input }],
    cropEnableZoomTowardsWheelPosition: [{ type: Input }],
    cropEnableZoomAutoHide: [{ type: Input }],
    cropImageSelectionCornerStyle: [{ type: Input }],
    cropSelectPresetOptions: [{ type: Input }],
    cropEnableRotateMatchImageAspectRatio: [{ type: Input }],
    cropWillRenderTools: [{ type: Input }],
    annotateActiveTool: [{ type: Input }],
    annotateEnableButtonFlipVertical: [{ type: Input }],
    annotatePresets: [{ type: Input }],
    decorateActiveTool: [{ type: Input }],
    decorateEnableButtonFlipVertical: [{ type: Input }],
    decoratePresets: [{ type: Input }],
    filterFunctions: [{ type: Input }],
    filterOptions: [{ type: Input }],
    finetuneControlConfiguration: [{ type: Input }],
    finetuneOptions: [{ type: Input }],
    resizeMaxSize: [{ type: Input }],
    resizeMinSize: [{ type: Input }],
    resizeSizePresetOptions: [{ type: Input }],
    resizeWidthPresetOptions: [{ type: Input }],
    resizeHeightPresetOptions: [{ type: Input }],
    resizeWillRenderFooter: [{ type: Input }],
    frameStyles: [{ type: Input }],
    frameOptions: [{ type: Input }],
    stickers: [{ type: Input }],
    stickerStickToImage: [{ type: Input }],
    stickersEnableButtonFlipVertical: [{ type: Input }],
    init: [{ type: Output }],
    loadstart: [{ type: Output }],
    loadabort: [{ type: Output }],
    loaderror: [{ type: Output }],
    loadprogress: [{ type: Output }],
    load: [{ type: Output }],
    processstart: [{ type: Output }],
    processabort: [{ type: Output }],
    processerror: [{ type: Output }],
    processprogress: [{ type: Output }],
    process: [{ type: Output }],
    update: [{ type: Output }],
    undo: [{ type: Output }],
    redo: [{ type: Output }],
    revert: [{ type: Output }],
    destroy: [{ type: Output }],
    show: [{ type: Output }],
    hide: [{ type: Output }],
    close: [{ type: Output }],
    ready: [{ type: Output }],
    loadpreview: [{ type: Output }],
    addshape: [{ type: Output }],
    selectshape: [{ type: Output }],
    updateshape: [{ type: Output }],
    removeshape: [{ type: Output }],
    selectstyle: [{ type: Output }]
};

class PinturaEditorComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return appendEditor(element, props);
    }
}
PinturaEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'pintura-editor',
                template: ` <ng-content></ng-content> `
            },] }
];

class PinturaEditorModalComponent extends PinturaEditorAbstractComponent {
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

class PinturaEditorOverlayComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return overlayEditor(element, props);
    }
}
PinturaEditorOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'pintura-editor-overlay',
                template: ` <ng-content></ng-content> `
            },] }
];

class AngularPinturaModule {
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

/*
 * Public API Surface of angular-pintura
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularPinturaModule, PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent, PinturaEditorAbstractComponent as ɵa };
//# sourceMappingURL=pqina-angular-pintura.js.map
