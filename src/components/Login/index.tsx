import React, { FormEvent, useRef, useState, SyntheticEvent } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useStateValue } from "../../context";
import { loginSucceeded, loading, loginFail } from "../../context/actions";
import { HOME_PATH, IS_LOGGED_IN } from "../../configs/constants";
import { ILoginProps } from "../../types/Components";
import checkAuth from '../../middleware/checkAuth';
import Loader from '../Loader';




const Login = ({ history }: ILoginProps) => {

    // eslint-disable-next-line
    const [{ isLoggedIn }, dispatchAuth]: any = useStateValue();
    const [{ isLoading }, dispatchLoading]: any = useStateValue();

    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [requestError, setRequestError] = useState('');

    const emailEl = useRef(null);
    const passwordEl = useRef(null);


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const emailVal: string = emailEl.current.value;
        const passwordVal: string = passwordEl.current.value;

        dispatchLoading(loading(true));
        const auth = await checkAuth(emailVal, passwordVal);
        if (auth) {
            dispatchAuth(loginSucceeded());
            history.push(HOME_PATH);
            localStorage.setItem(IS_LOGGED_IN, 'true');
        }
        else {
            dispatchAuth(loginFail());

            setRequestError('Неверный логин или пароль');
            setErrorPassword('');
            setErrorEmail('');
            passwordEl.current.style.borderColor = '#1a237e';
            emailEl.current.style.borderColor = '#1a237e';
        }

        dispatchLoading(loading(false));
    }


    const handleEmailValidation = (e: SyntheticEvent) => {
        e.preventDefault();
        emailEl.current.style.borderColor = 'red'
        passwordEl.current.style.borderColor = '#1a237e';
        emailEl.current.value ? setErrorEmail('Неверный логин') : setErrorEmail('требуется е-мейл')
        setErrorPassword('');
        setRequestError('');
    }


    const handlePasswordValidation = (e: SyntheticEvent) => {
        e.preventDefault();
        emailEl.current.style.borderColor = '#1a237e';
        passwordEl.current.style.borderColor = 'red';
        passwordEl.current.value ? setErrorPassword('Неверный пароль') : setErrorPassword('требуется пароль')
        setErrorEmail('');
        setRequestError('');
    }

    if (isLoading) return (
        <Loader />
    )



    return (
        <div className='login'>
            <div className='login-header'>
                Вход в личный кабинет
            </div>
            <div className='login-main'>
                <form onSubmit={handleSubmit}>
                    <div className='login-main-email'>
                        <label htmlFor="email">Логин</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            required
                            ref={emailEl}
                            defaultValue={"test@mail.ru"}
                            onInvalid={handleEmailValidation}
                        />
                        <label className='login-main-error'>{errorEmail}</label>
                    </div>
                    <div className='login-main-password'>
                        <label htmlFor="password">Пароль</label>
                        <input
                            defaultValue={"TestPassword123_"}
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            required
                            ref={passwordEl}
                            onInvalid={handlePasswordValidation}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}" />
                        <label className="login-main-error">{errorPassword}</label>
                    </div>
                    <button type="submit"> Вход <FaLongArrowAltRight /></button>
                </form>
                <p>{requestError}</p>
            </div>
        </div>
    )
}

export default Login;
