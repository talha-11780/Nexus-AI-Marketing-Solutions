import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FeedbackAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const ratings = ['poor', 'average', 'good', 'excellent'];

const feedbackSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full Name must be at least 2 characters')
    .max(60, 'Full Name is too long'),

  email: z
    .email('Enter a valid email address')
    .max(254, 'Email is too long'),

  rating: z.enum(ratings, {
    error: 'Please select a rating',
  }),

  feedback: z
    .string()
    .trim()
    .min(10, 'Feedback must be at least 10 characters')
    .max(1000, 'Feedback cannot exceed 1000 characters'),
});

function Feedback(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(feedbackSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(FeedbackAxiosFunction, data, 'Feedback submitted successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Share Your Feedback</h2>
<p className="text-center text-muted mb-4">We'd love to hear about your experience with our services.</p>

{/* Name */}
<div className="mb-3">
  <label htmlFor="fullName" className="form-label">Full Name</label>
  <input type="text" className="form-control" id="fullName" placeholder="Full Name" {...register('fullName')}/>
  {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
</div>

{/* Email */}
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email address</label>
  <input type="email" className="form-control" id="email" placeholder="Email" {...register('email')}/>
  {errors.email && <span className="text-danger">{errors.email.message}</span>}
</div>

{/* Rating */}
<div className="mb-3">
  <label className="form-label">How would you rate our service?</label>

  <div className="form-check">
    <input className="form-check-input" type="radio" id="ratingPoor" value="poor" {...register('rating')}/>
    <label className="form-check-label" htmlFor="ratingPoor">Poor</label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" id="ratingAverage" value="average" {...register('rating')}/>
    <label className="form-check-label" htmlFor="ratingAverage">Average</label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" id="ratingGood" value="good" {...register('rating')}/>
    <label className="form-check-label" htmlFor="ratingGood">Good</label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" id="ratingExcellent" value="excellent" {...register('rating')}/>
    <label className="form-check-label" htmlFor="ratingExcellent">Excellent</label>
  </div>
  {errors.rating && <span className="text-danger">{errors.rating.message}</span>}
</div>

{/* Feedback */}
<div className="mb-3">
  <label htmlFor="feedback" className="form-label">Your Feedback</label>
  <textarea className="form-control" id="feedback" rows="4" placeholder="Tell us what you think..." {...register('feedback')}></textarea>
  {errors.feedback && <span className="text-danger">{errors.feedback.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default Feedback;