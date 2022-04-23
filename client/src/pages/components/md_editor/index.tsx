import React from 'react'

import SimpleMDE from 'react-simplemde-editor';
import '@/styles/easymde.css';

import { translateMarkdown } from '@/utils/markdown';

function MdEditor(props: any) {

  return (
    <SimpleMDE
      value={props.value}
      onChange={props.onChange}
      options={
        {
          autofocus: false,
          autosave: {
            uniqueId: '111'
        }
        // previewRender: translateMarkdown
       }}
    />
  )
}

export default MdEditor;
