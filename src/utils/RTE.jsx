
import {Controller} from 'react-hook-form';
import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

const RTE = ({name,control,label,
defaultValue=""}) => {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
            {label}</label>}

        <Controller
        name={name || "report"}
        control={control}
        render={({field:{onChange}}) => (
            <Editor
            initialValue={defaultValue}
            init={{
                height:500,
                menubar:true,
                plugins:[
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "charmap",
                    "preview",
                    "fullscreen",
                    "isetdatetime",
                    "media",
                    "searchreplace",
                    "link",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | help" ,
                content_style: "body {font-size:14px}"
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE


// aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x