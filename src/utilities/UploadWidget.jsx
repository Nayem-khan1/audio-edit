import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dbc7aucky",
      uploadPreset: "insertAudio"
    }, function(error, result){
        console.log(result)
        if(!error && result && result.event === "success"){
          console.log(result.info.secure_url);
        }
    });


  }, [])

  return (
    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  )

}

export default UploadWidget;

