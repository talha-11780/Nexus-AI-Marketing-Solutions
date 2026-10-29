// Build a small controller shared by forms that only create a new record.
export const createFormController = (Model, successMessage) => async (req, res) => {
  try {
    const record = await Model.create(req.body ?? {});
    return res.status(201).json({ message: successMessage, id: record._id });
  } catch (error) {
    // Return client errors for invalid/duplicate data and log unexpected database failures.
    const status = error.name === "ValidationError" ? 400 : error.code === 11000 ? 409 : 500;
    if (status === 500) {
      console.error("Form submission failed:", error.message);
    }
    const message = status === 400
      ? "Please check the submitted form fields."
      : status === 409
        ? "A record with these details already exists."
        : "Unable to save the form. Please try again.";
    return res.status(status).json({ message });
  }
};
