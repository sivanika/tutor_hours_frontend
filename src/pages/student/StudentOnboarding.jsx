import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "./validation/studentSchema";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

import StepProgress from "./components/StepProgress";
import VerificationStatus from "./components/VerificationStatus";
import StudentInfo from "./components/StudentInfo";
import ParentInfo from "./components/ParentInfo";
import SchoolInfo from "./components/SchoolInfo";
import Availability from "./components/Availability";
import Subscription from "./components/Subscription";
import AdminUpload from "./components/AdminUpload";

export default function StudentOnboarding() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onBlur",
    defaultValues: {
      availability: [],
      subscriptionTier: "basic",
      parentConsent: false,
      schoolVerification: false,
    },
  });

  /* ---------- STEP VALIDATION MAP ---------- */
  const stepFields = {
    1: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "birthDate",
      "gradeLevel",
      "school",
      "learningGoals",
      "subjects",
    ],
    2: [
      "parentName",
      "parentRelationship",
      "parentEmail",
      "parentPhone",
      "parentConsent",
    ],
    3: [],
    4: ["availability"],
    5: [],
    6: [],
  };

  const next = async () => {
    const fieldsToValidate = stepFields[step] || [];
    const valid = await methods.trigger(fieldsToValidate);

    if (valid) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitProfile = async (data) => {
    try {
      const form = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "availability") {
          form.append("availability", JSON.stringify(data.availability));
        } else if (
          key !== "studentPhoto" &&
          key !== "studentDocument"
        ) {
          form.append(key, data[key]);
        }
      });

      if (data.studentPhoto) {
        form.append("studentPhoto", data.studentPhoto);
      }

      if (data.studentDocument) {
        form.append("studentDocument", data.studentDocument);
      }

      /* ✅ CORRECT BACKEND ROUTE */
      await API.put("/student/complete-profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 1200);

    } catch (err) {
      console.error("Student submit error:", err);
      alert(
        err.response?.data?.message ||
        "Student profile submit failed"
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-[#f5f7fb] to-[#eef1ff]">
        <div className="max-w-5xl mx-auto p-6">

          <VerificationStatus submitted={submitted} />
          <StepProgress currentStep={step} />

          <form
            onSubmit={methods.handleSubmit(submitProfile)}
            className="mt-6"
          >
            {step === 1 && <StudentInfo />}
            {step === 2 && <ParentInfo />}
            {step === 3 && <SchoolInfo />}
            {step === 4 && <Availability />}
            {step === 5 && <AdminUpload />}
            {step === 6 && <Subscription />}
            

            <div className="flex justify-between mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-6 py-2 rounded-lg bg-slate-200"
                >
                  Back
                </button>
              )}

              {step < 6 ? (
                <button
                  type="button"
                  onClick={next}
                  className="ml-auto px-6 py-2 rounded-lg bg-slate-900 text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 rounded-lg bg-slate-900 text-white"
                >
                  Submit for Verification
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </FormProvider>
  );
}