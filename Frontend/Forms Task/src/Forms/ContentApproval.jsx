import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ContentApprovalAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const contentApprovalSchema = z.object({
  contentTitle: z.string().trim().min(3, 'Content Title must be at least 3 characters').max(100),
  contentType: z.enum(['blog-post', 'social-media-post', 'email', 'ad-copy'], {
    error: 'Please select a content type',
  }),
  contentLink: z.url('Enter a valid content URL'),
  notes: z.string().trim().min(10, 'Notes must be at least 10 characters').max(500),
});

function ContentApproval(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contentApprovalSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(ContentApprovalAxiosFunction, data, 'Content sent for approval.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Content Approval Request</h2>
<p className="text-center text-muted mb-4">Submit your content for review before it goes live.</p>

{/* Content Title */}
<div className="mb-3">
  <label htmlFor="contentTitle" className="form-label">Content Title</label>
  <input type="text" className="form-control" id="contentTitle" placeholder="Content Title" {...register('contentTitle')}/>
  {errors.contentTitle && <span className="text-danger">{errors.contentTitle.message}</span>}
</div>

{/* Content Type */}
<div className="mb-3">
  <label htmlFor="contentType" className="form-label">Content Type</label>
  <select className="form-select" id="contentType" {...register('contentType')}>
    <option value="">Select Content Type</option>
    <option value="blog-post">Blog Post</option>
    <option value="social-media-post">Social Media Post</option>
    <option value="email">Email</option>
    <option value="ad-copy">Ad Copy</option>
  </select>
  {errors.contentType && <span className="text-danger">{errors.contentType.message}</span>}
</div>

{/* Content Link */}
<div className="mb-3">
  <label htmlFor="contentLink" className="form-label">Upload / Link to Content</label>
  <input type="url" className="form-control" id="contentLink" placeholder="https://..." {...register('contentLink')}/>
  {errors.contentLink && <span className="text-danger">{errors.contentLink.message}</span>}
</div>

{/* Notes */}
<div className="mb-3">
  <label htmlFor="notes" className="form-label">Notes for Reviewer</label>
  <textarea className="form-control" id="notes" rows="4" placeholder="Any specific points you want the reviewer to check..." {...register('notes')}></textarea>
  {errors.notes && <span className="text-danger">{errors.notes.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Send for Approval'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default ContentApproval;