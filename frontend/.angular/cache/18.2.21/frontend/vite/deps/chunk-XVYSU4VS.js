import {
  MergeView
} from "./chunk-P2GRAH6U.js";
import {
  basicSetup,
  indentWithTab,
  minimalSetup
} from "./chunk-4MFOQTLC.js";
import {
  HighlightStyle,
  indentUnit,
  syntaxHighlighting,
  tags
} from "./chunk-WW2G6J3Q.js";
import {
  EditorView,
  highlightWhitespace,
  keymap,
  placeholder
} from "./chunk-W6G24EJV.js";
import {
  Annotation,
  Compartment,
  EditorState,
  StateEffect
} from "./chunk-QBYCMUPZ.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-WOMEDZ57.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-G2LLFY66.js";

// node_modules/@codemirror/theme-one-dark/dist/index.js
var chalky = "#e5c07b";
var coral = "#e06c75";
var cyan = "#56b6c2";
var invalid = "#ffffff";
var ivory = "#abb2bf";
var stone = "#7d8799";
var malibu = "#61afef";
var sage = "#98c379";
var whiskey = "#d19a66";
var violet = "#c678dd";
var darkBackground = "#21252b";
var highlightBackground = "#2c313a";
var background = "#282c34";
var tooltipBackground = "#353a42";
var selection = "#3E4451";
var cursor = "#528bff";
var oneDarkTheme = EditorView.theme({
  "&": {
    color: ivory,
    backgroundColor: background
  },
  ".cm-content": {
    caretColor: cursor
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: cursor
  },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: selection
  },
  ".cm-panels": {
    backgroundColor: darkBackground,
    color: ivory
  },
  ".cm-panels.cm-panels-top": {
    borderBottom: "2px solid black"
  },
  ".cm-panels.cm-panels-bottom": {
    borderTop: "2px solid black"
  },
  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },
  ".cm-activeLine": {
    backgroundColor: "#6699ff0b"
  },
  ".cm-selectionMatch": {
    backgroundColor: "#aafe661a"
  },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },
  ".cm-gutters": {
    backgroundColor: background,
    color: stone,
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: tooltipBackground
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: highlightBackground,
      color: ivory
    }
  }
}, {
  dark: true
});
var oneDarkHighlightStyle = HighlightStyle.define([{
  tag: tags.keyword,
  color: violet
}, {
  tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
  color: coral
}, {
  tag: [tags.function(tags.variableName), tags.labelName],
  color: malibu
}, {
  tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
  color: whiskey
}, {
  tag: [tags.definition(tags.name), tags.separator],
  color: ivory
}, {
  tag: [tags.typeName, tags.className, tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace],
  color: chalky
}, {
  tag: [tags.operator, tags.operatorKeyword, tags.url, tags.escape, tags.regexp, tags.link, tags.special(tags.string)],
  color: cyan
}, {
  tag: [tags.meta, tags.comment],
  color: stone
}, {
  tag: tags.strong,
  fontWeight: "bold"
}, {
  tag: tags.emphasis,
  fontStyle: "italic"
}, {
  tag: tags.strikethrough,
  textDecoration: "line-through"
}, {
  tag: tags.link,
  color: stone,
  textDecoration: "underline"
}, {
  tag: tags.heading,
  fontWeight: "bold",
  color: coral
}, {
  tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
  color: whiskey
}, {
  tag: [tags.processingInstruction, tags.string, tags.inserted],
  color: sage
}, {
  tag: tags.invalid,
  color: invalid
}]);
var oneDark = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)];

// node_modules/@acrodata/code-editor/fesm2022/acrodata-code-editor.mjs
var External = Annotation.define();
var CodeEditor = class _CodeEditor {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this.autoFocus = false;
    this.value = "";
    this.disabled = false;
    this.readonly = false;
    this.theme = "light";
    this.placeholder = "";
    this.indentWithTab = false;
    this.indentUnit = "";
    this.lineWrapping = false;
    this.highlightWhitespace = false;
    this.languages = [];
    this.language = "";
    this.setup = "basic";
    this.extensions = [];
    this.change = new EventEmitter();
    this.focus = new EventEmitter();
    this.blur = new EventEmitter();
    this._onChange = () => {
    };
    this._onTouched = () => {
    };
    this._updateListener = EditorView.updateListener.of((vu) => {
      if (vu.docChanged && !vu.transactions.some((tr) => tr.annotation(External))) {
        const value = vu.state.doc.toString();
        this._onChange(value);
        this.change.emit(value);
      }
    });
    this._editableConf = new Compartment();
    this._readonlyConf = new Compartment();
    this._themeConf = new Compartment();
    this._placeholderConf = new Compartment();
    this._indentWithTabConf = new Compartment();
    this._indentUnitConf = new Compartment();
    this._lineWrappingConf = new Compartment();
    this._highlightWhitespaceConf = new Compartment();
    this._languageConf = new Compartment();
  }
  _getAllExtensions() {
    return [this._updateListener, this._editableConf.of([]), this._readonlyConf.of([]), this._themeConf.of([]), this._placeholderConf.of([]), this._indentWithTabConf.of([]), this._indentUnitConf.of([]), this._lineWrappingConf.of([]), this._highlightWhitespaceConf.of([]), this._languageConf.of([]), this.setup === "basic" ? basicSetup : this.setup === "minimal" ? minimalSetup : [], ...this.extensions];
  }
  ngOnChanges(changes) {
    if (changes["value"]) {
      this.setValue(this.value);
    }
    if (changes["disabled"]) {
      this.setEditable(!this.disabled);
    }
    if (changes["readonly"]) {
      this.setReadonly(this.readonly);
    }
    if (changes["theme"]) {
      this.setTheme(this.theme);
    }
    if (changes["placeholder"]) {
      this.setPlaceholder(this.placeholder);
    }
    if (changes["indentWithTab"]) {
      this.setIndentWithTab(this.indentWithTab);
    }
    if (changes["indentUnit"]) {
      this.setIndentUnit(this.indentUnit);
    }
    if (changes["lineWrapping"]) {
      this.setLineWrapping(this.lineWrapping);
    }
    if (changes["highlightWhitespace"]) {
      this.setHighlightWhitespace(this.highlightWhitespace);
    }
    if (changes["language"]) {
      this.setLanguage(this.language);
    }
    if (changes["setup"] || changes["extensions"]) {
      this.setExtensions(this._getAllExtensions());
    }
  }
  ngOnInit() {
    this.view = new EditorView({
      root: this.root,
      parent: this._elementRef.nativeElement,
      state: EditorState.create({
        doc: this.value,
        extensions: this._getAllExtensions()
      })
    });
    if (this.autoFocus) {
      this.view?.focus();
    }
    this.view?.contentDOM.addEventListener("focus", () => {
      this._onTouched();
      this.focus.emit();
    });
    this.view?.contentDOM.addEventListener("blur", () => {
      this._onTouched();
      this.blur.emit();
    });
    this.setEditable(!this.disabled);
    this.setReadonly(this.readonly);
    this.setTheme(this.theme);
    this.setPlaceholder(this.placeholder);
    this.setIndentWithTab(this.indentWithTab);
    this.setIndentUnit(this.indentUnit);
    this.setLineWrapping(this.lineWrapping);
    this.setHighlightWhitespace(this.highlightWhitespace);
    this.setLanguage(this.language);
  }
  ngOnDestroy() {
    this.view?.destroy();
  }
  writeValue(value) {
    if (this.view) {
      this.setValue(value);
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.setEditable(!isDisabled);
  }
  /** Sets editor's value. */
  setValue(value) {
    this.view?.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: value
      }
    });
  }
  _dispatchEffects(effects) {
    return this.view?.dispatch({
      effects
    });
  }
  /** Sets the root extensions of the editor. */
  setExtensions(value) {
    this._dispatchEffects(StateEffect.reconfigure.of(value));
  }
  /** Sets editor's editable state. */
  setEditable(value) {
    this._dispatchEffects(this._editableConf.reconfigure(EditorView.editable.of(value)));
  }
  /** Sets editor's readonly state. */
  setReadonly(value) {
    this._dispatchEffects(this._readonlyConf.reconfigure(EditorState.readOnly.of(value)));
  }
  /** Sets editor's theme. */
  setTheme(value) {
    this._dispatchEffects(this._themeConf.reconfigure(value === "light" ? [] : value === "dark" ? oneDark : value));
  }
  /** Sets editor's placeholder. */
  setPlaceholder(value) {
    this._dispatchEffects(this._placeholderConf.reconfigure(value ? placeholder(value) : []));
  }
  /** Sets editor' indentWithTab. */
  setIndentWithTab(value) {
    this._dispatchEffects(this._indentWithTabConf.reconfigure(value ? keymap.of([indentWithTab]) : []));
  }
  /** Sets editor's indentUnit. */
  setIndentUnit(value) {
    this._dispatchEffects(this._indentUnitConf.reconfigure(value ? indentUnit.of(value) : []));
  }
  /** Sets editor's lineWrapping. */
  setLineWrapping(value) {
    this._dispatchEffects(this._lineWrappingConf.reconfigure(value ? EditorView.lineWrapping : []));
  }
  /** Sets editor's highlightWhitespace. */
  setHighlightWhitespace(value) {
    this._dispatchEffects(this._highlightWhitespaceConf.reconfigure(value ? highlightWhitespace() : []));
  }
  /** Sets editor's language dynamically. */
  setLanguage(lang) {
    if (!lang || lang == "plaintext") {
      this._dispatchEffects(this._languageConf.reconfigure([]));
      return;
    }
    if (this.languages.length === 0) {
      if (this.view) {
        console.error("No supported languages. Please set the `languages` prop at first.");
      }
      return;
    }
    const langDesc = this._findLanguage(lang);
    langDesc?.load().then((lang2) => {
      this._dispatchEffects(this._languageConf.reconfigure([lang2]));
    });
  }
  /** Find the language's extension by its name. Case insensitive. */
  _findLanguage(name) {
    for (const lang of this.languages) {
      for (const alias of [lang.name, ...lang.alias]) {
        if (name.toLowerCase() === alias.toLowerCase()) {
          return lang;
        }
      }
    }
    console.error("Language not found:", name);
    console.info("Supported language names:", this.languages.map((lang) => lang.name).join(", "));
    return null;
  }
  static {
    this.ɵfac = function CodeEditor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CodeEditor)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CodeEditor,
      selectors: [["code-editor"]],
      hostAttrs: [1, "code-editor"],
      inputs: {
        root: "root",
        autoFocus: [2, "autoFocus", "autoFocus", booleanAttribute],
        value: "value",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        readonly: [2, "readonly", "readonly", booleanAttribute],
        theme: "theme",
        placeholder: "placeholder",
        indentWithTab: [2, "indentWithTab", "indentWithTab", booleanAttribute],
        indentUnit: "indentUnit",
        lineWrapping: [2, "lineWrapping", "lineWrapping", booleanAttribute],
        highlightWhitespace: [2, "highlightWhitespace", "highlightWhitespace", booleanAttribute],
        languages: "languages",
        language: "language",
        setup: "setup",
        extensions: "extensions"
      },
      outputs: {
        change: "change",
        focus: "focus",
        blur: "blur"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => _CodeEditor),
        multi: true
      }]), ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 0,
      vars: 0,
      template: function CodeEditor_Template(rf, ctx) {
      },
      styles: [".code-editor{display:block}.code-editor .cm-editor{height:100%}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeEditor, [{
    type: Component,
    args: [{
      selector: "code-editor",
      standalone: true,
      template: ``,
      host: {
        class: "code-editor"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CodeEditor),
        multi: true
      }],
      styles: [".code-editor{display:block}.code-editor .cm-editor{height:100%}\n"]
    }]
  }], () => [{
    type: ElementRef
  }], {
    root: [{
      type: Input
    }],
    autoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    theme: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    indentWithTab: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    indentUnit: [{
      type: Input
    }],
    lineWrapping: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    highlightWhitespace: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    languages: [{
      type: Input
    }],
    language: [{
      type: Input
    }],
    setup: [{
      type: Input
    }],
    extensions: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    focus: [{
      type: Output
    }],
    blur: [{
      type: Output
    }]
  });
})();
var DiffEditor = class _DiffEditor {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this.setup = "basic";
    this.originalValue = "";
    this.originalExtensions = [];
    this.modifiedValue = "";
    this.modifiedExtensions = [];
    this.highlightChanges = true;
    this.gutter = true;
    this.disabled = false;
    this.originalValueChange = new EventEmitter();
    this.originalFocus = new EventEmitter();
    this.originalBlur = new EventEmitter();
    this.modifiedValueChange = new EventEmitter();
    this.modifiedFocus = new EventEmitter();
    this.modifiedBlur = new EventEmitter();
    this._onChange = () => {
    };
    this._onTouched = () => {
    };
    this._updateListener = (editor) => {
      return EditorView.updateListener.of((vu) => {
        if (vu.docChanged && !vu.transactions.some((tr) => tr.annotation(External))) {
          const value = vu.state.doc.toString();
          if (editor == "a") {
            this._onChange({
              original: value,
              modified: this.modifiedValue
            });
            this.originalValue = value;
            this.originalValueChange.emit(value);
          } else if (editor == "b") {
            this._onChange({
              original: this.originalValue,
              modified: value
            });
            this.modifiedValue = value;
            this.modifiedValueChange.emit(value);
          }
        }
      });
    };
    this._editableConf = new Compartment();
  }
  ngOnChanges(changes) {
    if (changes["originalValue"]) {
      this.setValue("a", this.originalValue);
    }
    if (changes["modifiedValue"]) {
      this.setValue("b", this.modifiedValue);
    }
    if (changes["orientation"]) {
      this.mergeView?.reconfigure({
        orientation: this.orientation
      });
    }
    if (changes["revertControls"]) {
      this.mergeView?.reconfigure({
        revertControls: this.revertControls
      });
    }
    if (changes["renderRevertControl"]) {
      this.mergeView?.reconfigure({
        renderRevertControl: this.renderRevertControl
      });
    }
    if (changes["highlightChanges"]) {
      this.mergeView?.reconfigure({
        highlightChanges: this.highlightChanges
      });
    }
    if (changes["gutter"]) {
      this.mergeView?.reconfigure({
        gutter: this.gutter
      });
    }
    if (changes["collapseUnchanged"]) {
      this.mergeView?.reconfigure({
        collapseUnchanged: this.collapseUnchanged
      });
    }
    if (changes["diffConfig"]) {
      this.mergeView?.reconfigure({
        diffConfig: this.diffConfig
      });
    }
    if (changes["disabled"]) {
      this.setEditable("a", !this.disabled);
      this.setEditable("b", !this.disabled);
    }
  }
  ngOnInit() {
    this.mergeView = new MergeView({
      parent: this._elementRef.nativeElement,
      a: {
        doc: this.originalValue,
        extensions: [this._updateListener("a"), this._editableConf.of([]), this.setup === "basic" ? basicSetup : this.setup === "minimal" ? minimalSetup : [], ...this.originalExtensions]
      },
      b: {
        doc: this.modifiedValue,
        extensions: [this._updateListener("b"), this._editableConf.of([]), this.setup === "basic" ? basicSetup : this.setup === "minimal" ? minimalSetup : [], ...this.modifiedExtensions]
      },
      orientation: this.orientation,
      revertControls: this.revertControls,
      renderRevertControl: this.renderRevertControl,
      highlightChanges: this.highlightChanges,
      gutter: this.gutter,
      collapseUnchanged: this.collapseUnchanged,
      diffConfig: this.diffConfig
    });
    this.mergeView?.a.contentDOM.addEventListener("focus", () => {
      this._onTouched();
      this.originalFocus.emit();
    });
    this.mergeView?.a.contentDOM.addEventListener("blur", () => {
      this._onTouched();
      this.originalBlur.emit();
    });
    this.mergeView?.b.contentDOM.addEventListener("focus", () => {
      this._onTouched();
      this.modifiedFocus.emit();
    });
    this.mergeView?.b.contentDOM.addEventListener("blur", () => {
      this._onTouched();
      this.modifiedBlur.emit();
    });
    this.setEditable("a", !this.disabled);
    this.setEditable("b", !this.disabled);
  }
  ngOnDestroy() {
    this.mergeView?.destroy();
  }
  writeValue(value) {
    if (this.mergeView && value != null && typeof value === "object") {
      this.originalValue = value.original;
      this.modifiedValue = value.modified;
      this.setValue("a", value.original);
      this.setValue("b", value.modified);
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.setEditable("a", !isDisabled);
    this.setEditable("b", !isDisabled);
  }
  /** Sets diff-editor's value. */
  setValue(editor, value) {
    this.mergeView?.[editor].dispatch({
      changes: {
        from: 0,
        to: this.mergeView[editor].state.doc.length,
        insert: value
      }
    });
  }
  /** Sets diff-editor's editable state. */
  setEditable(editor, value) {
    this.mergeView?.[editor].dispatch({
      effects: this._editableConf.reconfigure(EditorView.editable.of(value))
    });
  }
  static {
    this.ɵfac = function DiffEditor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DiffEditor)(ɵɵdirectiveInject(ElementRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DiffEditor,
      selectors: [["diff-editor"]],
      hostAttrs: [1, "diff-editor"],
      inputs: {
        setup: "setup",
        originalValue: "originalValue",
        originalExtensions: "originalExtensions",
        modifiedValue: "modifiedValue",
        modifiedExtensions: "modifiedExtensions",
        orientation: "orientation",
        revertControls: "revertControls",
        renderRevertControl: "renderRevertControl",
        highlightChanges: [2, "highlightChanges", "highlightChanges", booleanAttribute],
        gutter: [2, "gutter", "gutter", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        collapseUnchanged: "collapseUnchanged",
        diffConfig: "diffConfig"
      },
      outputs: {
        originalValueChange: "originalValueChange",
        originalFocus: "originalFocus",
        originalBlur: "originalBlur",
        modifiedValueChange: "modifiedValueChange",
        modifiedFocus: "modifiedFocus",
        modifiedBlur: "modifiedBlur"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => _DiffEditor),
        multi: true
      }]), ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 0,
      vars: 0,
      template: function DiffEditor_Template(rf, ctx) {
      },
      styles: [".diff-editor{display:block}.diff-editor :is(.cm-mergeView,.cm-mergeViewEditors){height:100%}.diff-editor :is(.cm-mergeView .cm-editor,.cm-mergeView .cm-scroller){height:100%!important}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DiffEditor, [{
    type: Component,
    args: [{
      selector: "diff-editor",
      standalone: true,
      template: ``,
      host: {
        class: "diff-editor"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DiffEditor),
        multi: true
      }],
      styles: [".diff-editor{display:block}.diff-editor :is(.cm-mergeView,.cm-mergeViewEditors){height:100%}.diff-editor :is(.cm-mergeView .cm-editor,.cm-mergeView .cm-scroller){height:100%!important}\n"]
    }]
  }], () => [{
    type: ElementRef
  }], {
    setup: [{
      type: Input
    }],
    originalValue: [{
      type: Input
    }],
    originalExtensions: [{
      type: Input
    }],
    modifiedValue: [{
      type: Input
    }],
    modifiedExtensions: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    revertControls: [{
      type: Input
    }],
    renderRevertControl: [{
      type: Input
    }],
    highlightChanges: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    gutter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    collapseUnchanged: [{
      type: Input
    }],
    diffConfig: [{
      type: Input
    }],
    originalValueChange: [{
      type: Output
    }],
    originalFocus: [{
      type: Output
    }],
    originalBlur: [{
      type: Output
    }],
    modifiedValueChange: [{
      type: Output
    }],
    modifiedFocus: [{
      type: Output
    }],
    modifiedBlur: [{
      type: Output
    }]
  });
})();
var CodeEditorModule = class _CodeEditorModule {
  static {
    this.ɵfac = function CodeEditorModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CodeEditorModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _CodeEditorModule,
      imports: [CodeEditor, DiffEditor],
      exports: [CodeEditor, DiffEditor]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeEditorModule, [{
    type: NgModule,
    args: [{
      imports: [CodeEditor, DiffEditor],
      exports: [CodeEditor, DiffEditor]
    }]
  }], null, null);
})();

export {
  External,
  CodeEditor,
  DiffEditor,
  CodeEditorModule
};
//# sourceMappingURL=chunk-XVYSU4VS.js.map
