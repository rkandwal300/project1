import React, { useState, Suspense, lazy, useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import GetInstanceColumn from "../Sidebar/PortfolioTable/portfolioColumn";
import { selfPrefAssessmentColumn } from "../Sidebar/PortfolioTable/selfPrefAssessmentColumn";
import TableSkeleton from "../../ui/table/table_components/TableSkeleton ";
import ErrorBoundary from "../ErrorBoundary";
import {
  selectInstances,
  selectSelfAssessment,
} from "@/redux/features/instance/instance.selector";
import { removeInstance } from "@/redux/features/instance/instance.slice";
import { Slider } from "@mui/material";

const CustomTable = lazy(() => import("../../ui/table/CustomTable"));

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
    getColumns: GetInstanceColumn ,
    showNote: true,
    isAction: true,
  },
  {
    label: "Self Perf Assessment",
    value: "self_perf_assessment",
    getColumns: selfPrefAssessmentColumn,
    showNote: false,
    isAction: false,
  },
];

function PortfolioBody() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(TABS[0].value);

  const dataMap = {
    instance_stats: useSelector(selectInstances),
    self_perf_assessment: useSelector(selectSelfAssessment),
  };

  const columnsMap = {
    instance_stats: GetInstanceColumn({isTelemetry: false}),
    self_perf_assessment: selfPrefAssessmentColumn,
  };

  const handleChange = useCallback((_, newValue) => setValue(newValue), []);

  const onDelete = useCallback(
    ({ selectedRows }) => {
      if (!selectedRows?.length) return;
      const selectedIndexes = selectedRows.map((row) => row.index);
      dispatch(removeInstance(selectedIndexes));
    },
    [dispatch]
  );
 

  return (
    <Box sx={{ width: "100%", p: 0, bgcolor: "primary.contrastText" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
       <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}> <Tabs value={value} onChange={handleChange} aria-label="portfolio tabs">
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
          <Box
            sx={{
              width: 300,
              px: 2,
              overflow: "visible", 
              position: "relative", 
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              
            }}
          >
            <Slider
              defaultValue={20}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="on"
            />
          </Box></Box>
      </Box>
      <Suspense fallback={<TableSkeleton />}>
        {TABS.map((tab) => (
          <TabPanel key={tab.value} value={value} index={tab.value}>
            {tab.showNote && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "rgb(0,0,225)",
                  }}
                >
                  Note: Double-click to update input values.
                </p>
              </div>
            )}
            <CustomTable
              variant="primary"
              data={dataMap[tab.value]}
              columns={columnsMap[tab.value]}
              isPagination
              isAction={tab.isAction}
              onDelete={tab.isAction ? onDelete : undefined}
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
