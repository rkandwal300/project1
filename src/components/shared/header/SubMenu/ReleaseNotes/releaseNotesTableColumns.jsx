import { Skeleton } from "@mui/material";
import React, { lazy, Suspense } from "react";
 
const FeatureList = lazy(() => import("./FeatureList"));
const UpcomingList = lazy(() => import("./UpcomingList"));

const LazyFeatureList = ({ features }) => (
  <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={48} />}>
    <FeatureList features={features} />
  </Suspense>
);

const LazyUpcomingList = ({ items }) => (
  <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={48} />}>
    <UpcomingList items={items} />
  </Suspense>
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
          <LazyFeatureList features={row.getValue("majorFeatures")} />
        ),
        size: 300,
        maxSize: 500,
        minSize: 200,
      },
      {
        accessorKey: "minorImprovements",
        header: "Minor Improvements",
        cell: ({ row }) => (
          <LazyFeatureList features={row.getValue("minorImprovements")} />
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
      <LazyUpcomingList items={row.getValue("upComing") || []} />
    ),
    size: 200,
    maxSize: 400,
    minSize: 200,
  },
];
