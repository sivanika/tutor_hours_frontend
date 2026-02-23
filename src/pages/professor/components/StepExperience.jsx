import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema } from "../validation/schemas";

export default function StepExperience({
  formData,
  setFormData,
  next,
  prev,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: formData,
  });

  const availability = watch("availability");

const toggle = (key) => {
  const updated = {
    ...availability,
    [key]: !availability?.[key],
  };
  setValue("availability", updated, { shouldValidate: true });
};

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">
        Teaching Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            {...register("yearsExperience")}
            className="opt-input"
            placeholder="Years of Experience"
          />
          <p className="text-red-500 text-sm">
            {errors.yearsExperience?.message}
          </p>
        </div>

        <div>
          <input
            {...register("teachingLevel")}
            className="opt-input"
            placeholder="Teaching Level"
          />
          <p className="text-red-500 text-sm">
            {errors.teachingLevel?.message}
          </p>
        </div>
      </div>

      <div>
        <textarea
          {...register("subjects")}
          className="opt-input"
          placeholder="Subjects you teach"
        />
        <p className="text-red-500 text-sm">
          {errors.subjects?.message}
        </p>
      </div>

      <div>
        <input
          {...register("hourlyRate")}
          className="opt-input"
          placeholder="Hourly Rate"
        />
        <p className="text-red-500 text-sm">
          {errors.hourlyRate?.message}
        </p>
      </div>

      {/* Availability */}
      <div>
        <p className="font-semibold mb-3">Availability</p>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(availability || {}).map((i) => (
            <label key={i} className="flex gap-3 p-3 border rounded-lg">
              <input
                type="checkbox"
                checked={availability[i]}
                onChange={() => toggle(i)}
              />
              {i.toUpperCase()}
            </label>
          ))}
        </div>

        <p className="text-red-500 text-sm">
          {errors.availability?.message}
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={prev} className="btn-secondary">
          ← Back
        </button>

        <button className="btn-primary">
          Next →
        </button>
      </div>
    </form>
  );
}
