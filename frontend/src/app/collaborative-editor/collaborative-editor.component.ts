import { AfterViewInit, Component, DestroyRef, OnInit, inject , ViewChild ,ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from 'codemirror';
import { autocompletion, CompletionContext, CompletionSource } from '@codemirror/autocomplete';
import { CodeEditor } from '@acrodata/code-editor';
import { GuiFields, GuiForm } from '@acrodata/gui';
import { languages } from '@codemirror/language-data';
import { unifiedMergeView } from '@codemirror/merge';
import { WebsocketProvider } from 'y-websocket';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Y from 'yjs';
import { EditorView, keymap } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'collaborative-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CodeEditor, GuiForm, MatButtonModule],
  templateUrl: './collaborative-editor.component.html',
  styleUrl: './collaborative-editor.component.scss',
})
export class CollaborativeEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editorEl!: ElementRef;
  private readonly destroyRef = inject(DestroyRef);

  languages = languages;

  form = new FormGroup({});
  //////////////////////WS
  private ydoc!: Y.Doc;
  private websocketProvider!: WebsocketProvider;
  private view!: EditorView;
  
  config: GuiFields = {
    language: {
      type: 'combobox',
      name: 'Language',
      options: languages
        .map(lang => ({ label: lang.name, value: lang.name.toLowerCase() }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
    theme: {
      type: 'buttonToggle',
      name: 'Theme',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    setup: {
      type: 'buttonToggle',
      name: 'Setup',
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'None', value: '' },
      ],
    },
    disabled: {
      type: 'switch',
      name: 'Disabled',
    },
    readonly: {
      type: 'switch',
      name: 'Readonly',
    },
    placeholder: {
      type: 'text',
      name: 'Placeholder',
    },
    indentWithTab: {
      type: 'switch',
      name: 'Indent with tab',
    },
    indentUnit: {
      type: 'text',
      name: 'Indent unit',
    },
    lineWrapping: {
      type: 'switch',
      name: 'Line wrapping',
    },
    highlightWhitespace: {
      type: 'switch',
      name: 'Highlight whitespace',
    },
  };

  options: any = {
    language: 'javascript',
    theme: 'light',
    setup: 'basic',
    disabled: false,
    readonly: false,
    placeholder: 'Type your code here...',
    indentWithTab: false,
    indentUnit: '',
    lineWrapping: false,
    highlightWhitespace: false,
  };

  code = '';

  showOutput = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const room = this.route.snapshot.queryParamMap.get('room') || 'default-room';
    this.ydoc = new Y.Doc();
    this.getLangSample('javascript');
    this.websocketProvider = new WebsocketProvider('ws://localhost:3000',room,this.ydoc);
    this.log("Step 1. WebsocketProvider constructed.")
  }

  ngAfterViewInit(): void {
    this.form
      .get('language')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang: string) => {
        console.log(lang);
        this.getLangSample(lang.replace(' ', '_').replace('#', 'sharp'));
      });
      const yText = this.ydoc.getText('codemirror');
      this.log(yText.toString());

      const state = EditorState.create({
          doc: yText.toString(),
          extensions: [
              basicSetup,
              javascript(),
              ///autocompletion(),
              autocompletion({ override: [this.geminiCompletionSource.bind(this)] })
              /////binding.codemirrorExtension
          ],
        });
        this.log("Step 3. EditorState created");

        this.view = new EditorView({ state, parent: this.editorEl.nativeElement });
      
        this.log("Step 4. EditorView created");

  }
  
async geminiCompletionSource(context: CompletionContext): Promise<{ from: number, options: any[] } | null> {
        this.log('1. geminiCompletionSource');
        const { pos, explicit } = context;
        const line = context.state.doc.lineAt(pos);
        const prefix = context.state.doc.toString().substring(0, pos);
        const suffix = context.state.doc.toString().substring(pos);
 
        // Basic trigger: explicit or at end of word
        let word = context.matchBefore(/\w*/);
        if (!explicit && !word) return null;
 
        try {
            const response: any = await firstValueFrom(this.http.post('http://localhost:3000/api/complete', { prefix, suffix }));
            if (response && response.suggestions) {
                return {
                    from: word ? word.from : pos,
                    options: response.suggestions,
                };
                this.log("2. geminiCompletionSource RESPONSE");
                this.log("****************************************");
                console.log(response);
            }
        } catch (error) {
            console.error('Completion request failed:', error);
        }
        return null;
    }
  getLangSample(lang: string) {
    fetch(`assets/lang_samples/${lang}.txt`).then(async response => {
      if (response.ok) {
        this.code = await response.text();
      } else {
        this.code = '';
      }
    });
  }


  log(e: any) {
    console.log(e);
  }
    ngOnDestroy() {
        ////this.view?.destroy();
        this.websocketProvider?.destroy();
        this.ydoc?.destroy();
    }
  originalCode = `one
two
three
four
five`;
  modifiedCode = this.originalCode.replace(/t/g, 'T') + '\nSix';

  unifiedExts = [
    unifiedMergeView({
      original: this.originalCode,
    }),
  ];

  config2: GuiFields = {
    orientation: {
      type: 'buttonToggle',
      name: 'Orientation',
      options: [
        { label: 'a-b', value: 'a-b' },
        { label: 'b-a', value: 'b-a' },
      ],
    },
    revertControls: {
      type: 'buttonToggle',
      name: 'Revert controls',
      options: [
        { label: 'a-to-b', value: 'a-to-b' },
        { label: 'b-to-a', value: 'b-to-a' },
        { label: 'none', value: '' },
      ],
    },
    highlightChanges: {
      type: 'switch',
      name: 'Highlight changes',
    },
    gutter: {
      type: 'switch',
      name: 'Gutter',
    },
  };

  options2: any = {
    orientation: 'a-b',
    revertControls: '',
    highlightChanges: true,
    gutter: true,
  };
}
