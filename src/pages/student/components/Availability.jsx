import { useFormContext } from "react-hook-form";

export default function Availability() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const availability = watch("availability") || [];

  const slots = ["Mon Morning", "Tue Evening", "Sat Morning"];

  const toggle = (slot) => {
    const updated = availability.includes(slot)
      ? availability.filter((s) => s !== slot)
      : [...availability, slot];

    setValue("availability", updated, { shouldValidate: true });
  };

  return (
    <div
      className="
        p-8 rounded-2xl

        bg-white/90 dark:bg-slate-900/80
        backdrop-blur-xl

        border border-slate-200 dark:border-slate-800
        shadow-lg dark:shadow-black/30

        transition-colors duration-300
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Free Time Availability
      </h2>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map((slot) => {
          const active = availability.includes(slot);

          return (
            <button
              type="button"
              key={slot}
              onClick={() => toggle(slot)}
              className={`
                p-4 rounded-xl font-medium text-sm
                border transition-all duration-200

                ${
                  active
                    ? `
                      bg-slate-900 text-white border-slate-900
                      shadow-md
                      dark:bg-slate-100 dark:text-black dark:border-slate-100
                    `
                    : `
                      bg-slate-50 text-slate-700 border-slate-300
                      hover:bg-slate-100

                      dark:bg-slate-800
                      dark:text-slate-200
                      dark:border-slate-700
                      dark:hover:bg-slate-700
                    `
                }

                hover:-translate-y-0.5
                active:scale-95
              `}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {errors.availability && (
        <p className="mt-4 text-sm text-red-500 font-medium">
          {errors.availability.message}
        </p>
      )}
    </div>
  );
}