import "./app.css";
import CodeMirror from "@uiw/react-codemirror";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { AppBar, Card, CardContent, Toolbar, Typography } from "@mui/material";

export default function App() {
  const [md, setMd] = useState("# Hello World");

  return (
    <div className="app">
      <header>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              MdCode
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <div className="container">
        <Card variant="elevation">
          <CodeMirror
            value={md}
            height="100%"
            style={{ height: "100%" }}
            extensions={[langs.markdown()]}
            onChange={setMd}
            basicSetup={{
              crosshairCursor: false,
            }}
          />
        </Card>
        <Card variant="elevation">
          <CardContent>
            <ReactMarkdown className="md">{md}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
