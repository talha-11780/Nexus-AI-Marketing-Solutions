import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DeleteServiceAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const serviceOptions = [
  'lead-generation',
  'sales-automation',
  'marketing-automation',
  'customer-support',
];

const deleteServiceSchema = z.object({
  serviceSelect: z.enum(serviceOptions, {
    error: 'Please select a service',
  }),
  confirmDelete: z
    .boolean()
    .refine((value) => value, 'Please confirm that you want to delete this service'),
});

function DeleteService(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(deleteServiceSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(DeleteServiceAxiosFunction, data, 'Service deleted successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Delete Service</h2>
<p className="text-center text-muted mb-4">Remove a service that is no longer offered on the website.</p>

{/* Select Service */}
<div className="mb-3">
  <label htmlFor="serviceSelect" className="form-label">Select Service</label>
  <select className="form-select" id="serviceSelect" {...register('serviceSelect')}>
    <option value="">Select Service to Delete</option>
    <option value="lead-generation">AI Lead Generation</option>
    <option value="sales-automation">AI Sales Automation</option>
    <option value="marketing-automation">AI Marketing Automation</option>
    <option value="customer-support">Customer Support Automation</option>
  </select>
  {errors.serviceSelect && <span className="text-danger">{errors.serviceSelect.message}</span>}
</div>

{/* Confirm checkbox */}
<div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="confirmDelete" {...register('confirmDelete')}/>
  <label className="form-check-label" htmlFor="confirmDelete">I confirm I want to permanently delete this service.</label>
  {errors.confirmDelete && <span className="text-danger d-block">{errors.confirmDelete.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn btn-danger w-100" disabled={isSubmitting}>{isSubmitting ? 'Deleting...' : 'Delete Service'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default DeleteService;