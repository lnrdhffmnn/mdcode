import "./app.css";
import CodeMirror from "@uiw/react-codemirror";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";

export default function App() {
  const [md, setMd] = useState("# Hello World");

  return (
    <div className="app">
      <CodeMirror
        value={md}
        height="100%"
        extensions={[langs.markdown()]}
        onChange={setMd}
        basicSetup={{
          crosshairCursor: false,
        }}
      />
      <div className="md">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    </div>
  );
}
