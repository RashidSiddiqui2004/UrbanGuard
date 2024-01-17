import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../loader/Loader';
import CommunityForumPoster from '../posters/CommunityForumPoster';


const Mobileposter1 = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/xiakv9qelywtgkjcujtw.png";
const Mobileposter2 = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/mztjmbz6liswerp5cdi8.png";
const desktopImage = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042855/tsjzffj80djfqy2ixjrz.png";


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const { profiles, setProfiles } = context;

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(loading)
        }

    }

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);

            setProfiles({
                ...profiles,
                email: user.email,
                userid: user.uid,
                fullname: user.name,
            });


            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            await login();

        } catch (error) {
            console.log(error)

            if (password.length < 6) {
                toast.info("Password should consist of atleast 6 chars", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setLoading(false);
            }

            else {
                toast.info("User already exits!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setLoading(false);
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='hidden lg:block lg:w-[60%]'>

                <div className="hidden lg:flex lg:flex-row mt-16 justify-center gap-16">
                    <div className='w-[20%]'>
                        <img src={Mobileposter1} alt="UI-Mobile" srcSet="" className="rounded-lg shadow-md shadow-purple-300" />
                        <p className="text-sm text-center mt-4 italic font-serif">Mobile Version</p>
                    </div>

                    <div className='w-[20%]'>
                        <img src={Mobileposter2} alt="UI-Mobile2" srcSet="" className="rounded-lg shadow-md shadow-purple-300" />
                        <p className="text-sm text-center mt-4 italic font-serif">Mobile Version (Posts)</p>
                    </div>

                    <div className='w-[40%]'>
                        <h1 className='text-3xl mt-[5%] italic font-serif text-slate-400'>Welcome to Urban Guard!</h1>
                        <h1 className='text-xl my-8 italic font-serif'>
                            "Urban Guard is a comprehensive safety and emergency management application designed for urban environments. The application aims to enhance community safety.
                        </h1>
                        <h1 className='text-xl my-8 italic font-serif'>
                            Building a Positive Environment – Our forum embraces positivity! Let's create a space where we uplift, support, and inspire each other on Urban Guard."
                        </h1>
                    </div>
                </div>


                {/* <div className="hidden lg:flex lg:flex-row mt-16 justify-center gap-16">

                    <div className='w-[45%]'>
                        <img src={desktopImage} alt="UI-Mobile2" srcSet=""
                            className="rounded-lg shadow-md shadow-purple-300 w-[600px] h-[500px]" />

                        <p className="text-sm text-center mt-4 italic font-serif">Desktop Version</p>
                    </div>

                    <div className='w-[40%]'>
                        <h1 className='text-5xl mt-[20%] italic font-serif text-green-400'>Responsible Posting</h1>
                        <h1 className='text-4xl  my-8 italic font-serif'>"Responsible Posting Encouraged! Share responsibly, respect others' opinions, and keep our discussions constructive."</h1>

                        <Link to={'/community-forum-intro'}>
                            <button className='flex justify-center bg-blue-300 text-slate-800
    px-16 py-4 text-4xl mt-8
    shadow-sm shadow-neutral-400 border-green-400 hover:scale-[102%]
    transition-all'>
                                Get Started</button>
                        </Link>

                    </div>

                </div> */}

            </div>

            {loading && <Loader />}
            <div className='bg-gray-800 px-10 rounded-xl py-10'>
                <div className="flex justify-center merriweather mb-5">
                    <img src="/logo.jpg" alt="Urban Guard Logo"
                        className="w-12 h-12 rounded-full mb-2 ml-10" />
                    <h1 className="text-xl font-semibold mt-3 ml-2">Urban Guard</h1>
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup