export const releaseNotesTableColumns = [
  {
    accessorKey: "version",
    header: () => <div className="text-left font-medium">Version</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("version")}</div>
    ),
  },

  {
    accessorKey: "releaseDate",
    header: () => <div className="text-left font-medium">Release Date</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("releaseDate")}</div>
    ),
  },
  {
    header: "What's New",
    columns: [
      {
        accessorKey: "majorFeatures",
        header: "Major Features",
        cell: ({ row }) => {
          const majorFeatures = row.getValue("majorFeatures");
          return (
            <div className="text-left">
              {majorFeatures?.map((feature) => (
                <div key={feature.label}>
                  <strong>{feature.label}:</strong>
                  <ul className="list-disc pl-5">
                    {feature.values.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "minorImprovements",
        header: "Minor Improvements",
        cell: ({ row }) => {
          const minorImprovements = row.getValue("minorImprovements");
          return (
            <div className="text-left">
              {minorImprovements?.map((feature) => (
                <div key={feature.label}>
                  <strong>{feature.label}:</strong>
                  <ul className="list-disc pl-5">
                    {feature.values.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        },
      },
    ],
  },
  {
    accessorKey: "upComing",
    header: () => <div className="font-medium">Upcoming / What's Next</div>,
    cell: ({ row }) => {
      const upcoming = row.getValue("upComing") || [];
      return (
        <ul className="list-disc pl-5">
          {upcoming.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong>
              <ul className="list-disc pl-5">
                {item.values.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
      
    },
  },
];
