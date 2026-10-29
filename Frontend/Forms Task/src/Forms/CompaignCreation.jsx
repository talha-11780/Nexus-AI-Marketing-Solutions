import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CampaignAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const campaignSchema = z.object({
  campaignName: z.string().trim().min(3, 'Campaign Name must be at least 3 characters').max(100),
  platform: z.enum(['facebook', 'instagram', 'google-ads', 'linkedin'], {
    error: 'Please select a platform',
  }),
  startDate: z.coerce.date({ error: 'Start Date is required' }),
  budget: z
    .number({ error: 'Budget is required' })
    .positive('Budget must be greater than 0')
    .max(10000000, 'Budget is too high'),
  goal: z.string().trim().min(10, 'Goal must be at least 10 characters').max(500),
});

function CampaignCreation(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(campaignSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(CampaignAxiosFunction, data, 'Campaign created successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Create New Campaign</h2>
<p className="text-center text-muted mb-4">Set up a new marketing campaign for your clients.</p>

{/* Campaign Name */}
<div className="mb-3">
  <label htmlFor="campaignName" className="form-label">Campaign Name</label>
  <input type="text" className="form-control" id="campaignName" placeholder="Campaign Name" {...register('campaignName')}/>
  {errors.campaignName && <span className="text-danger">{errors.campaignName.message}</span>}
</div>

{/* Platform */}
<div className="mb-3">
  <label htmlFor="platform" className="form-label">Platform</label>
  <select className="form-select" id="platform" {...register('platform')}>
    <option value="">Select Platform</option>
    <option value="facebook">Facebook</option>
    <option value="instagram">Instagram</option>
    <option value="google-ads">Google Ads</option>
    <option value="linkedin">LinkedIn</option>
  </select>
  {errors.platform && <span className="text-danger">{errors.platform.message}</span>}
</div>

{/* Start Date */}
<div className="mb-3">
  <label htmlFor="startDate" className="form-label">Start Date</label>
  <input type="date" className="form-control" id="startDate" {...register('startDate')}/>
  {errors.startDate && <span className="text-danger">{errors.startDate.message}</span>}
</div>

{/* Budget */}
<div className="mb-3">
  <label htmlFor="budget" className="form-label">Budget</label>
  <input type="number" className="form-control" id="budget" placeholder="Enter budget in USD" {...register('budget', { valueAsNumber: true })}/>
  {errors.budget && <span className="text-danger">{errors.budget.message}</span>}
</div>

{/* Campaign Goal */}
<div className="mb-3">
  <label htmlFor="goal" className="form-label">Campaign Goal</label>
  <textarea className="form-control" id="goal" rows="4" placeholder="Describe the goal of this campaign..." {...register('goal')}></textarea>
  {errors.goal && <span className="text-danger">{errors.goal.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Create Campaign'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default CampaignCreation;