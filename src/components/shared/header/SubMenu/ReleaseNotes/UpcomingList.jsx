import React from 'react'
import PropTypes from 'prop-types';

function UpcomingList({items}) {
  return (
    <ul className="list-disc pl-5" style={{ whiteSpace: "pre-wrap" }}>
      {items?.map((item) => (
        <li key={item.label}>
          <strong>{item.label}:</strong>
          <ul className="list-disc pl-5">
            {item.values.map((val, i) => (
              <li key={i} >
                {val}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
UpcomingList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default UpcomingList 