import { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { login } from '../../hooks/useAuth'
import AppContext from '../../app/context/appContext'
function Login() {
   const {setRole ,Role , isLoggedIn , setIsLoggedIn} =  useContext(AppContext);
   console.log("is loggedin login=>", isLoggedIn);
    const INITIAL_LOGIN_OBJ = {
        password: "",
        employeeEmail: ""
    }
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [showError, setShowError] = useState(false);

    // const submitForm = async (e) => {
    //     e.preventDefault()
    //     setErrorMessage("")

    //     if (loginObj.employeeEmail.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
    //     if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
    //     else {
    //         const response = await login(loginObj)
    //         console.log(response);
    //         setLoading(true)
    //         if(!response){
    //             console.log("invalid credential");
    //         }
    //         else{
    //             localStorage.setItem("role", response?.role)
    //             localStorage.setItem("token", 1)
    //             setRole(response?.role)
    //             setLoading(false)
    //             window.location.href = '/app/welcome'
    //         }

    //     }
    // }

    const submitForm = async (e) => {
        setShowError(false)
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.employeeEmail.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            const response = await login(loginObj)
            // //debugger
            console.log(response);
            // console.log(response?.role);
            setLoading(true)
            localStorage.setItem("role", response?.role?.role)
            //debugger
            localStorage.setItem("userId", response?.role?.userId)
            localStorage.setItem("token", 1)
            //debugger
            console.log("setRole is" , Role);
            setRole(response?.role)
            //debugger
            setIsLoggedIn(true)
            console.log("islogin is" , isLoggedIn);
            setLoading(false)
            window.location.href = '/app/welcome'
        }
        if (loginObj.password.trim() === "") {
            setErrorMessage("Password is required! (use any value)");
            return;
        }

        setLoading(true);
        try {
            //debugger
            const response = await login(loginObj);
            //debugger
            setErrorMessage("Login failed. Please check your credentials.");
            setLoading(false);
            //debugger
            // if(response){
            //     setShowError(false)
            // }
            localStorage.setItem("role", response.role);
            localStorage.setItem("token", 1);
            window.location.href = '/app/welcome';
        } catch (error) {
            setShowError(true)
            console.log("An error occurred during login:", error);
            setErrorMessage("Login failed. Please try again.");
            setLoading(false);
        }
    };


    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        {showError && <p className='text-white bg-red-600 p-2 text-center'> invalid credential </p>}
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="employeeEmail" defaultValue={loginObj.employeeEmail} updateType="employeeEmail" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login