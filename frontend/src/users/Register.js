import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../auth/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const { password, password2 } = formData
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{ user, status, error, message } = useSelector(state => state.auth);

    useEffect(() => {
        document.title = 'Register';
        if(error !== null) {
            toast.error(message);
            console.log(status)
            dispatch(reset());
            navigate('/register', { replace: true });
        }
        if (user) {
            toast.success(message);
            navigate('/login');
        }
        //dispatch(reset());


    }, [user, error, status, message, navigate, dispatch]);

    const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match');
            console.log('Passwords do not match');
            dispatch(reset());
        } else {
            const newUser = formData;
            console.log(newUser);
            dispatch(register(newUser));
        }
    };

    
    return (
        <div className="register-container">
            <h1>Register</h1>
            <h3>Please create an account</h3>
            <form className="register-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter username"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email"
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter password"
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">    
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password2" 
                        placeholder="Confirm password"
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-block" onClick={e => onSubmit(e)}>Submit</button>
                </div>
            </form>    
                
        </div>
    )
}

export default Register