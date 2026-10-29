import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CallBookingAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const callSchema = z.object({
  fullName: z.string().trim().min(2, 'Full Name must be at least 2 characters').max(60),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  preferredDateTime: z.coerce.date({ error: 'Preferred Date & Time is required' }),
  message: z.string().trim().min(10, 'Please describe your need').max(500),
});

function BookFreeCall(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(callSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(CallBookingAxiosFunction, data, 'Call booking submitted successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Book Your Free Strategy Call</h2>
<p className="text-center text-muted mb-4">Pick a time that works for you and our team will reach out to confirm.</p>

{/* Full Name */}
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

{/* Phone */}
<div className="mb-3">
  <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
  <input type="tel" className="form-control" id="phone" placeholder="Phone / WhatsApp" {...register('phone')}/>
  {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
</div>

{/* Preferred Date & Time */}
<div className="mb-3">
  <label htmlFor="preferredDateTime" className="form-label">Preferred Date & Time</label>
  <input type="datetime-local" className="form-control" id="preferredDateTime" {...register('preferredDateTime')}/>
  {errors.preferredDateTime && <span className="text-danger">{errors.preferredDateTime.message}</span>}
</div>

{/* Message */}
<div className="mb-3">
  <label htmlFor="message" className="form-label">What do you need help with?</label>
  <textarea className="form-control" id="message" rows="3" placeholder="Briefly describe your business needs..." {...register('message')}></textarea>
  {errors.message && <span className="text-danger">{errors.message.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Book Free Call'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default BookFreeCall;