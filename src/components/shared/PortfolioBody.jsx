import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  portfolioColumn,
  selfPrefAssessmentColumn,
} from "./PortfolioTable/portfolioColumn";
import {
  selectInstanceStats,
  selectSelfPrefAssessment,
} from "@/redux/features/instance/instance.selector";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../ui/table/CustomTable";
import { setInstanceStats } from "@/redux/features/instance/instance.slice";
import PropTypes from "prop-types";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default function PortfolioBody() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("instance_stats");
  const instances = useSelector(selectInstanceStats);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onDelete = ({ selectedRows }) => {
    if (!selectedRows || selectedRows.length === 0) return;

    const selectedIndexes = selectedRows.map((row) => row.index);

    const updatedInstances = instances.filter(
      (_, idx) => !selectedIndexes.includes(idx)
    );

    dispatch(setInstanceStats({ instanceStats: updatedInstances }));
  };

  const instanceData = useSelector(selectInstanceStats);
  const selfPrefAssessmentData = useSelector(selectSelfPrefAssessment);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Instance Stats" value="instance_stats" />
          <Tab label="Self Perf Assessment" value="self_perf_assessment" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={"instance_stats"}>
        <CustomTable
          variant="primary"
          data={instanceData}
          columns={portfolioColumn}
          isPagination={true}
          isAction={true}
          onDelete={onDelete}
        />
      </TabPanel>
      <TabPanel value={value} index={"self_perf_assessment"}>
        <CustomTable
          variant="primary"
          data={selfPrefAssessmentData}
          columns={selfPrefAssessmentColumn}
          isPagination={true}
        />
      </TabPanel>
    </Box>
  );
}
