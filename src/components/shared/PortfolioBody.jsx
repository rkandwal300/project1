import React, { useState, Suspense, lazy, useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  selectInstanceStats,
  selectSelfPrefAssessment,
} from "@/redux/features/form/formData.selector";
import GetInstanceColumn from "./PortfolioTable/portfolioColumn";
import { selfPrefAssessmentColumn } from "./PortfolioTable/selfPrefAssessmentColumn";
import { deleteInstances } from "@/redux/features/form/formData.slice";
import TableSkeleton from "../ui/table/table_components/TableSkeleton ";
import ErrorBoundary from "./ErrorBoundary";

const CustomTable = lazy(() => import("../ui/table/CustomTable"));

const TabPanel = React.memo(function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
});
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

const TABS = [
  {
    label: "Instance Stats",
    value: "instance_stats",
    getColumns: GetInstanceColumn,
    selector: selectInstanceStats,
    showNote: true,
    isAction: true,
  },
  {
    label: "Self Perf Assessment",
    value: "self_perf_assessment",
    getColumns: selfPrefAssessmentColumn,
    selector: selectSelfPrefAssessment,
    showNote: false,
    isAction: false,
  },
];

function PortfolioBody() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(TABS[0].value);

  const dataMap = {
    instance_stats: useSelector(selectInstanceStats),
    self_perf_assessment: useSelector(selectSelfPrefAssessment),
  };

  const columnsMap = {
    instance_stats: GetInstanceColumn(),
    self_perf_assessment: selfPrefAssessmentColumn,
  };

  const handleChange = useCallback((_, newValue) => setValue(newValue), []);

  const onDelete = useCallback(
    ({ selectedRows }) => {
      if (!selectedRows?.length) return;
      const selectedIndexes = selectedRows.map((row) => row.index);
      dispatch(deleteInstances(selectedIndexes));
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: "100%", p: 0, bgcolor: "primary.contrastText" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="portfolio tabs">
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Suspense fallback={<TableSkeleton />}>
        {TABS.map((tab) => (
          <TabPanel key={tab.value} value={value} index={tab.value}>
            {tab.showNote && (
              <p
                style={{ fontSize: 16, fontWeight: 500, color: "rgb(0,0,225)" }}
              >
                Note: Double-click to update input values.
              </p>
            )}
            <CustomTable
              variant="primary"
              data={dataMap[tab.value]}
              columns={columnsMap[tab.value]}
              isPagination
              isAction={tab.isAction}
              onDelete={tab.isAction ? onDelete : undefined}
              defaultColumnPinningState={
                value === "instance_stats"
                  ? {
                      left: ["select", "uuid"],
                      right: [],
                    }
                  : {}
              }
            />
          </TabPanel>
        ))}
      </Suspense>
    </Box>
  );
}

const PortfolioBodyWithBoundary = () => (
  <ErrorBoundary fallback="Portfolio form component has some Errors">
    <PortfolioBody />
  </ErrorBoundary>
);

export default PortfolioBodyWithBoundary;
