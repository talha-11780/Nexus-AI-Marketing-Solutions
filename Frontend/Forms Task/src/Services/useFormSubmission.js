import { useState } from "react";

export function useFormSubmission() {
  const [submissionMessage, setSubmissionMessage] = useState("");

  async function submitForm(apiCall, data, successMessage) {
    setSubmissionMessage("");
    try {
      const response = await apiCall(data);
      setSubmissionMessage(response.data?.message || successMessage);
    } catch (error) {
      const responseMessage = error.response?.data?.message ?? error.response?.data;
      setSubmissionMessage(
        typeof responseMessage === "string"
          ? responseMessage
          : error.message || "Submission failed. Please try again.",
      );
    }
  }

  return { submissionMessage, submitForm };
}
