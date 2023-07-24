import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import logo from '../../assets/audiomack.svg'
import './Navbar.css'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    
    const logOutHandler = () => {
        logOut()
        .then(()=> {

        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='relative'>
            <header className='w-full flex justify-between items-center p-4 px-8 fixed top-0 z-10'>
                <div className='flex items-center cursor-pointer'>
                    <img className='w-16 mr-5' src={logo} alt="" />
                    <p className='font text-2xl font-semibold text-orange-400'>Quickly Edit Music</p>
                </div>
                <div>
                    <nav>
                        <ul className='flex'>
                            <li className='mr-5'><Link to="/home"  className='font-semibold border-solid border-2 border-red-300 p-2 rounded-lg hover:border-gray-200 hover:text-red-200'> Home</Link></li>
                            {
                                user?.email ? <><li onClick={logOutHandler} ><Link to="/"  className='font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-gray-200 hover:text-blue-400'  >Log Out</Link></li></> : <><li><Link to="/" className='font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-gray-200 hover:text-blue-400'  onClick={()=>window.my_modal_1.showModal()}>Log In</Link></li></>
                            }
                            
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;