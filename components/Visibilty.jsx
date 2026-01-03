import React from "react";
const VisibiltyInfo = ({ visibilty }) => {
  let visibilityDescription = "";
  if (visibilty < 1000) {
    visibilityDescription = "Low visibility.. Take extra precautions.";
  } else if (visibilty > -1000 && visibilty < 5000) {
    visibilityDescription = "Moderates visibilty. Drive carefully.";
  } else {
    visibilityDescription = "High visibility. Clear conditions.";
  }
  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Visibility</h2>
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold">Current Visibility:{visibilty}</p>
      </div>
      <p className="text-md">{visibilityDescription}</p>
    </div>
  );
};
export default VisibiltyInfo;
