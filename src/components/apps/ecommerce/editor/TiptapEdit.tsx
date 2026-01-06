import  { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight/lib/core'; // Syntax highlighting for code block
// import { Button, Icon } from 'react-feather'; // Optional, for icons in toolbar
import { Underline } from '@tiptap/extension-underline';
import { OrderedList } from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

// Add your own styles (optional)
import './Tiptap.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Underline,
      OrderedList,
      OrderedList,
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '<p>Start typing...</p>',
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  // Toolbar button click handlers
  const handleBold = () => editor?.chain().focus().toggleBold().run();
  const handleItalic = () => editor?.chain().focus().toggleItalic().run();
  const handleUnderline = () => editor?.chain()?.focus()?.toggleUnderline()?.run();
  const handleH1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run();
  const handleH2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
  const handleH3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run();
  const handleList = () => editor?.chain().focus().toggleBulletList().run();
  const handleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const handleLink = () => {
    const url = prompt("Enter a URL");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };
  const handleImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };
  const handleCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
  const handleUndo = () => editor?.chain().focus().undo().run();
  const handleRedo = () => editor?.chain().focus().redo().run();

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar flex gap-5">
        <button onClick={handleBold}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:bold" /></button>
        <button onClick={handleItalic}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:italic" /></button>
        <button onClick={handleUnderline}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:underline" /></button>
        <button onClick={handleH1}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H1</span></button>
        <button onClick={handleH2}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H2</span></button>
        <button onClick={handleH3}><span className='text-sm font-medium text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' >H3</span></button>
        <button onClick={handleList}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:list" /></button>
        <button onClick={handleOrderedList}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:list-numbers" /></button>
        <button onClick={handleLink}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:link" /></button>
        <button onClick={handleImage}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:image-in-picture" /></button>
        <button onClick={handleCodeBlock}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:code" /></button>
        <button onClick={handleUndo}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:u-turn-left" /></button>
        <button onClick={handleRedo}><Icon className='text-lg font-semibold text-dark dark:text-bodytext hover:text-primary dark:hover:text-primary' icon="tabler:u-turn-right" /></button>
      </div>

      {/* Editor content area */}
      <EditorContent editor={editor} />

      {/* Displaying the raw HTML content for testing */}
      <div className="output">
        <h3>Output</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

export default MyEditor;
