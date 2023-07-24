import { useState } from 'react';
import Footer from '../../components/Navbar/Footer/Footer';

const Home = () => {
    const [childAudioDataList, setChildAudioDataList] = useState([
        {
            "url": "sdfsdf",
            "min": 23,
            "sec": 35
        },
        {
            "url": "sdfsdf",
            "min": 23,
            "sec": 35
        },
        {
            "url": "sdfsdf",
            "min": 23,
            "sec": 35
        },
        {
            "url": "sdfsdf",
            "min": 23,
            "sec": 35
        }
    ]);
    let childAudioUrl = null;
    let [masterAudioUrl, setMasterAudioUrl] = useState();
    let [youtubeApi, setYoutubeApi] = useState();
    let masterClicked = false;

    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dbc7aucky",
            uploadPreset: "insertAudio"
        },
        (error, result) => {
            console.log(result)
            if (!error && result && result.event === "success") {
                const url = result?.info?.secure_url;
                console.log(url);
                if (masterClicked) {
                    setMasterAudioUrl(url);
                } else {
                    childAudioUrl = url;
                }
            }
        }
    );

    const submitHandler = (event) => {
        event.preventDefault()

        const timeMinute = event.target.minute.value;
        const timeSecond = event.target.second.value;
        const youtubeAPI = event.target.youtubeAPI.value;

        const allInfo = {
            masterAudioUrl,
            childFileData: childAudioDataList,
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
    const addHandler = (event) => {
        event.preventDefault()
        setYoutubeApi(event.target.youtubeAPI.value)
    }
    const addChildHandler = (event) => {
        event.preventDefault()
        setYoutubeApi(event.target.youtubeAPI.value)
    }
    return (
        <div className='mt-28 2xl:mt-36'>
            <div className="mb-10 2xl:mb-20">
                <h2 className="text-center text-4xl text-gray-300">Use the audio combination to edit your music quickly.</h2>
            </div>
            <div className='bg-[#2e313d] w-1/2 mx-auto py-10 rounded-xl'>

                <div className='flex flex-col justify-center items-center'>

                    {masterAudioUrl ? <>
                        <div className="form-control w-full max-w-xs mt-5">
                            <input type="text" name='youtubeAPI' placeholder="Youtube API" className="input input-bordered w-full max-w-xs" required/>
                        </div>
                        <div className='w-full text-center mt-5'>
                            <input className="btn btn-outline" type="submit" value="Add" />
                        </div>
                    </> ? ( <>
                            <div>{masterAudioUrl}</div>
                            <div>{youtubeApi}</div>
                            <form onSubmit={submitHandler}>
                                <div className="form-control w-full max-w-xs mt-5">
                                    <label className="label">
                                        <span className="label-text ">Pick a child audio file</span>
                                    </label>
                                    <button onClick={() => {
                                        myWidget.open();
                                        masterClicked = false;
                                    }}>Select Audio</button>
                                    <input type="text" name='minute' placeholder="0 minute" className="input input-bordered w-full max-w-xs mr-4" required/>
                                    <input type="text" name='second' placeholder="0 second" className="input input-bordered w-full max-w-xs" required/>
                                </div>

                                <div className='w-full text-center mt-5'>
                                    <input className="btn btn-outline" type="submit" value="Add Child" />
                                </div>
                            </form>
                        </>
                    ) : (<>
                        <form onSubmit={addHandler}>
                            <button onClick={() => {
                                myWidget.open();
                                masterClicked = true;
                            }}>Pick a master audio file</button>
                            <div className="form-control w-full max-w-xs mt-5">
                                <input type="text" name='youtubeAPI' placeholder="Youtube API" className="input input-bordered w-full max-w-xs" required/>
                            </div>
                            <div className='w-full text-center mt-5'>
                                <input className="btn btn-outline" type="submit" value="Add" />
                            </div>
                        </form>
                    </>)
                        }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;