// components/TipTapEditor.jsx
import React, { useEffect, useState } from 'react';
import { BasePropertyProps } from 'adminjs';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TipTapEditor = (props: BasePropertyProps) => {
  const { record, property, onChange } = props;
  const [content, setContent] = useState(record?.params[property.path] || '');

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(property.path, html);
    },
  });

  useEffect(() => {
    if (record.params[property.path] !== content) {
      setContent(record.params[property.path] || '');
    }
  }, [record]);

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
