import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type Props = {
    onChange: (value: string) => void;
};

const ReactQuillEditor = forwardRef(({ onChange }: Props, ref) => {
    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = ["header", "bold", "italic", "underline", "list", "bullet", "link", "image"];

    const handleChange = (content: string) => {
        setValue(content);
        onChange(content); // Pass value to parent
    };
    const quillRef = useRef<ReactQuill | null>(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            const editor = quillRef.current?.getEditor();
            if (editor) editor.focus();
        },
    }));

    return (
        <div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
});

export default ReactQuillEditor;
