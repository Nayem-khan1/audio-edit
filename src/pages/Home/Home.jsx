import { useState } from 'react';
import Footer from '../../components/Navbar/Footer/Footer';

const Home = () => {
    const [audioUrl, setAudioUrl] = useState(null)
    const [masterAudioUrl, setMasterAudioUrl] = useState(null);
    const [childFile, setChildFile] = useState(null);

    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dbc7aucky",
            uploadPreset: "insertAudio"
        },
        (error, result) => {
            console.log(result)
            if (!error && result && result.event === "success") {
                console.log(result.info.secure_url);
                setAudioUrl(result?.info?.secure_url);
            }
        }
    );

    const masterFileHandler = () => {
        setMasterAudioUrl(audioUrl);
        setAudioUrl(null);
    }

    const childFileHandler = () => {
        setChildFile(audioUrl);
        audioUrl(null);
    }
    const submitHandler = (event) => {
        event.preventDefault()
       
        const timeMinute = event.target.minute.value;
        const timeSecond = event.target.second.value;
        const youtubeAPI = event.target.youtubeAPI.value;

        const allInfo = {
            masterFileData: {
                secure_url: masterAudioUrl,
            },
            childFileData: {
                secure_url: childFile,
            },
            timeMinute,
            timeSecond,
            youtubeAPI,
        }

        

        fetch("http://localhost:5000/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(allInfo),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((er) => console.log(er));

    }
    return (
        <div className='mt-28'>
            <div className='bg-[#2e313d] w-1/2 mx-auto py-10 rounded-xl'>
                <div className='flex flex-col justify-center items-center'>
                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-center">Pick a master audio file</span>
                            </label>
                            <input
                                
                                type="file"
                                name="masterFile" 
                                className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div onClick={() => myWidget.open()}>
                            <button onClick={masterFileHandler}>Upload</button>
                        </div>
                        <div className="form-control w-full max-w-xs mt-5">
                            <label className="label">
                                <span className="label-text ">Pick a child audio file</span>
                            </label>
                            <input 
                                type="file"
                                name="childrenFile" 
                                className="file-input file-input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text ">Inserted time</span>
                            </label>
                            <div className='flex'> 
                                <input type="text" name='minute' placeholder="0 minute" className="input input-bordered w-full max-w-xs mr-4" required/>
                                <input type="text" name='second' placeholder="0 second" className="input input-bordered w-full max-w-xs" required/>
                            </div>
                        </div>

                        <div onClick={() => myWidget.open()}>
                            <button onClick={childFileHandler}>Upload</button>
                        </div>

                        <div className="form-control w-full max-w-xs mt-5">
                            <label className="label">
                                <span className="label-text">Youtube API</span>
                            </label>
                            <input type="text" name='youtubeAPI' placeholder="Youtube API" className="input input-bordered w-full max-w-xs" required/>
                        </div>
                        <div className='w-full text-center mt-5'>
                            <input className="btn btn-outline" type="submit" value="submit" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;