import React from 'react'

const PreviewImage = ({file}) => {
    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    }
  return (
    <div>
        {preview ? <img src={preview} alt="preview" width="100px" height="100px"/> : "loading..."}
    </div>
  )
}

export default PreviewImage