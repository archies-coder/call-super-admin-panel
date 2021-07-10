import React, { useCallback } from 'react'
import { FileDrop } from 'react-file-drop'
import { useDropzone } from 'react-dropzone'

export default function FileUploadArea({ Icon, onDrop }) {
    const styles = { border: '1px dashed black', width: 'auto', color: 'black', padding: 20, margin: 20, textAlign: 'center' }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>
            {/* <div style={styles}>
                <FileDrop
                    // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                    // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                    // onFrameDrop={(event) => console.log('onFrameDrop', event)}
                    // onDragOver={(event) => console.log('onDragOver', event)}
                    // onDragLeave={(event) => console.log('onDragLeave', event)}
                    onDrop={(files, event) => console.log('onDrop!', files, event)}
                >
                    {Icon ? <Icon size="80" /> : 'Drop some files here!'}
                </FileDrop>
            </div> */}
            <div {...getRootProps()} style={styles}>
                <input {...getInputProps()} />
                {Icon ? <Icon size="80" /> : 'Drop some files here!'}
            </div>
        </div>
    )
}
