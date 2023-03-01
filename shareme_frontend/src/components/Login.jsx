import { useNavigate } from 'react-router-dom';
import { faGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode'
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const createOrGetuser = async (response) => {
        const decoded = jwt_decode(response.credential)
        localStorage.setItem('user', JSON.stringify(decoded))
        const { name, sub, picture } = decoded;

        const doc = {
            _id: sub, 
            _type: 'user',
            userName: name,
            image: picture,
       
        }
        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true })
            })
    }
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <div className='flex justify-start items-center flex-col h-screen'>
                <div className='relative w-full h-full'>
                    <video
                        src={shareVideo}
                        type="video/mp4"
                        loop
                        controls={false}
                        muted
                        autoPlay
                        className="h-full w-full object-cover"
                    />
                    <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                        <div className='p-5'>
                            <img src={logo} width="130px" alt='logo' />
                        </div>
                        <div className='shadow-2xl'>
                            <GoogleLogin
                                onSuccess={(response) => createOrGetuser(response)}
                                onError={() => console.log('Error')}
                                cookiePolicy="single_host_origin"
                            />

                            {/* {user ? (<div>Logged In</div>)
                                : <GoogleLogin
                                    onSuccess={(response) => createOrGetuser(response)}
                                    onError={() => console.log('Error')}
                                />
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login