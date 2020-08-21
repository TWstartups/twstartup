import React, { useCallback, useState } from 'react'
import superagent from 'superagent'
import qs from 'query-string'
import './index.scss'

import { useDropzone } from 'react-dropzone'

const ImageZone = (props) => {
  const { src, className, identifier = 'company_image_update', editable = false, query = {}, style = {}, dimension = {} } = props
  const [imgSrc, setImgSrc] = useState('')
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback((files, editable, query) => {
    if (!editable) return
    setUploading(true)
    const f = files[0]
    const apiEndPoint = `${process.env.REACT_APP_API_URL}/api/company/image?${qs.stringify(query)}`
    const token = localStorage.getItem('tw_token')
    // upload to api
    superagent
      .post(apiEndPoint)
      .set('authorization', `bearer ${token}`)
      .attach(identifier, f)
      .end((err, res) => {
        if (err) return console.error(err)
        setUploading(false)
        setImgSrc(res.body.result)
      })
  // eslint-disable-next-line
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: (f) => onDrop(f, editable, query) })
  return (
    <div>
      <div {...props} className={`image-zone-component ${className} editable-${editable}`} style={style}>
        {editable && <div className={`dropzone-layer ${isDragActive} isUploading-${uploading}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='dropzone'>
            {!uploading && <div><i className="cloud upload icon"></i></div>}
            {!uploading && <div className='upload-text'>upload</div>}
            {!uploading && <div className='upload-text-dimension'>{dimension.width || 200} x {dimension.height || 200}</div>}
            {uploading && <div className='uploadingzone'>
              <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
              </div>
            </div>}
          </div>
        </div>}
        <img alt={identifier} src={imgSrc || src}></img>
      </div>
    </div>
  )
}

// const Modal = ({ type, identifier, editable, setModal, companyId }) => {
//   const onDrop = useCallback(files => {
//     if(!editable) return;
//     const f = files[0];
//     const apiEndPoint = `${process.env.REACT_APP_API_URL}/api/utils/upload-to-s3?${qs.stringify({type, companyId})}`;
//     const token = localStorage.getItem('token');
//     // upload to api
//     superagent
//       .post(apiEndPoint)
//       .set('authorization', `bearer ${token}`)
//       .attach(identifier, f)
//       .end((err, res) => {
//         if (err) return console.error(err);
//         console.log(res.body.result);
//       })
//   // eslint-disable-next-line
//   }, [])

//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

//   return ReactDOM.createPortal(
//     <div onClick={() => setModal(false)} className="ui dimmer modals visible active image-modal-layer">
//       <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active image-modal-container">
//         <div className='dropzone-container' {...getRootProps()}>
//           <input {...getInputProps()} />
//           <div className={`${isDragActive}-dropping dropzone`}>
//             <div className='upload-icon'><i className="cloud upload icon"></i></div>
//             <div className='upload-text'>Upload {type}</div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.querySelector('#modal')
//   )
// }

export default ImageZone
