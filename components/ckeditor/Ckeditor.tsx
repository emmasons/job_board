import React, { useCallback, useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDebounce } from "@/hooks/useDebounce";
import UploadAdapter from "./UploadAdapter";
import { Preview } from "./RichTextRenderer";

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
          editor={Editor}
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
