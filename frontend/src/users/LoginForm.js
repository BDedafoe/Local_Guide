import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../auth/authSlice';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, status, error, message } = useSelector(state => state.auth);

    useEffect(() => {
        document.title = 'Login';
        if (error !== null) {
            toast.error(message);
            console.log(status)
            dispatch(reset());
        }
        if (user) {
            toast.success(message);
            navigate('/');

        }
        
        }, [user, error, status, message, navigate, dispatch]);
    
    
    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });
    const onSubmit = e => {
        e.preventDefault()
        console.log(formData);
        dispatch(login(formData));
    };



    
    
    return (
        <div className="login-container">
            <h1>Login</h1>
            <FaSignInAlt />
            <h3>Please sign in to your account</h3>
            <form className="register-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <button type="submit" className="btn-block" onClick={e => onSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;