import React from 'react'

function FeatureList() {
  return (
  <div className="text-left" style={{ whiteSpace: "pre-wrap" }}>
    {features?.map((feature) => (
      <div key={feature.label}>
        <strong>{feature.label}:</strong>
        <ul className="list-disc pl-5">
          {feature.values.map((val, i) => (
            <li key={i} style={{ whiteSpace: "pre-wrap" }}>
              {val}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)
}

export default FeatureList