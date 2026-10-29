import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ScheduledPostAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const postSchema = z.object({
  caption: z.string().trim().min(3, 'Caption must be at least 3 characters').max(500),
  platform: z.enum(['facebook', 'instagram', 'linkedin', 'twitter'], {
    error: 'Please select a platform',
  }),
  postDate: z.coerce.date({ error: 'Date & Time to Post is required' }),
  addToQueue: z.boolean(),
});

function PostScheduler(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(postSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(ScheduledPostAxiosFunction, data, 'Post scheduled successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Schedule Social Media Post</h2>
<p className="text-center text-muted mb-4">Plan and queue your post for the right platform and time.</p>

{/* Post Caption */}
<div className="mb-3">
  <label htmlFor="caption" className="form-label">Post Caption</label>
  <textarea className="form-control" id="caption" rows="4" placeholder="Write your post caption..." {...register('caption')}></textarea>
  {errors.caption && <span className="text-danger">{errors.caption.message}</span>}
</div>

{/* Platform */}
<div className="mb-3">
  <label htmlFor="platform" className="form-label">Platform</label>
  <select className="form-select" id="platform" {...register('platform')}>
    <option value="">Select Platform</option>
    <option value="facebook">Facebook</option>
    <option value="instagram">Instagram</option>
    <option value="linkedin">LinkedIn</option>
    <option value="twitter">Twitter</option>
  </select>
  {errors.platform && <span className="text-danger">{errors.platform.message}</span>}
</div>

{/* Date & Time */}
<div className="mb-3">
  <label htmlFor="postDate" className="form-label">Date & Time to Post</label>
  <input type="datetime-local" className="form-control" id="postDate" {...register('postDate')}/>
  {errors.postDate && <span className="text-danger">{errors.postDate.message}</span>}
</div>

{/* Queue checkbox */}
<div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="addToQueue" {...register('addToQueue')}/>
  <label className="form-check-label" htmlFor="addToQueue">Add to queue</label>
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Schedule Post'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default PostScheduler;