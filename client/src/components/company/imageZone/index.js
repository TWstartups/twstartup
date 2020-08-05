import React, { useCallback } from 'react'
// import ReactDOM from 'react-dom'
import superagent from 'superagent'
import qs from 'query-string';
import './index.scss'

import {useDropzone} from 'react-dropzone'

const ImageZone = ({ type, src, className, identifier='company_image_update', editable=false, companyId }) => {
    const onDrop = useCallback(files => {
    if(!editable) return;
    const f = files[0];
    const apiEndPoint = `${process.env.REACT_APP_API_URL}/api/company/image?${qs.stringify({type, companyId})}`;
    const token = localStorage.getItem('token');
    // upload to api
    superagent
      .post(apiEndPoint)
      .set('authorization', `bearer ${token}`)
      .attach(identifier, f)
      .end((err, res) => {
        if (err) return console.error(err);
        console.log(res.body);
      })
  // eslint-disable-next-line
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  console.log((editable))
  return (
    <div>
      <div className={`image-zone-component ${className} editable-${editable}`}>
        {editable && <div className={`dropzone-layer ${isDragActive}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={`dropzone`}>
            <i className="cloud upload icon"></i>
            <div className='upload-text'>upload</div>
          </div>
        </div>}
        <img alt={identifier} src={src}></img>
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

export default ImageZone;
