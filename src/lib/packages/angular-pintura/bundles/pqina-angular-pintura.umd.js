(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@pqina/pintura')) :
    typeof define === 'function' && define.amd ? define('@pqina/angular-pintura', ['exports', '@angular/core', '@pqina/pintura'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pqina = global.pqina || {}, global.pqina['angular-pintura'] = {}), global.ng.core, global['@pqina/pintura']));
}(this, (function (exports, core, pintura) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var PinturaEditorAbstractComponent = /** @class */ (function () {
        function PinturaEditorAbstractComponent(element, zone) {
            var _this = this;
            this.unsubs = [];
            // A shortcut to assign multiple props at once
            this.options = undefined;
            // Events
            this.init = new core.EventEmitter();
            this.loadstart = new core.EventEmitter();
            this.loadabort = new core.EventEmitter();
            this.loaderror = new core.EventEmitter();
            this.loadprogress = new core.EventEmitter();
            this.load = new core.EventEmitter();
            this.processstart = new core.EventEmitter();
            this.processabort = new core.EventEmitter();
            this.processerror = new core.EventEmitter();
            this.processprogress = new core.EventEmitter();
            this.process = new core.EventEmitter();
            this.update = new core.EventEmitter();
            this.undo = new core.EventEmitter();
            this.redo = new core.EventEmitter();
            this.revert = new core.EventEmitter();
            this.destroy = new core.EventEmitter();
            this.show = new core.EventEmitter();
            this.hide = new core.EventEmitter();
            this.close = new core.EventEmitter();
            this.ready = new core.EventEmitter();
            this.loadpreview = new core.EventEmitter();
            this.addshape = new core.EventEmitter();
            this.selectshape = new core.EventEmitter();
            this.updateshape = new core.EventEmitter();
            this.removeshape = new core.EventEmitter();
            this.selectstyle = new core.EventEmitter();
            // EventHandlerNonNull
            this.routeEvent = function (e) {
                var emitter = _this[e.type.split(':')[1]];
                if (!emitter)
                    return;
                emitter.emit(e.detail);
            };
            this._initialChanges = {};
            this.element = element;
            this.zone = zone;
        }
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageSize", {
            get: function () {
                return this.editor.imageSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageAspectRatio", {
            get: function () {
                return this.editor.imageAspectRatio;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageCropSize", {
            get: function () {
                return this.editor.imageCropSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageCropRectAspectRatio", {
            get: function () {
                return this.editor.imageCropRectAspectRatio;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageFile", {
            get: function () {
                return this.editor.imageFile;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageLoadState", {
            get: function () {
                return this.editor.imageLoadState;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageProcessState", {
            get: function () {
                return this.editor.imageProcessState;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PinturaEditorAbstractComponent.prototype, "imageRotationRange", {
            get: function () {
                return this.editor.imageRotationRange;
            },
            enumerable: false,
            configurable: true
        });
        PinturaEditorAbstractComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.element.nativeElement.classList.add('PinturaRootWrapper');
            // will block angular from listening to events inside the editor
            this.zone.runOutsideAngular(function () {
                // create editor instance
                _this.editor = _this.initEditor(_this.element.nativeElement, Object.assign({}, 
                // deprecated options object
                _this.options, 
                // new changes object
                _this._initialChanges));
                // route events to component native element
                _this.unsubs = pintura.dispatchEditorEvents(_this.editor, _this.element.nativeElement);
            });
            // route events
            Object.keys(this)
                .filter(function (key) { return _this[key] instanceof core.EventEmitter; })
                .forEach(function (key) {
                _this.element.nativeElement.addEventListener("pintura:" + key, _this.routeEvent);
            });
        };
        PinturaEditorAbstractComponent.prototype.ngOnChanges = function (changes) {
            // turn into options object ready to be assigned to editor
            var options = Object.entries(changes).reduce(function (options, _a) {
                var _b = __read(_a, 2), prop = _b[0], change = _b[1];
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
        };
        PinturaEditorAbstractComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            this._initialChanges = undefined;
            if (!this.editor)
                return;
            this.editor.destroy();
            // unsubscribe
            this.unsubs.forEach(function (unsub) { return unsub(); });
            this.unsubs = [];
            // unroute events
            Object.keys(this)
                .filter(function (key) { return _this[key] instanceof core.EventEmitter; })
                .forEach(function (key) {
                _this.element.nativeElement.removeEventListener("pintura:" + key, _this.routeEvent);
            });
            this.editor = undefined;
        };
        PinturaEditorAbstractComponent.prototype.ngOnInit = function () {
            // Do nothing
        };
        return PinturaEditorAbstractComponent;
    }());
    PinturaEditorAbstractComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'pintura-editor',
                    template: " <ng-content></ng-content> "
                },] }
    ];
    PinturaEditorAbstractComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    PinturaEditorAbstractComponent.propDecorators = {
        options: [{ type: core.Input }],
        id: [{ type: core.Input }],
        class: [{ type: core.Input }],
        animations: [{ type: core.Input }],
        src: [{ type: core.Input }],
        util: [{ type: core.Input }],
        utils: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        status: [{ type: core.Input }],
        elasticityMultiplier: [{ type: core.Input }],
        layoutDirectionPreference: [{ type: core.Input }],
        layoutVerticalUtilsPreference: [{ type: core.Input }],
        layoutHorizontalUtilsPreference: [{ type: core.Input }],
        imageSourceToImageData: [{ type: core.Input }],
        previewImageData: [{ type: core.Input }],
        previewImageDataMaxSize: [{ type: core.Input }],
        previewUpscale: [{ type: core.Input }],
        shapePreprocessor: [{ type: core.Input }],
        enableButtonClose: [{ type: core.Input }],
        enableButtonExport: [{ type: core.Input }],
        enableButtonResetHistory: [{ type: core.Input }],
        enableButtonRevert: [{ type: core.Input }],
        enableNavigateHistory: [{ type: core.Input }],
        enableToolbar: [{ type: core.Input }],
        enableUtils: [{ type: core.Input }],
        enableDropImage: [{ type: core.Input }],
        enablePasteImage: [{ type: core.Input }],
        handleEvent: [{ type: core.Input }],
        willRequestResource: [{ type: core.Input }],
        willClose: [{ type: core.Input }],
        willRevert: [{ type: core.Input }],
        willProcessImage: [{ type: core.Input }],
        willRenderCanvas: [{ type: core.Input }],
        willSetHistoryInitialState: [{ type: core.Input }],
        willRenderToolbar: [{ type: core.Input }],
        beforeSelectShape: [{ type: core.Input }],
        beforeDeselectShape: [{ type: core.Input }],
        beforeAddShape: [{ type: core.Input }],
        beforeRemoveShape: [{ type: core.Input }],
        beforeUpdateShape: [{ type: core.Input }],
        willRenderShapeControls: [{ type: core.Input }],
        willRenderShapePresetToolbar: [{ type: core.Input }],
        locale: [{ type: core.Input }],
        imageReader: [{ type: core.Input }],
        imageWriter: [{ type: core.Input }],
        imageOrienter: [{ type: core.Input }],
        imageScrambler: [{ type: core.Input }],
        imageBackgroundColor: [{ type: core.Input }],
        imageColorMatrix: [{ type: core.Input }],
        imageConvolutionMatrix: [{ type: core.Input }],
        imageCrop: [{ type: core.Input }],
        imageCropAspectRatio: [{ type: core.Input }],
        imageCropLimitToImage: [{ type: core.Input }],
        imageCropMaxSize: [{ type: core.Input }],
        imageCropMinSize: [{ type: core.Input }],
        imageRedaction: [{ type: core.Input }],
        imageAnnotation: [{ type: core.Input }],
        imageDecoration: [{ type: core.Input }],
        imageFlipX: [{ type: core.Input }],
        imageFlipY: [{ type: core.Input }],
        imageGamma: [{ type: core.Input }],
        imageNoise: [{ type: core.Input }],
        imageRotation: [{ type: core.Input }],
        imageVignette: [{ type: core.Input }],
        imageTargetSize: [{ type: core.Input }],
        imageFrame: [{ type: core.Input }],
        imageMetadata: [{ type: core.Input }],
        imageState: [{ type: core.Input }],
        markupEditorToolbar: [{ type: core.Input }],
        markupEditorToolStyles: [{ type: core.Input }],
        markupEditorShapeStyleControls: [{ type: core.Input }],
        markupEditorToolSelectRadius: [{ type: core.Input }],
        markupEditorTextInputMode: [{ type: core.Input }],
        enableSelectToolToAddShape: [{ type: core.Input }],
        enableTapToAddText: [{ type: core.Input }],
        enableZoom: [{ type: core.Input }],
        enablePan: [{ type: core.Input }],
        enableZoomControls: [{ type: core.Input }],
        markupEditorZoomLevels: [{ type: core.Input }],
        markupEditorZoomAdjustStep: [{ type: core.Input }],
        markupEditorZoomAdjustFactor: [{ type: core.Input }],
        markupEditorWillStartInteraction: [{ type: core.Input }],
        cropAutoCenterImageSelectionTimeout: [{ type: core.Input }],
        cropWillRenderImageSelectionGuides: [{ type: core.Input }],
        cropEnableButtonFlipHorizontal: [{ type: core.Input }],
        cropEnableButtonFlipVertical: [{ type: core.Input }],
        cropEnableButtonRotateLeft: [{ type: core.Input }],
        cropEnableButtonRotateRight: [{ type: core.Input }],
        cropEnableButtonToggleCropLimit: [{ type: core.Input }],
        cropEnableCenterImageSelection: [{ type: core.Input }],
        cropEnableImageSelection: [{ type: core.Input }],
        cropEnableInfoIndicator: [{ type: core.Input }],
        cropEnableLimitWheelInputToCropSelection: [{ type: core.Input }],
        cropEnableRotationInput: [{ type: core.Input }],
        cropEnableSelectPreset: [{ type: core.Input }],
        cropEnableZoomInput: [{ type: core.Input }],
        cropEnableZoomMatchImageAspectRatio: [{ type: core.Input }],
        cropEnableZoomTowardsWheelPosition: [{ type: core.Input }],
        cropEnableZoomAutoHide: [{ type: core.Input }],
        cropImageSelectionCornerStyle: [{ type: core.Input }],
        cropSelectPresetOptions: [{ type: core.Input }],
        cropEnableRotateMatchImageAspectRatio: [{ type: core.Input }],
        cropWillRenderTools: [{ type: core.Input }],
        annotateActiveTool: [{ type: core.Input }],
        annotateEnableButtonFlipVertical: [{ type: core.Input }],
        annotatePresets: [{ type: core.Input }],
        decorateActiveTool: [{ type: core.Input }],
        decorateEnableButtonFlipVertical: [{ type: core.Input }],
        decoratePresets: [{ type: core.Input }],
        filterFunctions: [{ type: core.Input }],
        filterOptions: [{ type: core.Input }],
        finetuneControlConfiguration: [{ type: core.Input }],
        finetuneOptions: [{ type: core.Input }],
        resizeMaxSize: [{ type: core.Input }],
        resizeMinSize: [{ type: core.Input }],
        resizeSizePresetOptions: [{ type: core.Input }],
        resizeWidthPresetOptions: [{ type: core.Input }],
        resizeHeightPresetOptions: [{ type: core.Input }],
        resizeWillRenderFooter: [{ type: core.Input }],
        frameStyles: [{ type: core.Input }],
        frameOptions: [{ type: core.Input }],
        stickers: [{ type: core.Input }],
        stickerStickToImage: [{ type: core.Input }],
        stickersEnableButtonFlipVertical: [{ type: core.Input }],
        init: [{ type: core.Output }],
        loadstart: [{ type: core.Output }],
        loadabort: [{ type: core.Output }],
        loaderror: [{ type: core.Output }],
        loadprogress: [{ type: core.Output }],
        load: [{ type: core.Output }],
        processstart: [{ type: core.Output }],
        processabort: [{ type: core.Output }],
        processerror: [{ type: core.Output }],
        processprogress: [{ type: core.Output }],
        process: [{ type: core.Output }],
        update: [{ type: core.Output }],
        undo: [{ type: core.Output }],
        redo: [{ type: core.Output }],
        revert: [{ type: core.Output }],
        destroy: [{ type: core.Output }],
        show: [{ type: core.Output }],
        hide: [{ type: core.Output }],
        close: [{ type: core.Output }],
        ready: [{ type: core.Output }],
        loadpreview: [{ type: core.Output }],
        addshape: [{ type: core.Output }],
        selectshape: [{ type: core.Output }],
        updateshape: [{ type: core.Output }],
        removeshape: [{ type: core.Output }],
        selectstyle: [{ type: core.Output }]
    };

    var PinturaEditorComponent = /** @class */ (function (_super) {
        __extends(PinturaEditorComponent, _super);
        function PinturaEditorComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PinturaEditorComponent.prototype.initEditor = function (element, props) {
            return pintura.appendEditor(element, props);
        };
        return PinturaEditorComponent;
    }(PinturaEditorAbstractComponent));
    PinturaEditorComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'pintura-editor',
                    template: " <ng-content></ng-content> "
                },] }
    ];

    var PinturaEditorModalComponent = /** @class */ (function (_super) {
        __extends(PinturaEditorModalComponent, _super);
        function PinturaEditorModalComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PinturaEditorModalComponent.prototype, "modal", {
            get: function () {
                return this.editor.modal;
            },
            enumerable: false,
            configurable: true
        });
        PinturaEditorModalComponent.prototype.initEditor = function (element, props) {
            return pintura.openEditor(props);
        };
        PinturaEditorModalComponent.prototype.showEditor = function () {
            this.editor.show();
        };
        PinturaEditorModalComponent.prototype.hideEditor = function () {
            this.editor.hide();
        };
        PinturaEditorModalComponent.prototype.ngOnDestroy = function () {
            if (!this.editor)
                return;
            this.editor = undefined;
        };
        return PinturaEditorModalComponent;
    }(PinturaEditorAbstractComponent));
    PinturaEditorModalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'pintura-editor-modal',
                    template: " <ng-content></ng-content> "
                },] }
    ];
    PinturaEditorModalComponent.propDecorators = {
        preventZoomViewport: [{ type: core.Input }],
        preventScrollBodyIfNeeded: [{ type: core.Input }],
        preventFooterOverlapIfNeeded: [{ type: core.Input }],
        enableAutoHide: [{ type: core.Input }],
        enableAutoDestroy: [{ type: core.Input }]
    };

    var PinturaEditorOverlayComponent = /** @class */ (function (_super) {
        __extends(PinturaEditorOverlayComponent, _super);
        function PinturaEditorOverlayComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PinturaEditorOverlayComponent.prototype.initEditor = function (element, props) {
            return pintura.overlayEditor(element, props);
        };
        return PinturaEditorOverlayComponent;
    }(PinturaEditorAbstractComponent));
    PinturaEditorOverlayComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'pintura-editor-overlay',
                    template: " <ng-content></ng-content> "
                },] }
    ];

    var AngularPinturaModule = /** @class */ (function () {
        function AngularPinturaModule() {
        }
        return AngularPinturaModule;
    }());
    AngularPinturaModule.decorators = [
        { type: core.NgModule, args: [{
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

    exports.AngularPinturaModule = AngularPinturaModule;
    exports.PinturaEditorComponent = PinturaEditorComponent;
    exports.PinturaEditorModalComponent = PinturaEditorModalComponent;
    exports.PinturaEditorOverlayComponent = PinturaEditorOverlayComponent;
    exports.ɵa = PinturaEditorAbstractComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pqina-angular-pintura.umd.js.map
