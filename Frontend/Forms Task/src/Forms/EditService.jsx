import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditServiceAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const serviceOptions = [
  'lead-generation',
  'sales-automation',
  'marketing-automation',
  'customer-support',
];

const editServiceSchema = z.object({
  serviceSelect: z.enum(serviceOptions, {
    error: 'Please select a service',
  }),

  serviceName: z
    .string()
    .trim()
    .min(3, 'Service name must be at least 3 characters')
    .max(100, 'Service name is too long'),

  serviceDescription: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  price: z
    .number({ error: 'Price is required' })
    .positive('Price must be greater than 0'),
});

function EditService(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(editServiceSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(EditServiceAxiosFunction, data, 'Service updated successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Edit Service</h2>
<p className="text-center text-muted mb-4">Update the details of an existing service.</p>

{/* Select Service */}
<div className="mb-3">
  <label htmlFor="serviceSelect" className="form-label">Select Service</label>
  <select className="form-select" id="serviceSelect" {...register('serviceSelect')}>
    <option value="">Select Service to Edit</option>
    <option value="lead-generation">AI Lead Generation</option>
    <option value="sales-automation">AI Sales Automation</option>
    <option value="marketing-automation">AI Marketing Automation</option>
    <option value="customer-support">Customer Support Automation</option>
  </select>
  {errors.serviceSelect && <span className="text-danger">{errors.serviceSelect.message}</span>}
</div>

{/* Service Name */}
<div className="mb-3">
  <label htmlFor="serviceName" className="form-label">Service Name</label>
  <input type="text" className="form-control" id="serviceName" placeholder="Update service name" {...register('serviceName')}/>
  {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
</div>

{/* Description */}
<div className="mb-3">
  <label htmlFor="serviceDescription" className="form-label">Service Description</label>
  <textarea className="form-control" id="serviceDescription" rows="4" placeholder="Update description..." {...register('serviceDescription')}></textarea>
  {errors.serviceDescription && <span className="text-danger">{errors.serviceDescription.message}</span>}
</div>

{/* Price */}
<div className="mb-3">
  <label htmlFor="price" className="form-label">Starting Price</label>
  <input type="number" className="form-control" id="price" placeholder="Update price in USD" {...register('price', { valueAsNumber: true })}/>
  {errors.price && <span className="text-danger">{errors.price.message}</span>}
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default EditService;