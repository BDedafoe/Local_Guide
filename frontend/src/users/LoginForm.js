import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../auth/authSlice';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <h3>Please sign in to your account</h3>
            <Form className="register-form">
                <div className="form-group">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <button type="submit" className="btn-block" onClick={e => onSubmit(e)}>Submit</button>
                </div>
            </Form>
        </div>
    );
}

export default LoginForm;