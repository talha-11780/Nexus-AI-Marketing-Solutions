import Service from "../Model/Service.js";

// Update the service already stored for the selected category.
export const ServiceEditController = async (req, res) => {
  try {
    const {
      serviceSelect: category,
      serviceName,
      serviceDescription,
      price,
    } = req.body ?? {};
    // Reuse the model schema to validate edits before changing the stored record.
    const updatedValues = new Service({ serviceName, category, serviceDescription, price });
    await updatedValues.validate();
    const matches = await Service.find({ category }).limit(2);

    if (matches.length === 0) {
      return res.status(404).json({ message: "No service exists in that category." });
    }
    if (matches.length > 1) {
      return res.status(409).json({ message: "This category has duplicate services; resolve duplicates before editing." });
    }

    // Keep the existing document (and its active status) while changing editable fields.
    const [service] = matches;
    service.serviceName = updatedValues.serviceName;
    service.serviceDescription = updatedValues.serviceDescription;
    service.price = updatedValues.price;
    await service.save();
    return res.status(200).json({ message: "Service updated successfully.", id: service._id });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Please check the service fields." });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "A service already exists in this category." });
    }
    console.error("Service update failed:", error.message);
    return res.status(500).json({ message: "Unable to update the service." });
  }
};
