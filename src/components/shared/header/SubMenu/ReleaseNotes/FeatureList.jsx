import React from 'react'
import PropTypes from 'prop-types';

function FeatureList({ features }) {
  return (
  <div className="text-left" style={{ whiteSpace: "pre-wrap" }}>
    {features?.map((feature) => (
      <div key={feature.label}>
        <strong>{feature.label}:</strong>
        <ul className="list-disc pl-5">
          {feature.values.map((val) => (
            <li key={val} style={{ whiteSpace: "pre-wrap" }}>
              {val}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)
}
FeatureList.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
}; 
export default FeatureList