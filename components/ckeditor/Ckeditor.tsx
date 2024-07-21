"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  Title,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDebounce } from "@/hooks/useDebounce";
import UploadAdapter from "./UploadAdapter";
import { Preview } from "./RichTextRenderer";
import "ckeditor5/ckeditor5.css";
import "./ck_style.css";
interface CkeditorProps {
  uploadUrl: string;
  value: string;
  onChange: (value: string) => void;
}

const Ckeditor = ({ uploadUrl, value, onChange }: CkeditorProps) => {
  const [editorState, setEditorState] = useState(value || "");

  const [editorInstance, setEditorInstance] = useState(null);

  const savePostContent = useCallback(async () => {
    console.log(editorState);
  }, [editorState]);

  const debouncedEditorState = useDebounce(editorState, 500);

  useEffect(() => {
    if (debouncedEditorState === "") return;
    savePostContent();
  }, [debouncedEditorState, savePostContent]);

  const handleChange = (changedState: string) => {
    const initialState = editorState;
    if (initialState != changedState) {
      setEditorState(changedState);
    }

    onChange(changedState);
  };

  return (
    <div>
      <div className="App">
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: {
              items: [
                "undo",
                "redo",
                "|",
                "sourceEditing",
                "showBlocks",
                "selectAll",
                "textPartLanguage",
                "|",
                "heading",
                "style",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "subscript",
                "superscript",
                "code",
                "removeFormat",
                "|",
                "specialCharacters",
                "horizontalLine",
                "link",
                "insertImage",
                "mediaEmbed",
                "insertTable",
                "highlight",
                "blockQuote",
                "codeBlock",
                "htmlEmbed",
                "|",
                "alignment",
                "|",
                "bulletedList",
                "numberedList",
                "todoList",
                "indent",
                "outdent",
                "|",
                "accessibilityHelp",
              ],
              shouldNotGroupWhenFull: false,
            },
            plugins: [
              AccessibilityHelp,
              Alignment,
              AutoImage,
              AutoLink,
              Autosave,
              BlockQuote,
              Bold,
              Code,
              CodeBlock,
              Essentials,
              FontBackgroundColor,
              FontColor,
              FontFamily,
              FontSize,
              FullPage,
              GeneralHtmlSupport,
              Heading,
              Highlight,
              HorizontalLine,
              HtmlComment,
              HtmlEmbed,
              ImageBlock,
              ImageCaption,
              ImageInsert,
              ImageInsertViaUrl,
              ImageResize,
              ImageStyle,
              ImageTextAlternative,
              ImageToolbar,
              ImageUpload,
              Indent,
              IndentBlock,
              Italic,
              Link,
              LinkImage,
              List,
              ListProperties,
              Markdown,
              MediaEmbed,
              Mention,
              Paragraph,
              PasteFromMarkdownExperimental,
              PasteFromOffice,
              RemoveFormat,
              SelectAll,
              ShowBlocks,
              SimpleUploadAdapter,
              SourceEditing,
              SpecialCharacters,
              SpecialCharactersArrows,
              SpecialCharactersCurrency,
              SpecialCharactersEssentials,
              SpecialCharactersLatin,
              SpecialCharactersMathematical,
              SpecialCharactersText,
              Strikethrough,
              Style,
              Subscript,
              Superscript,
              Table,
              TableCaption,
              TableCellProperties,
              TableColumnResize,
              TableProperties,
              TableToolbar,
              TextPartLanguage,
              Title,
              TodoList,
              Underline,
              Undo,
            ],

            // initialData: "<p>Hello from CKEditor 5 in React!</p>",
            fontFamily: {
              supportAllValues: true,
            },
            fontSize: {
              options: [10, 12, 14, "default", 18, 20, 22],
              supportAllValues: true,
            },
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
            htmlSupport: {
              allow: [
                {
                  name: /^.*$/,
                  styles: true,
                  attributes: true,
                  classes: true,
                },
              ],
            },
            image: {
              toolbar: [
                "toggleImageCaption",
                "imageTextAlternative",
                "|",
                "imageStyle:alignBlockLeft",
                "imageStyle:block",
                "imageStyle:alignBlockRight",
                "|",
                "resizeImage",
              ],
              styles: {
                options: ["alignBlockLeft", "block", "alignBlockRight"],
              },
            },
            link: {
              addTargetToExternalLinks: true,
              defaultProtocol: "https://",
              decorators: {
                toggleDownloadable: {
                  mode: "manual",
                  label: "Downloadable",
                  attributes: {
                    download: "file",
                  },
                },
              },
            },
            list: {
              properties: {
                styles: true,
                startIndex: true,
                reversed: true,
              },
            },
            mention: {
              feeds: [
                {
                  marker: "@",
                  feed: [
                    /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                  ],
                },
              ],
            },
            placeholder: "Type or paste your content here!",
            style: {
              definitions: [
                {
                  name: "Article category",
                  element: "h3",
                  classes: ["category"],
                },
                {
                  name: "Title",
                  element: "h2",
                  classes: ["document-title"],
                },
                {
                  name: "Subtitle",
                  element: "h3",
                  classes: ["document-subtitle"],
                },
                {
                  name: "Info box",
                  element: "p",
                  classes: ["info-box"],
                },
                {
                  name: "Side quote",
                  element: "blockquote",
                  classes: ["side-quote"],
                },
                {
                  name: "Marker",
                  element: "span",
                  classes: ["marker"],
                },
                {
                  name: "Spoiler",
                  element: "span",
                  classes: ["spoiler"],
                },
                {
                  name: "Code (dark)",
                  element: "pre",
                  classes: ["fancy-code", "fancy-code-dark"],
                },
                {
                  name: "Code (bright)",
                  element: "pre",
                  classes: ["fancy-code", "fancy-code-bright"],
                },
              ],
            },
            table: {
              contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableProperties",
                "tableCellProperties",
              ],
            },
          }}
          data={editorState}
          onReady={(editor: any) => {
            setEditorInstance(editor);
            console.log("Editor is ready to use!", editor);

            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader: any,
            ) => {
              // Initialize the upload adapter with the loader instance
              return new UploadAdapter(loader, uploadUrl);
            };
          }}
          onChange={(event: any, editor: { getData: () => any }) => {
            handleChange(editor.getData());
            // return editor.getData();
          }}
          onBlur={(event: any, editor: any) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event: any, editor: any) => {
            console.log("Focus.", editor);
          }}
        />
      </div>

      <Preview value={editorState} />
    </div>
  );
};

export default Ckeditor;
