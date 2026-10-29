import Service from "../Model/Service.js";

// Add one service per category; existing services must be changed through Edit Service.
export const ServiceController = async (req, res) => {
  try {
    const { serviceName, category, serviceDescription, price, isActive } = req.body ?? {};
    const service = new Service({ serviceName, category, serviceDescription, price, isActive });
    await service.validate();

    // Prevent a second service in a category, including concurrent add requests.
    if (await Service.exists({ category })) {
      return res.status(409).json({ message: "A service already exists in this category. Use Edit Service to change it." });
    }

    await service.save();
    return res.status(201).json({ message: "Service added successfully.", id: service._id });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Please check the service fields." });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "A service already exists in this category." });
    }
    console.error("Service save failed:", error.message);
    return res.status(500).json({ message: "Unable to save the service." });
  }
};
