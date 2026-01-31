export default function BudgetBar({ spent, budget }) {
  const percent = budget ? Math.min((spent / budget) * 100, 100) : 0;

  const color =
    percent >= 100
      ? "bg-red-600"
      : percent >= 80
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="font-semibold">Monthly Budget</span>
        <span>₹ {spent} / ₹ {budget}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${color} h-4 rounded-full transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {percent >= 80 && percent < 100 && (
        <p className="text-yellow-600 mt-2 font-semibold">
          ⚠️ Warning: You have used 80% of your budget
        </p>
      )}

      {percent >= 100 && (
        <p className="text-red-600 mt-2 font-bold">
          🚨 Budget exceeded!
        </p>
      )}
    </div>
  );
}
