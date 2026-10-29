import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { RegistrationAxiosFunction } from '../Services/API';

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full Name must be at least 2 characters').max(60),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  industry: z.enum(['ecommerce', 'real-estate', 'consulting', 'clinic', 'other'], {
    error: 'Please select your industry',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters').max(64),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  exampleCheck1: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

function Registration(){
    const [submissionMessage, setSubmissionMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    async function onSubmit(data) {
      setSubmissionMessage('');
      try {
        await RegistrationAxiosFunction({
          fullName: data.fullName,
          username: data.email,
          email: data.email,
          phone: data.phone,
          industry: data.industry,
          password: data.password,
        });
        setSubmissionMessage('Registration submitted successfully.');
      } catch (error) {
        const responseMessage = error?.response?.data;
        setSubmissionMessage(
          typeof responseMessage === 'string'
            ? responseMessage
            : error?.message || 'Registration failed. Please try again.',
        );
      }
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Get Your Free AI Growth Plan</h2>
<p className="text-center text-muted mb-4">Takes 60 seconds. We’ll analyze your business and send you a personalized AI automation roadmap within 24 hours.</p>

{/* Name */}
<div className="mb-3">
  <label htmlFor="fullName" className="form-label">Full Name</label>
  <input type="text" className="form-control" id="fullName" placeholder="Full Name" {...register('fullName')}/>
  {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
</div>

{/* Email */}
  <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email')}/>
  {errors.email && <span className="text-danger">{errors.email.message}</span>}
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>

{/* Phone */}
<div className="mb-3">
  <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
  <input type="tel" className="form-control" id="phone" placeholder="Phone / WhatsApp" {...register('phone')}/>
  {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
</div>

 {/* Industry dropdown */}
 <div className="mb-3">
  <label htmlFor="industry" className="form-label">Services</label>
  <select className="form-select" id="industry" {...register('industry')}>
    <option value="">Select your industry</option>
    <option value="ecommerce">E-commerce</option>
    <option value="real-estate">Real Estate</option>
    <option value="consulting">Consulting</option>
    <option value="clinic">Clinics</option>
    <option value="other">Other</option>
  </select>
  {errors.industry && <span className="text-danger">{errors.industry.message}</span>}
</div>

{/* Pass */}
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1" {...register('password')}/>
  {errors.password && <span className="text-danger">{errors.password.message}</span>}
</div>

{/* Confirm Password */}
<div className="mb-3">
  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
  <input type="password" className="form-control" id="confirmPassword" {...register('confirmPassword')}/>
  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
</div>

{/* Checkbox */}
  <div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="exampleCheck1" {...register('exampleCheck1')}/>
  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default Registration;