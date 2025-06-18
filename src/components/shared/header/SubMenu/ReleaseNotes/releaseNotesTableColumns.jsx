import React from "react";

const FeatureList = ({ features }) => (
  <div className="text-left" style={{ whiteSpace: "pre-wrap" }}>
    {features?.map((feature) => (
      <div key={feature.label} style={{fontSize:"14px"}}>
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
      <li key={item.label} style={{fontSize:"14px"}}>
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
    header: "Version",
    size: 75,
    maxSize: 75,
    minSize: 75,
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    size: 90,
    maxSize: 90,
    minSize: 90,
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
          size: 200,
        maxSize: 400,
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
