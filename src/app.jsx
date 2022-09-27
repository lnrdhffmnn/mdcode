import "./app.css";
import CodeMirror from "@uiw/react-codemirror";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, OpenInBrowser, Save } from "@mui/icons-material";

export default function App() {
  const [md, setMd] = useState("# Hello World");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [urlMd, setUrlMd] = useState("");

  useEffect(() => {
    if (!dataLoaded) {
      const loadedMd = localStorage.getItem("md") ?? "";
      if (loadedMd.length > 0) setMd(loadedMd);
      setDataLoaded(true);
    }
  }, []);

  function saveMd() {
    localStorage.setItem("md", md);
  }

  function deleteMd() {
    localStorage.removeItem("md");
    setMd("");
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function importMdFromWeb() {
    fetch(urlMd)
      .then(res => res.text())
      .then(setMd)
      .catch(setMd);
    setUrlMd("");
    closeModal();
  }

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
            <Tooltip title="Save">
              <IconButton aria-label="Save" color="inherit" onClick={saveMd}>
                <Save />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                color="inherit"
                onClick={deleteMd}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="Import from web">
              <IconButton
                aria-label="Import from web"
                color="inherit"
                onClick={openModal}
              >
                <OpenInBrowser />
              </IconButton>
            </Tooltip>
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
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>Import from web</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Markdown file link</DialogContentText>
          <TextField
            label="https://example.com/file.md"
            margin="dense"
            value={urlMd}
            onChange={event => setUrlMd(event.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            onClick={importMdFromWeb}
            disabled={urlMd.length < 1 || !urlMd.endsWith(".md")}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
