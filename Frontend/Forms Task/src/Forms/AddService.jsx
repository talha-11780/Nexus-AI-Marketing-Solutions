import './Login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ServiceAxiosFunction } from '../Services/API';
import { useFormSubmission } from '../Services/useFormSubmission';

const categories = [
  'lead-generation',
  'sales-automation',
  'marketing-automation',
  'customer-support',
];

const serviceSchema = z.object({
  serviceName: z
    .string()
    .trim()
    .min(3, 'Service name must be at least 3 characters')
    .max(100, 'Service name is too long'),

  category: z.enum(categories, {
    error: 'Please select a category',
  }),

  serviceDescription: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  price: z
    .number({ error: 'Price is required' })
    .positive('Price must be greater than 0'),

  isActive: z.boolean(),
});

function AddService(){
    const { submissionMessage, submitForm } = useFormSubmission();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(serviceSchema),
    });

    return(
        <>
        <form onSubmit={handleSubmit((data) => submitForm(ServiceAxiosFunction, data, 'Service saved successfully.'))}>
            
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
 <div className="card p-4 login-card" style={{maxWidth: "420px", width: "100%"}}>

{/* Heading */}
    <h2 className="text-center mb-2">Add New Service</h2>
<p className="text-center text-muted mb-4">Add one service per category. Use Edit Service to change an existing service.</p>

{/* Service Name */}
<div className="mb-3">
  <label htmlFor="serviceName" className="form-label">Service Name</label>
  <input type="text" className="form-control" id="serviceName" placeholder="e.g. AI Lead Generation" {...register('serviceName')}/>
  {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
</div>

{/* Category */}
<div className="mb-3">
  <label htmlFor="category" className="form-label">Category</label>
  <select className="form-select" id="category" {...register('category')}>
    <option value="">Select Category</option>
    <option value="lead-generation">Lead Generation</option>
    <option value="sales-automation">Sales Automation</option>
    <option value="marketing-automation">Marketing Automation</option>
    <option value="customer-support">Customer Support</option>
  </select>
  {errors.category && <span className="text-danger">{errors.category.message}</span>}
</div>

{/* Description */}
<div className="mb-3">
  <label htmlFor="serviceDescription" className="form-label">Service Description</label>
  <textarea className="form-control" id="serviceDescription" rows="4" placeholder="Describe what this service offers..." {...register('serviceDescription')}></textarea>
  {errors.serviceDescription && <span className="text-danger">{errors.serviceDescription.message}</span>}
</div>

{/* Price */}
<div className="mb-3">
  <label htmlFor="price" className="form-label">Starting Price</label>
  <input type="number" className="form-control" id="price" placeholder="Enter price in USD" {...register('price', { valueAsNumber: true })}/>
  {errors.price && <span className="text-danger">{errors.price.message}</span>}
</div>

{/* Active checkbox */}
<div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="isActive" {...register('isActive')}/>
  <label className="form-check-label" htmlFor="isActive">Make this service active on the website</label>
</div>

{/* Button */}
<button type="submit" className="btn login-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Add Service'}</button>
{submissionMessage && <p role="status" className="mt-3 mb-0">{submissionMessage}</p>}
  </div>
  </div>
</form>
   </> )
}

export default AddService;