import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler} from '../redux/authActions';


const UserSignupPage = (props) => {
    const [ form, setForm ] = useState({
        username:null,
        displayName: null,
        password: null,
        passwordRepeat:null,
    });
    const [ errors, setErrors ] = useState({
        username:'you name',
        displayName: 'you display name',
        password: 'enter your password'
    });
    const dispatch = useDispatch();
   
    const  onChange = (event) => {
        const { name, value } = event.target;

        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
        // const formCopy = { ...form };
        // formCopy[ name ] = value;
        // setForm(formCopy); 
    };
    const onClickSignup = async event => {
        event.preventDefault();
    
        const { history } = props;
        const {push} = history;

        const {username , displayName , password} = form;

        const body = {
            username,
            displayName,
            password
        };
        //btn ilk clik edeni nezere alacaq,btn de disabled elemek lazimdir
        try {
        await dispatch(signupHandler(body));  
        push('/');
        }catch(error){
        //bu mesaj backendden heqiqi xeta alanda yazacaq.
            if( error.response.data.validationErrors) {
                setErrors( error.response.data.validationErrors );
            }
        }
    };
    //bu pendingApiCall yazanda asagida btn this.state yazmaga ehtiyyac qalmir.    
    const {
        username: usernameError, displayName: displayNameError, 
        password: passwordError } = errors;
    
    const pendingApiCallSignUp = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post','/api/1.0/auth');
    
    const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;
    const { t } = useTranslation();

    let passwordRepeatError;
    if(form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch');
    };

    return (
        <div className="container">
        <form>
            <h1 className="text-center">{t('Sign Up')}</h1>
            <Input name="username" label={t("Username")} error={usernameError} onChange={onChange}/>
            <Input name="displayName" label={t("Display Name")} error={displayNameError} onChange={onChange} />
            <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type ="password"/>
            <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} onChange={onChange} type="password"/>
        {/* <div className="form-group">
        <label>Username</label>
        <input className="form-control is-invalid" name="username" onChange={this.onChange}/>
        <div className="invalid-feedback">{this.state.errors.username}Username cannot be null</div>
        </div> */}
        {/* <div>
        <label>Display Name</label>
        <input className="form-control" name="displayName" onChange={this.onChange}/>
        </div> */}
        {/* <div>
        <label>Password</label>
        <input className="form-control" name="password" type="password" onChange={this.onChange}/>
        </div> */}
        {/* <div>
        <label>Password Repeat</label>
        <input className="form-control" name="passwordRefeat" type="password" onChange={this.onChange} />
        </div> */}
            <div className = "text-center">
                <ButtonWithProgress 
                  onClick={onClickSignup}
                  disabled = {pendingApiCall || passwordRepeatError !== undefined}
                  pendingApiCall={pendingApiCall}
                  text = {t('Sign Up')}
                />  
            </div>
        </form> 
        </div>
    );
    
}
//Higher Order Component deyilir.menim componenti basqa componente yerlesdirib daha cox seyler goturmek olur. 


export default UserSignupPage;
//npm install axios
//npm install booststrap
//npm install scss
//npm install react-i18next i18next --save
//npm install react-router-dom
//npm install secure-ls
//npm install redux-thunk
//npm install timeago.js