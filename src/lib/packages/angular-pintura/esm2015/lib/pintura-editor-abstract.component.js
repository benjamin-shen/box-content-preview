import { Component, Input, Output, EventEmitter, ElementRef, NgZone, } from '@angular/core';
import { dispatchEditorEvents, } from '@pqina/pintura';
export class PinturaEditorAbstractComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGludHVyYS1lZGl0b3ItYWJzdHJhY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hbmd1bGFyLXBpbnR1cmEvcHJvamVjdHMvYW5ndWxhci1waW50dXJhL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9waW50dXJhLWVkaXRvci1hYnN0cmFjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFlSCxvQkFBb0IsR0FnQnZCLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsTUFBTSxPQUFnQiw4QkFBOEI7SUFzUWhELFlBQVksT0FBbUIsRUFBRSxJQUFZO1FBblFyQyxXQUFNLEdBQVksRUFBRSxDQUFDO1FBSzdCLDhDQUE4QztRQUNyQyxZQUFPLEdBQXlCLFNBQVMsQ0FBQztRQTBObkQsU0FBUztRQUNDLFNBQUksR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDdEUsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3pELGNBQVMsR0FBbUMsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDakYsY0FBUyxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNqRixpQkFBWSxHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNwRixTQUFJLEdBQ1YsSUFBSSxZQUFZLEVBQW1DLENBQUM7UUFDOUMsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM1RCxpQkFBWSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUN0RixpQkFBWSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUN0RixvQkFBZSxHQUNyQixJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNoQyxZQUFPLEdBQ2IsSUFBSSxZQUFZLEVBQW1DLENBQUM7UUFD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b0RBQ0wsS0FBSztrQ0FDTCxLQUFLO2lDQU1MLEtBQUs7K0NBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUVMLEtBQUs7K0NBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUVMLEtBQUs7NEJBQ0wsS0FBSzsyQ0FFTCxLQUFLOzhCQUNMLEtBQUs7NEJBRUwsS0FBSzs0QkFDTCxLQUFLO3NDQUNMLEtBQUs7dUNBQ0wsS0FBSzt3Q0FDTCxLQUFLO3FDQUNMLEtBQUs7MEJBTUwsS0FBSzsyQkFTTCxLQUFLO3VCQUVMLEtBQUs7a0NBQ0wsS0FBSzsrQ0FDTCxLQUFLO21CQUdMLE1BQU07d0JBQ04sTUFBTTt3QkFDTixNQUFNO3dCQUNOLE1BQU07MkJBQ04sTUFBTTttQkFDTixNQUFNOzJCQUVOLE1BQU07MkJBQ04sTUFBTTsyQkFDTixNQUFNOzhCQUNOLE1BQU07c0JBRU4sTUFBTTtxQkFFTixNQUFNO21CQUNOLE1BQU07bUJBQ04sTUFBTTtxQkFDTixNQUFNO3NCQUNOLE1BQU07bUJBQ04sTUFBTTttQkFDTixNQUFNO29CQUNOLE1BQU07b0JBQ04sTUFBTTswQkFDTixNQUFNO3VCQUdOLE1BQU07MEJBQ04sTUFBTTswQkFDTixNQUFNOzBCQUNOLE1BQU07MEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBOZ1pvbmUsXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEltYWdlU291cmNlLFxuICAgIFBpbnR1cmFFZGl0b3JPcHRpb25zLFxuICAgIFBpbnR1cmFFZGl0b3IsXG4gICAgUGludHVyYURlZmF1bHRJbWFnZVJlYWRlclJlc3VsdCxcbiAgICBQaW50dXJhRGVmYXVsdEltYWdlV3JpdGVyUmVzdWx0LFxuICAgIFBpbnR1cmFSZWFkU3RhdGUsXG4gICAgUGludHVyYVdyaXRlU3RhdGUsXG4gICAgUGludHVyYUltYWdlU3RhdGUsXG4gICAgUGludHVyYU5vZGUsXG4gICAgU3RpY2tlcixcbiAgICBQaW50dXJhRWRpdG9yU3RhdHVzLFxuICAgIFNpemUsXG4gICAgUmVjdCxcbiAgICBTaGFwZSxcbiAgICBkaXNwYXRjaEVkaXRvckV2ZW50cyxcbiAgICBDb2xvcixcbiAgICBDb2xvck1hdHJpeCxcbiAgICBDb252b2x1dGlvbk1hdHJpeCxcbiAgICBTaGFwZVJlY3RhbmdsZSxcbiAgICBQaW50dXJhTWV0YWRhdGEsXG4gICAgT3B0aW9uR3JvdXAsXG4gICAgQ3JvcFByZXNldE9wdGlvbixcbiAgICBTdGlja2VyR3JvdXAsXG4gICAgRWZmZWN0LFxuICAgIFNpemVPcHRpb24sXG4gICAgTG9jYWxlU3RyaW5nLFxuICAgIE1hcmt1cEVkaXRvclRvb2xTdHlsZURlZmF1bHRzLFxuICAgIE1hcmt1cEVkaXRvclNoYXBlU3R5bGVDb250cm9sRGVmYXVsdHMsXG4gICAgVmVjdG9yLFxuICAgIEZpbHRlcixcbn0gZnJvbSAnQHBxaW5hL3BpbnR1cmEnO1xuXG50eXBlIFVuc3ViID0gKCkgPT4gdm9pZDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwaW50dXJhLWVkaXRvcicsXG4gICAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICAgIHN0eWxlczogW10sXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBpbnR1cmFFZGl0b3JBYnN0cmFjdENvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZTtcbiAgICBwcml2YXRlIHVuc3ViczogVW5zdWJbXSA9IFtdO1xuXG4gICAgLy8gQSByZWZlcmVuY2UgdG8gdGhlIGVkaXRvciBKYXZhU2NyaXB0IGluc3RhbmNlXG4gICAgcHVibGljIGVkaXRvcjogUGludHVyYUVkaXRvcjtcblxuICAgIC8vIEEgc2hvcnRjdXQgdG8gYXNzaWduIG11bHRpcGxlIHByb3BzIGF0IG9uY2VcbiAgICBASW5wdXQoKSBvcHRpb25zOiBQaW50dXJhRWRpdG9yT3B0aW9ucyA9IHVuZGVmaW5lZDtcblxuICAgIC8vIElucHV0c1xuICAgIEBJbnB1dCgpIGlkPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsYXNzPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFuaW1hdGlvbnM/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNyYz86IEltYWdlU291cmNlO1xuICAgIEBJbnB1dCgpIHV0aWw/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdXRpbHM/OiBzdHJpbmdbXTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgQElucHV0KCkgc3RhdHVzPzogUGludHVyYUVkaXRvclN0YXR1cztcbiAgICBASW5wdXQoKSBlbGFzdGljaXR5TXVsdGlwbGllcj86IG51bWJlcjtcbiAgICBASW5wdXQoKSBsYXlvdXREaXJlY3Rpb25QcmVmZXJlbmNlPzogJ2F1dG8nIHwgJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcbiAgICBASW5wdXQoKSBsYXlvdXRWZXJ0aWNhbFV0aWxzUHJlZmVyZW5jZT86ICdsZWZ0JyB8ICdyaWdodCc7XG4gICAgQElucHV0KCkgbGF5b3V0SG9yaXpvbnRhbFV0aWxzUHJlZmVyZW5jZT86ICdib3R0b20nIHwgJ3RvcCc7XG4gICAgQElucHV0KCkgaW1hZ2VTb3VyY2VUb0ltYWdlRGF0YT86IChzcmM6IGFueSkgPT4gUHJvbWlzZTxJbWFnZURhdGE+O1xuICAgIEBJbnB1dCgpIHByZXZpZXdJbWFnZURhdGE/OiBJbWFnZUJpdG1hcCB8IEltYWdlRGF0YSB8IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIEBJbnB1dCgpIHByZXZpZXdJbWFnZURhdGFNYXhTaXplPzogU2l6ZTtcbiAgICBASW5wdXQoKSBwcmV2aWV3VXBzY2FsZT86IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hhcGVQcmVwcm9jZXNzb3I/OiBhbnk7XG4gICAgQElucHV0KCkgZW5hYmxlQnV0dG9uQ2xvc2U/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVuYWJsZUJ1dHRvbkV4cG9ydD86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZW5hYmxlQnV0dG9uUmVzZXRIaXN0b3J5PzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBlbmFibGVCdXR0b25SZXZlcnQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVuYWJsZU5hdmlnYXRlSGlzdG9yeT86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZW5hYmxlVG9vbGJhcj86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZW5hYmxlVXRpbHM/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVuYWJsZURyb3BJbWFnZT86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZW5hYmxlUGFzdGVJbWFnZT86IGJvb2xlYW47XG4gICAgQElucHV0KCkgaGFuZGxlRXZlbnQ/OiAodHlwZTogc3RyaW5nLCBkZXRhaWw6IGFueSkgPT4gdm9pZDtcbiAgICBASW5wdXQoKSB3aWxsUmVxdWVzdFJlc291cmNlPzogKHVybDogc3RyaW5nKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHdpbGxDbG9zZT86ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gICAgQElucHV0KCkgd2lsbFJldmVydD86ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gICAgQElucHV0KCkgd2lsbFByb2Nlc3NJbWFnZT86ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gICAgQElucHV0KCkgd2lsbFJlbmRlckNhbnZhcz86IChcbiAgICAgICAgc2hhcGVzOiB7XG4gICAgICAgICAgICBkZWNvcmF0aW9uU2hhcGVzOiBTaGFwZVtdO1xuICAgICAgICAgICAgYW5ub3RhdGlvblNoYXBlczogU2hhcGVbXTtcbiAgICAgICAgICAgIGludGVyZmFjZVNoYXBlczogU2hhcGVbXTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGU6IGFueVxuICAgICkgPT4ge1xuICAgICAgICBkZWNvcmF0aW9uU2hhcGVzOiBTaGFwZVtdO1xuICAgICAgICBhbm5vdGF0aW9uU2hhcGVzOiBTaGFwZVtdO1xuICAgICAgICBpbnRlcmZhY2VTaGFwZXM6IFNoYXBlW107XG4gICAgfTtcbiAgICBASW5wdXQoKSB3aWxsU2V0SGlzdG9yeUluaXRpYWxTdGF0ZT86IChpbml0aWFsU3RhdGU6IGFueSkgPT4gYW55O1xuICAgIEBJbnB1dCgpIHdpbGxSZW5kZXJUb29sYmFyPzogKFxuICAgICAgICBub2RlczogUGludHVyYU5vZGVbXSxcbiAgICAgICAgZW52OiBhbnksXG4gICAgICAgIHJlZHJhdzogKCkgPT4gdm9pZFxuICAgICkgPT4gUGludHVyYU5vZGVbXTtcbiAgICBASW5wdXQoKSBiZWZvcmVTZWxlY3RTaGFwZT86IChjdXJyZW50OiBTaGFwZSB8IHVuZGVmaW5lZCwgdGFyZ2V0OiBTaGFwZSkgPT4gYm9vbGVhbjtcbiAgICBASW5wdXQoKSBiZWZvcmVEZXNlbGVjdFNoYXBlPzogKGN1cnJlbnQ6IFNoYXBlLCB0YXJnZXQ6IFNoYXBlIHwgdW5kZWZpbmVkKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGJlZm9yZUFkZFNoYXBlPzogKHNoYXBlOiBTaGFwZSkgPT4gYm9vbGVhbjtcbiAgICBASW5wdXQoKSBiZWZvcmVSZW1vdmVTaGFwZT86IChzaGFwZTogU2hhcGUpID0+IGJvb2xlYW47XG4gICAgQElucHV0KCkgYmVmb3JlVXBkYXRlU2hhcGU/OiAoc2hhcGU6IFNoYXBlLCBwcm9wczogYW55LCBjb250ZXh0OiBSZWN0KSA9PiBTaGFwZTtcbiAgICBASW5wdXQoKSB3aWxsUmVuZGVyU2hhcGVDb250cm9scz86IChub2RlczogUGludHVyYU5vZGVbXSwgc2hhcGVJZDogc3RyaW5nKSA9PiBQaW50dXJhTm9kZVtdO1xuICAgIEBJbnB1dCgpIHdpbGxSZW5kZXJTaGFwZVByZXNldFRvb2xiYXI/OiAoXG4gICAgICAgIG5vZGVzOiBQaW50dXJhTm9kZVtdLFxuICAgICAgICBhZGRQcmVzZXQ6IChzdGlja2VyOiBTdGlja2VyKSA9PiB2b2lkLFxuICAgICAgICBlbnY6IGFueSxcbiAgICAgICAgcmVkcmF3OiAoKSA9PiB2b2lkXG4gICAgKSA9PiBQaW50dXJhTm9kZVtdO1xuXG4gICAgQElucHV0KCkgbG9jYWxlOiBhbnk7XG4gICAgQElucHV0KCkgaW1hZ2VSZWFkZXI6IGFueVtdO1xuICAgIEBJbnB1dCgpIGltYWdlV3JpdGVyPzogYW55W107XG4gICAgQElucHV0KCkgaW1hZ2VPcmllbnRlcj86IGFueTtcbiAgICBASW5wdXQoKSBpbWFnZVNjcmFtYmxlcj86IGFueTtcblxuICAgIC8vIEltYWdlIHByb3BzXG4gICAgQElucHV0KCkgaW1hZ2VCYWNrZ3JvdW5kQ29sb3I/OiBDb2xvcjtcbiAgICBASW5wdXQoKSBpbWFnZUNvbG9yTWF0cml4PzogQ29sb3JNYXRyaXg7XG4gICAgQElucHV0KCkgaW1hZ2VDb252b2x1dGlvbk1hdHJpeD86IENvbnZvbHV0aW9uTWF0cml4O1xuICAgIEBJbnB1dCgpIGltYWdlQ3JvcD86IFJlY3Q7XG4gICAgQElucHV0KCkgaW1hZ2VDcm9wQXNwZWN0UmF0aW8/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgQElucHV0KCkgaW1hZ2VDcm9wTGltaXRUb0ltYWdlPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBpbWFnZUNyb3BNYXhTaXplPzogU2l6ZTtcbiAgICBASW5wdXQoKSBpbWFnZUNyb3BNaW5TaXplPzogU2l6ZTtcbiAgICBASW5wdXQoKSBpbWFnZVJlZGFjdGlvbj86IFNoYXBlUmVjdGFuZ2xlW107XG4gICAgQElucHV0KCkgaW1hZ2VBbm5vdGF0aW9uPzogU2hhcGVbXTtcbiAgICBASW5wdXQoKSBpbWFnZURlY29yYXRpb24/OiBTaGFwZVtdO1xuICAgIEBJbnB1dCgpIGltYWdlRmxpcFg/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGltYWdlRmxpcFk/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGltYWdlR2FtbWE/OiBudW1iZXI7XG4gICAgQElucHV0KCkgaW1hZ2VOb2lzZT86IG51bWJlcjtcbiAgICBASW5wdXQoKSBpbWFnZVJvdGF0aW9uPzogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGltYWdlVmlnbmV0dGU/OiBudW1iZXI7XG4gICAgQElucHV0KCkgaW1hZ2VUYXJnZXRTaXplPzogU2l6ZTtcbiAgICBASW5wdXQoKSBpbWFnZUZyYW1lPzpcbiAgICAgICAgfCBzdHJpbmdcbiAgICAgICAgfCB7XG4gICAgICAgICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICAgICAgICAgICAgZnJhbWVTdHlsZTogc3RyaW5nO1xuICAgICAgICAgIH07XG4gICAgQElucHV0KCkgaW1hZ2VNZXRhZGF0YT86IFBpbnR1cmFNZXRhZGF0YTtcbiAgICBASW5wdXQoKSBpbWFnZVN0YXRlPzogYW55O1xuXG4gICAgZ2V0IGltYWdlU2l6ZSgpOiBTaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmltYWdlU2l6ZTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuaW1hZ2VBc3BlY3RSYXRpbztcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VDcm9wU2l6ZSgpOiBTaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmltYWdlQ3JvcFNpemU7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlQ3JvcFJlY3RBc3BlY3RSYXRpbygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuaW1hZ2VDcm9wUmVjdEFzcGVjdFJhdGlvO1xuICAgIH1cblxuICAgIGdldCBpbWFnZUZpbGUoKTogRmlsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5pbWFnZUZpbGU7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlTG9hZFN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5pbWFnZUxvYWRTdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VQcm9jZXNzU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmltYWdlUHJvY2Vzc1N0YXRlO1xuICAgIH1cblxuICAgIGdldCBpbWFnZVJvdGF0aW9uUmFuZ2UoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5pbWFnZVJvdGF0aW9uUmFuZ2U7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbWFya3VwRWRpdG9yVG9vbGJhcj86IFtzdHJpbmcsIExvY2FsZVN0cmluZywgYW55XVtdO1xuICAgIEBJbnB1dCgpIG1hcmt1cEVkaXRvclRvb2xTdHlsZXM/OiBNYXJrdXBFZGl0b3JUb29sU3R5bGVEZWZhdWx0cztcbiAgICBASW5wdXQoKSBtYXJrdXBFZGl0b3JTaGFwZVN0eWxlQ29udHJvbHM/OiBNYXJrdXBFZGl0b3JTaGFwZVN0eWxlQ29udHJvbERlZmF1bHRzO1xuICAgIEBJbnB1dCgpIG1hcmt1cEVkaXRvclRvb2xTZWxlY3RSYWRpdXM/OiBudW1iZXI7XG4gICAgQElucHV0KCkgbWFya3VwRWRpdG9yVGV4dElucHV0TW9kZT86ICdtb2RhbCcgfCAnaW5saW5lJztcbiAgICBASW5wdXQoKSBlbmFibGVTZWxlY3RUb29sVG9BZGRTaGFwZT86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZW5hYmxlVGFwVG9BZGRUZXh0PzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBlbmFibGVab29tPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBlbmFibGVQYW4/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGVuYWJsZVpvb21Db250cm9scz86IGJvb2xlYW47XG4gICAgQElucHV0KCkgbWFya3VwRWRpdG9yWm9vbUxldmVscz86IG51bWJlcltdO1xuICAgIEBJbnB1dCgpIG1hcmt1cEVkaXRvclpvb21BZGp1c3RTdGVwPzogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1hcmt1cEVkaXRvclpvb21BZGp1c3RGYWN0b3I/OiBudW1iZXI7XG4gICAgQElucHV0KCkgbWFya3VwRWRpdG9yV2lsbFN0YXJ0SW50ZXJhY3Rpb24/OiAocG9pbnQ6IFZlY3RvciwgaW1hZ2U6IFJlY3QpID0+IGJvb2xlYW47XG5cbiAgICAvLyBQbHVnaW4gcHJvcHNcbiAgICBASW5wdXQoKSBjcm9wQXV0b0NlbnRlckltYWdlU2VsZWN0aW9uVGltZW91dD86IHVuZGVmaW5lZCB8IG51bWJlcjtcbiAgICBASW5wdXQoKSBjcm9wV2lsbFJlbmRlckltYWdlU2VsZWN0aW9uR3VpZGVzPzpcbiAgICAgICAgfCB1bmRlZmluZWRcbiAgICAgICAgfCAoKFxuICAgICAgICAgICAgICBpbnRlcmFjdGlvbjogc3RyaW5nLFxuICAgICAgICAgICAgICBpbnRlcmFjdGlvbkZyYWN0aW9uOiBudW1iZXJcbiAgICAgICAgICApID0+IHsgcm93czogbnVtYmVyOyBjb2xzOiBudW1iZXI7IG9wYWNpdHk6IG51bWJlciB9KTtcbiAgICBASW5wdXQoKSBjcm9wRW5hYmxlQnV0dG9uRmxpcEhvcml6b250YWw/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVCdXR0b25GbGlwVmVydGljYWw/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVCdXR0b25Sb3RhdGVMZWZ0PzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjcm9wRW5hYmxlQnV0dG9uUm90YXRlUmlnaHQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVCdXR0b25Ub2dnbGVDcm9wTGltaXQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVDZW50ZXJJbWFnZVNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgQElucHV0KCkgY3JvcEVuYWJsZUltYWdlU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjcm9wRW5hYmxlSW5mb0luZGljYXRvcj86IGJvb2xlYW47XG4gICAgQElucHV0KCkgY3JvcEVuYWJsZUxpbWl0V2hlZWxJbnB1dFRvQ3JvcFNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgQElucHV0KCkgY3JvcEVuYWJsZVJvdGF0aW9uSW5wdXQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVTZWxlY3RQcmVzZXQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVab29tSW5wdXQ/OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGNyb3BFbmFibGVab29tTWF0Y2hJbWFnZUFzcGVjdFJhdGlvPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjcm9wRW5hYmxlWm9vbVRvd2FyZHNXaGVlbFBvc2l0aW9uPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjcm9wRW5hYmxlWm9vbUF1dG9IaWRlPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjcm9wSW1hZ2VTZWxlY3Rpb25Db3JuZXJTdHlsZT86IHVuZGVmaW5lZCB8ICdob29rJyB8ICdyb3VuZCcgfCAnaW52aXNpYmxlJztcbiAgICBASW5wdXQoKSBjcm9wU2VsZWN0UHJlc2V0T3B0aW9ucz86IE9wdGlvbkdyb3VwW10gfCBDcm9wUHJlc2V0T3B0aW9uW107XG4gICAgQElucHV0KCkgY3JvcEVuYWJsZVJvdGF0ZU1hdGNoSW1hZ2VBc3BlY3RSYXRpbz86ICduZXZlcicgfCAnY3VzdG9tJyB8ICdhbHdheXMnO1xuICAgIEBJbnB1dCgpIGNyb3BXaWxsUmVuZGVyVG9vbHM/OiAoXG4gICAgICAgIG5vZGVzOiBQaW50dXJhTm9kZVtdLFxuICAgICAgICBlbnY6IGFueSxcbiAgICAgICAgcmVkcmF3OiAoKSA9PiB2b2lkXG4gICAgKSA9PiBQaW50dXJhTm9kZVtdO1xuXG4gICAgQElucHV0KCkgYW5ub3RhdGVBY3RpdmVUb29sPzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFubm90YXRlRW5hYmxlQnV0dG9uRmxpcFZlcnRpY2FsPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhbm5vdGF0ZVByZXNldHM/OiBTdGlja2VyW10gfCBTdGlja2VyR3JvdXBbXTtcblxuICAgIEBJbnB1dCgpIGRlY29yYXRlQWN0aXZlVG9vbD86IHN0cmluZztcbiAgICBASW5wdXQoKSBkZWNvcmF0ZUVuYWJsZUJ1dHRvbkZsaXBWZXJ0aWNhbD86IGJvb2xlYW47XG4gICAgQElucHV0KCkgZGVjb3JhdGVQcmVzZXRzPzogU3RpY2tlcltdIHwgU3RpY2tlckdyb3VwW107XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJGdW5jdGlvbnM/OiB7IFtrZXk6IHN0cmluZ106IEZpbHRlciB9O1xuICAgIEBJbnB1dCgpIGZpbHRlck9wdGlvbnM/OiBhbnk7XG5cbiAgICBASW5wdXQoKSBmaW5ldHVuZUNvbnRyb2xDb25maWd1cmF0aW9uPzogeyBba2V5OiBzdHJpbmddOiBFZmZlY3QgfTtcbiAgICBASW5wdXQoKSBmaW5ldHVuZU9wdGlvbnM/OiBbc3RyaW5nIHwgdW5kZWZpbmVkLCBMb2NhbGVTdHJpbmddO1xuXG4gICAgQElucHV0KCkgcmVzaXplTWF4U2l6ZT86IFNpemU7XG4gICAgQElucHV0KCkgcmVzaXplTWluU2l6ZT86IFNpemU7XG4gICAgQElucHV0KCkgcmVzaXplU2l6ZVByZXNldE9wdGlvbnM/OiBPcHRpb25Hcm91cFtdIHwgU2l6ZU9wdGlvbltdO1xuICAgIEBJbnB1dCgpIHJlc2l6ZVdpZHRoUHJlc2V0T3B0aW9ucz86IE9wdGlvbkdyb3VwW10gfCBTaXplT3B0aW9uW107XG4gICAgQElucHV0KCkgcmVzaXplSGVpZ2h0UHJlc2V0T3B0aW9ucz86IE9wdGlvbkdyb3VwW10gfCBTaXplT3B0aW9uW107XG4gICAgQElucHV0KCkgcmVzaXplV2lsbFJlbmRlckZvb3Rlcj86IChcbiAgICAgICAgbm9kZXM6IFBpbnR1cmFOb2RlW10sXG4gICAgICAgIGVudjogYW55LFxuICAgICAgICByZWRyYXc6ICgpID0+IHZvaWRcbiAgICApID0+IFBpbnR1cmFOb2RlW107XG5cbiAgICBASW5wdXQoKSBmcmFtZVN0eWxlcz86IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICBmcmFtZVN0eWxlOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRodW1iOiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBASW5wdXQoKSBmcmFtZU9wdGlvbnM/OiBbc3RyaW5nIHwgdW5kZWZpbmVkLCBMb2NhbGVTdHJpbmddO1xuXG4gICAgQElucHV0KCkgc3RpY2tlcnM/OiBTdGlja2VyW10gfCBTdGlja2VyR3JvdXBbXTtcbiAgICBASW5wdXQoKSBzdGlja2VyU3RpY2tUb0ltYWdlPzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzdGlja2Vyc0VuYWJsZUJ1dHRvbkZsaXBWZXJ0aWNhbD86IGJvb2xlYW47XG5cbiAgICAvLyBFdmVudHNcbiAgICBAT3V0cHV0KCkgaW5pdDogRXZlbnRFbWl0dGVyPFBpbnR1cmFFZGl0b3I+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhRWRpdG9yPigpO1xuICAgIEBPdXRwdXQoKSBsb2Fkc3RhcnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgbG9hZGFib3J0OiBFdmVudEVtaXR0ZXI8UGludHVyYVJlYWRTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpbnR1cmFSZWFkU3RhdGU+KCk7XG4gICAgQE91dHB1dCgpIGxvYWRlcnJvcjogRXZlbnRFbWl0dGVyPFBpbnR1cmFSZWFkU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhUmVhZFN0YXRlPigpO1xuICAgIEBPdXRwdXQoKSBsb2FkcHJvZ3Jlc3M6IEV2ZW50RW1pdHRlcjxQaW50dXJhUmVhZFN0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGludHVyYVJlYWRTdGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgbG9hZDogRXZlbnRFbWl0dGVyPFBpbnR1cmFEZWZhdWx0SW1hZ2VSZWFkZXJSZXN1bHQ+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhRGVmYXVsdEltYWdlUmVhZGVyUmVzdWx0PigpO1xuICAgIEBPdXRwdXQoKSBwcm9jZXNzc3RhcnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgcHJvY2Vzc2Fib3J0OiBFdmVudEVtaXR0ZXI8UGludHVyYVdyaXRlU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhV3JpdGVTdGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHJvY2Vzc2Vycm9yOiBFdmVudEVtaXR0ZXI8UGludHVyYVdyaXRlU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhV3JpdGVTdGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHJvY2Vzc3Byb2dyZXNzOiBFdmVudEVtaXR0ZXI8UGludHVyYVdyaXRlU3RhdGU+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhV3JpdGVTdGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHJvY2VzczogRXZlbnRFbWl0dGVyPFBpbnR1cmFEZWZhdWx0SW1hZ2VXcml0ZXJSZXN1bHQ+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxQaW50dXJhRGVmYXVsdEltYWdlV3JpdGVyUmVzdWx0PigpO1xuICAgIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjxQaW50dXJhSW1hZ2VTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpbnR1cmFJbWFnZVN0YXRlPigpO1xuICAgIEBPdXRwdXQoKSB1bmRvOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSByZWRvOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSByZXZlcnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgZGVzdHJveTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzaG93OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIGhpZGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgcmVhZHk6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgbG9hZHByZXZpZXc6IEV2ZW50RW1pdHRlcjxJbWFnZURhdGEgfCBJbWFnZUJpdG1hcD4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgICAgICBJbWFnZURhdGEgfCBJbWFnZUJpdG1hcFxuICAgID4oKTtcbiAgICBAT3V0cHV0KCkgYWRkc2hhcGU6IEV2ZW50RW1pdHRlcjxTaGFwZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNoYXBlPigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RzaGFwZTogRXZlbnRFbWl0dGVyPFNoYXBlPiA9IG5ldyBFdmVudEVtaXR0ZXI8U2hhcGU+KCk7XG4gICAgQE91dHB1dCgpIHVwZGF0ZXNoYXBlOiBFdmVudEVtaXR0ZXI8U2hhcGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxTaGFwZT4oKTtcbiAgICBAT3V0cHV0KCkgcmVtb3Zlc2hhcGU6IEV2ZW50RW1pdHRlcjxTaGFwZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNoYXBlPigpO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RzdHlsZTogRXZlbnRFbWl0dGVyPHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH0+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCB6b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy56b25lID0gem9uZTtcbiAgICB9XG5cbiAgICAvLyBFdmVudEhhbmRsZXJOb25OdWxsXG4gICAgcHJpdmF0ZSByb3V0ZUV2ZW50ID0gKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzW2UudHlwZS5zcGxpdCgnOicpWzFdXTtcbiAgICAgICAgaWYgKCFlbWl0dGVyKSByZXR1cm47XG4gICAgICAgIGVtaXR0ZXIuZW1pdChlLmRldGFpbCk7XG4gICAgfTtcblxuICAgIGFic3RyYWN0IGluaXRFZGl0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIHByb3BzOiBQaW50dXJhRWRpdG9yT3B0aW9ucyk6IFBpbnR1cmFFZGl0b3I7XG5cbiAgICBwcml2YXRlIF9pbml0aWFsQ2hhbmdlcyA9IHt9O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdQaW50dXJhUm9vdFdyYXBwZXInKTtcblxuICAgICAgICAvLyB3aWxsIGJsb2NrIGFuZ3VsYXIgZnJvbSBsaXN0ZW5pbmcgdG8gZXZlbnRzIGluc2lkZSB0aGUgZWRpdG9yXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgZWRpdG9yIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLmVkaXRvciA9IHRoaXMuaW5pdEVkaXRvcihcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVwcmVjYXRlZCBvcHRpb25zIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbmV3IGNoYW5nZXMgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxDaGFuZ2VzXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gcm91dGUgZXZlbnRzIHRvIGNvbXBvbmVudCBuYXRpdmUgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy51bnN1YnMgPSBkaXNwYXRjaEVkaXRvckV2ZW50cyh0aGlzLmVkaXRvciwgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyByb3V0ZSBldmVudHNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcylcbiAgICAgICAgICAgIC5maWx0ZXIoKGtleSkgPT4gdGhpc1trZXldIGluc3RhbmNlb2YgRXZlbnRFbWl0dGVyKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYHBpbnR1cmE6JHtrZXl9YCwgdGhpcy5yb3V0ZUV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgLy8gdHVybiBpbnRvIG9wdGlvbnMgb2JqZWN0IHJlYWR5IHRvIGJlIGFzc2lnbmVkIHRvIGVkaXRvclxuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmVudHJpZXMoY2hhbmdlcykucmVkdWNlKChvcHRpb25zLCBbcHJvcCwgY2hhbmdlXSkgPT4ge1xuICAgICAgICAgICAgb3B0aW9uc1twcm9wXSA9IGNoYW5nZS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIC8vIG5vIGVkaXRvciB5ZXQsIGxldCdzIHN0b3JlIHRoZSBvYmplY3QgZm9yIHdoZW4gdGhlIGVkaXRvciBsb2Fkc1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsQ2hhbmdlcyA9IG9wdGlvbnM7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbiBlZGl0b3IgaXMgYWN0aXZlLCBsZXQncyBhc3NpZ24gdGhlIG9wdGlvbnMgdG8gdGhlIGVkaXRvclxuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5lZGl0b3IsXG5cbiAgICAgICAgICAgIC8vIG9sZCBvcHRpb25zIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLFxuXG4gICAgICAgICAgICAvLyBuZXcgbWVyZ2VkIGNoYW5nZXNcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5pdGlhbENoYW5nZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvcikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yLmRlc3Ryb3koKTtcblxuICAgICAgICAvLyB1bnN1YnNjcmliZVxuICAgICAgICB0aGlzLnVuc3Vicy5mb3JFYWNoKCh1bnN1YikgPT4gdW5zdWIoKSk7XG4gICAgICAgIHRoaXMudW5zdWJzID0gW107XG5cbiAgICAgICAgLy8gdW5yb3V0ZSBldmVudHNcbiAgICAgICAgT2JqZWN0LmtleXModGhpcylcbiAgICAgICAgICAgIC5maWx0ZXIoKGtleSkgPT4gdGhpc1trZXldIGluc3RhbmNlb2YgRXZlbnRFbWl0dGVyKVxuICAgICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYHBpbnR1cmE6JHtrZXl9YCwgdGhpcy5yb3V0ZUV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBEbyBub3RoaW5nXG4gICAgfVxufVxuIl19