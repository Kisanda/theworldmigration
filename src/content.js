import { createContext, useContext } from 'react';
import schema from '../content-schema.json';
export { schema };
export const defaults = Object.fromEntries(Object.values(schema).flatMap(section => section.fields.map(field => [field.key, field.default])));
export const ContentContext = createContext(defaults);
export const EditorContext = createContext(null);
export const useContent = () => useContext(ContentContext);
export const useEditor = () => useContext(EditorContext);
