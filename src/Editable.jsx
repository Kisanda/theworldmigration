import { useEffect, useRef } from 'react';
import { useContent, useEditor } from './content';
export function Editable({ name }) {
  const values = useContent(), editor = useEditor(), ref = useRef(null);
  const active = editor && !editor.preview;
  useEffect(() => { if (ref.current && document.activeElement !== ref.current) ref.current.textContent = values[name]; }, [values, name, active]);
  if (!active) return <span>{values[name]}</span>;
  return <span ref={ref} className="editable-text" contentEditable="plaintext-only" suppressContentEditableWarning role="textbox" aria-label={editor.fields[name].label} data-editable="true" onFocus={() => editor.select(name)} onInput={e => editor.change(name, e.currentTarget.textContent)} onBlur={e => editor.change(name, e.currentTarget.textContent)} />;
}
export function EditableImage({ name, altName, ...props }) {
  const editor = useEditor();
  return <><img {...props} data-editable={editor && !editor.preview ? 'true' : undefined} className={`${props.className || ''} ${editor && !editor.preview ? 'editable-image' : ''}`} onClick={editor && !editor.preview ? () => editor.editImage(name, altName) : undefined} tabIndex={editor && !editor.preview ? 0 : undefined} role={editor && !editor.preview ? 'button' : undefined} aria-label={editor && !editor.preview ? 'Edit image' : undefined} onKeyDown={e => { if (editor && !editor.preview && ['Enter',' '].includes(e.key)) { e.preventDefault(); editor.editImage(name, altName); } }} />{editor && !editor.preview && props.className === 'hero-photo' && <button className="hero-image-edit" onClick={() => editor.editImage(name, altName)}>Edit cover image</button>}</>;
}
