import Service from "../Model/Service.js";

// Delete the actual service document after its category and confirmation are checked.
export const ServiceDeletionController = async (req, res) => {
  try {
    const { serviceSelect: category, confirmDelete } = req.body ?? {};
    if (!Service.schema.path("category").enumValues.includes(category)) {
      return res.status(400).json({ message: "Select a valid service category." });
    }
    if (confirmDelete !== true) {
      return res.status(400).json({ message: "Confirm the deletion to continue." });
    }

    // Refuse to delete if old data violates the one-service-per-category rule.
    const matches = await Service.find({ category }).limit(2);
    if (matches.length === 0) {
      return res.status(404).json({ message: "No service exists in that category." });
    }
    if (matches.length > 1) {
      return res.status(409).json({ message: "This category has duplicate services; resolve duplicates before deleting." });
    }
    await Service.deleteOne({ _id: matches[0]._id });
    return res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Service deletion failed:", error.message);
    return res.status(500).json({ message: "Unable to delete the service." });
  }
};
