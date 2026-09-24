import { useEffect, useState } from 'react';
import { ContentContext, EditorContext, defaults, schema } from './content';
import './editor.css';
const isEditor = location.pathname.replace(/\/$/, '') === '/edit';
const fields = Object.fromEntries(Object.entries(schema).flatMap(([section,s]) => s.fields.map(f => [f.key,{...f,section}])));
export function ContentProvider({ children }) {
  const [values,setValues] = useState(defaults), [docs,setDocs] = useState(null), [csrf,setCsrf] = useState(''), [ready,setReady] = useState(!isEditor);
  const [password,setPassword] = useState(''), [status,setStatus] = useState(''), [busy,setBusy] = useState(false), [preview,setPreview] = useState(false), [selected,setSelected] = useState('hero'), [image,setImage] = useState(null), [confirm,setConfirm] = useState(false);
  async function api(path, method='GET', body, token=csrf) {
    const response = await fetch(`/api/editor/${path}`, {method, credentials:'same-origin', cache:'no-store', headers:{'Content-Type':'application/json','X-CSRF-Token':token}, body:body ? JSON.stringify(body) : undefined});
    const data = await response.json();
    if (!response.ok) { if (response.status === 401 && path !== 'login') { setDocs(null); setCsrf(''); } throw new Error(response.status === 401 ? 'Sign in with your website-editor password.' : data.error || Object.values(data.errors || {}).join(' ') || 'Unable to save. Please try again.'); }
    return data;
  }
  async function load(token) {
    const data = await api('content','GET',undefined,token);
    setDocs(data.sections); setValues({...defaults,...Object.assign({},...Object.values(data.sections).map(d=>d.draft))});
  }
  useEffect(() => {
    let alive=true;
    async function start() {
      try {
        if (isEditor) {
          const response=await fetch('/api/editor/session',{cache:'no-store'});
          if (response.ok) { const session=await response.json(); if (alive) { setCsrf(session.csrf); await load(session.csrf); } }
        } else { const response=await fetch('/api/content',{cache:'no-store'}); if(response.ok) { const data=await response.json(); if(alive) setValues({...defaults,...data.content}); } }
      } catch { if(isEditor) setStatus('Unable to connect. Please try signing in again.'); }
      finally { if(alive) setReady(true); }
    }
    start(); return()=>{alive=false;};
    // Initialization only; login and reload explicitly fetch private content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const modalOpen = Boolean(image || confirm);
  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.activeElement;
    const dialog = document.querySelector('.editor-modal');
    const focusable = () => [...dialog.querySelectorAll('button, input, [tabindex="0"]')].filter(el=>!el.disabled);
    focusable()[0]?.focus();
    const keyboard = event => {
      if(event.key === 'Escape') { setImage(null);setConfirm(false); }
      if(event.key === 'Tab') {
        const items=focusable(), first=items[0], last=items.at(-1);
        if(event.shiftKey && document.activeElement===first) {event.preventDefault();last?.focus();}
        else if(!event.shiftKey && document.activeElement===last) {event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',keyboard);
    return()=>{document.removeEventListener('keydown',keyboard);previous?.focus();};
  }, [modalOpen]);
  const dirty = docs ? Object.keys(schema).filter(s=>docs[s]?.draft && schema[s]?.fields?.some(f=>values[f.key]!==docs[s].draft[f.key])) : [];
  const pending = docs ? Object.keys(schema).filter(s=>docs[s]?.published && schema[s]?.fields?.some(f=>values[f.key]!==docs[s].published[f.key])) : [];
  useEffect(()=>{ const warn=e=>{e.preventDefault();e.returnValue='';}; if(dirty.length) window.addEventListener('beforeunload',warn); return()=>window.removeEventListener('beforeunload',warn); },[dirty.length]);
  function change(name,value) { if(values[name] === value) return; setValues(old=>({...old,[name]:value}));setSelected(fields[name].section);setStatus('Unsaved changes'); }
  async function save(publish=false) {
    setBusy(true);setConfirm(false);let current={...docs};
    try {
      for(const section of dirty) {
        const sectionValues=Object.fromEntries(schema[section].fields.map(f=>[f.key,values[f.key]]));
        const data=await api(`content/${section}`,'PATCH',{revision:current[section].revision,values:sectionValues});
        current={...current,[section]:data.section};setDocs(current);
      }
      if(publish) for(const section of pending) { const data=await api(`content/${section}/publish`,'POST',{revision:current[section].revision});current={...current,[section]:data.section};setDocs(current); }
      setStatus(publish ? 'Changes published to the website.' : 'Draft saved. Visitors still see the published website.');
    } catch(error) { setStatus(`${error.message} Completed sections remain saved. Your remaining edits are kept here.`); }
    finally {setBusy(false);}
  }
  async function login(e) {e.preventDefault();setBusy(true);setStatus('');try{const data=await api('login','POST',{password});setPassword('');setCsrf(data.csrf);await load(data.csrf);}catch(error){setStatus(error.message);}finally{setBusy(false);}}
  async function logout() { if(dirty.length && !window.confirm('Discard unsaved changes and sign out?')) return;setBusy(true);try{await api('logout','POST',{});setDocs(null);setCsrf('');setValues(defaults);setStatus('Signed out.');}catch(error){setStatus(error.message);}finally{setBusy(false);}}
  if(isEditor && !docs) return <main className="editor-login"><form onSubmit={login}><a href="/">The World Migration ↗</a><p className="editor-eyebrow">WEBSITE EDITOR</p><h1>Your website.<br/>Your words.</h1><p>Sign in to edit text and images directly on your website. Save privately, then publish when ready.</p><label htmlFor="editor-password">Editor password</label><input id="editor-password" type="password" autoComplete="current-password" minLength={12} maxLength={128} required value={password} onChange={e=>setPassword(e.target.value)}/><button disabled={busy || !ready}>{!ready ? 'Checking session…' : busy ? 'Signing in…' : 'Sign in to edit'}</button><p role="status">{status}</p><a href="/admin.html">Reviews & enquiries admin</a></form></main>;
  const editor=docs ? {fields,preview,change,select:name=>setSelected(fields[name].section),editImage:(name,altName)=>setImage({name,altName,url:values[name],alt:altName ? values[altName] : ''})} : null;
  return <ContentContext.Provider value={values}><EditorContext.Provider value={editor}>
    {docs && <div className="editor-toolbar" inert={Boolean(image || confirm)}><div><strong>Website editor</strong><small>{preview ? 'Preview · draft content' : `Click text or an image to edit · ${schema[selected].title}`}</small></div><button onClick={()=>setPreview(!preview)}>{preview ? 'Continue editing' : 'Preview'}</button><button disabled={busy || !dirty.length} onClick={()=>save()}>Save draft{dirty.length ? ` (${dirty.length})` : ''}</button><button className="editor-primary" disabled={busy || !pending.length} onClick={()=>setConfirm(true)}>Publish changes</button><button disabled={busy} onClick={logout}>Sign out</button><p role="status">{status || 'Drafts are private until published.'}</p></div>}
    <div inert={Boolean(image || confirm)} className={docs ? 'editor-site' : undefined} onClickCapture={e=>{if(docs && !preview && e.target.closest('[data-editable]')) e.preventDefault();}} onSubmitCapture={e=>{if(docs) {e.preventDefault();e.stopPropagation();setStatus('Forms are disabled while editing or previewing.');}}}>{children}</div>
    {image && <div className="editor-modal"><form role="dialog" aria-modal="true" aria-label="Edit image" onSubmit={e=>{e.preventDefault();change(image.name,image.url);if(image.altName) change(image.altName,image.alt);setImage(null);}}><h2>Edit image</h2><label>Image address<input autoFocus type="text" maxLength={500} value={image.url} onChange={e=>setImage({...image,url:e.target.value})}/></label><p>Use an /assets/ path or an images.unsplash.com/photo-… HTTPS address. Leave blank for the original image.</p>{image.altName && <label>Image description<input required maxLength={180} value={image.alt} onChange={e=>setImage({...image,alt:e.target.value})}/></label>}<button type="button" onClick={()=>setImage(null)}>Cancel</button><button>Apply to draft</button></form></div>}
    {confirm && <div className="editor-modal"><section role="dialog" aria-modal="true" aria-label="Publish changes"><h2>Publish your changes?</h2><p>Visitors will see updates to {pending.map(s=>schema[s].title).join(', ')}.</p><button autoFocus onClick={()=>setConfirm(false)}>Keep editing</button><button onClick={()=>save(true)}>Publish now</button></section></div>}
  </EditorContext.Provider></ContentContext.Provider>;
}
