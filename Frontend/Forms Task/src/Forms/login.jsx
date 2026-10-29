import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { LoginAxiosFunction } from '../Services/API';

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required').max(128, 'Password is too long'),
  exampleCheck1: z.boolean(),
});

function Login(){
    const [submissionMessage, setSubmissionMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data) {
      setSubmissionMessage('');
      try {
        const response = await LoginAxiosFunction(data);
        const restrictedLogin = location.pathname.startsWith('/admin/') ||
          location.pathname.startsWith('/marketing/');
        if (restrictedLogin && !response.data.isAdmin) {
          setSubmissionMessage('This account does not have admin or marketing access.');
          return;
        }
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('userAccess', response.data.isAdmin ? 'admin' : 'customer');
        const destination = response.data.isAdmin
          ? location.pathname.startsWith('/marketing/')
            ? '/marketing'
            : '/admin'
          : '/customer';
        navigate(destination, { replace: true });
      } catch (error) {
        const responseMessage = error.response?.data?.message;
        setSubmissionMessage(
          responseMessage || error.message || 'Login failed. Please try again.',
        );
      }
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Login Form</h2>
<p className="text-center text-muted mb-4">Takes 60 seconds. We’ll analyze your business and send you a personalized AI automation roadmap within 24 hours.</p>

{/* Email */}
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email')}/>
  {errors.email && <span className="text-danger">{errors.email.message}</span>}
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>

{/* Pass */}
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1" {...register('password')}/>
  {errors.password && <span className="text-danger">{errors.password.message}</span>}
</div>

{/* Checkbox */}
  <div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="exampleCheck1" {...register('exampleCheck1')}/>
  <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default Login;