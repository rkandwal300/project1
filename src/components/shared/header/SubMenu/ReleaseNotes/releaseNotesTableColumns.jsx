import React from "react";

const FeatureList = ({ features }) => (
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
);

const UpcomingList = ({ items }) => (
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
);

export const releaseNotesTableColumns = [
  {
    accessorKey: "version",
    header: () => <div className="text-left font-medium">Version</div>,
    
    size: 80,
    maxSize: 80,
    minSize: 80,
  },
  {
    accessorKey: "releaseDate",
    header: () => <div className="text-left font-medium">Release Date</div>,
     
    size: 122,
    maxSize: 122,
    minSize: 122,
  },
  {
    header: "What's New",
    columns: [
      {
        accessorKey: "majorFeatures",
        header: "Major Features",
        cell: ({ row }) => (
          <FeatureList features={row.getValue("majorFeatures")} />
        ),
        size: 300,
        maxSize: 500,
        minSize: 200,
      },
      {
        accessorKey: "minorImprovements",
        header: "Minor Improvements",
        cell: ({ row }) => (
          <FeatureList features={row.getValue("minorImprovements")} />
        ),
        size: 200,
        maxSize: 400,
        minSize: 200,
      },
    ],
  },
  {
    accessorKey: "upComing",
    header: () => <div className="font-medium">Upcoming / What's Next</div>,
    cell: ({ row }) => (
      <UpcomingList items={row.getValue("upComing") || []} />
    ),
    size: 200,
    maxSize: 400,
    minSize: 200,
  },
];
