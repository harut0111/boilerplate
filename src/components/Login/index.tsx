import React, { FormEvent, useRef, useState, SyntheticEvent } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useStateValue } from "../../context";
import API from "../../api";
import { loginSuccess } from "../../context/actions";
import {HOME_PATH, IS_LOGGED_IN} from "../../configs/constants";
import {ILoginProps} from "../../types/Components";

const Login = ({history}: ILoginProps) => {

    // eslint-disable-next-line
    const [{ isLoading }, dispatch]: any = useStateValue();
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, seterrorPassword] = useState<string>('');
    const [requestError, setRequestError] = useState('');

    const emailEl = useRef(null);
    const passwordEl = useRef(null);


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const emailVal = emailEl.current.value;
        const passwordVal = passwordEl.current.value;


        const response = await API.signIn(emailVal, passwordVal);
        const signIn = await response.json();

        if (signIn.result === 'ok') {
            dispatch(loginSuccess);
            localStorage.setItem(IS_LOGGED_IN, String(true));
            history.push(HOME_PATH)
        } else {
            setRequestError('Неверный логин или пароль');
            seterrorPassword('');
            setErrorEmail('');
            passwordEl.current.style.borderColor = '#1a237e';
            emailEl.current.style.borderColor = '#1a237e';
        }
    }

    const handleEmailValidation = (e: SyntheticEvent) => {
        e.preventDefault();
        emailEl.current.style.borderColor = 'red'
        passwordEl.current.style.borderColor = '#1a237e';
        emailEl.current.value ? setErrorEmail('Неверный логин') : setErrorEmail('требуется е-мейл')
        seterrorPassword('');
        setRequestError('');
    }


    const handlePasswordValidation = (e: SyntheticEvent) => {
        e.preventDefault();
        emailEl.current.style.borderColor = '#1a237e';
        passwordEl.current.style.borderColor = 'red';
        passwordEl.current.value ? seterrorPassword('Неверный пароль') : seterrorPassword('требуется пароль')
        setErrorEmail('');
        setRequestError('');
    }



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
