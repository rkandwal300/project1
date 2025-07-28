import React, { Suspense, useCallback } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import GetInstanceColumn from "./PortfolioTable/portfolioColumn";
import { selectInstances } from "@/redux/features/instance/instance.selector";
import TableSkeleton from "@/components/ui/table/table_components/TableSkeleton ";
import CustomTable from "@/components/ui/table/CustomTable";
import { Slider } from "@mui/material";
import GetCCAInstanceColumn from "./GetColumns";

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

function PortfolioBody() {
  const dispatch = useDispatch();

  // const type = useSelector(selectCurrentProviderType)

  const dataMap = {
    instance_stats: useSelector(selectInstances),
  };

  const columnsMap = {
    instance_stats: GetCCAInstanceColumn(),
  };

  const onDelete = useCallback(
    ({ selectedRows }) => {
      if (!selectedRows?.length) return;
      // dispatch(removeInstance(selectedIndexes));
      // dispatch(setUploadedFileName(''))
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        width: "100%",
        p: 0,
        bgcolor: "primary.contrastText",
        mt: 0,
        overflow: "hidden",
      }}
      style={{ paddingLeft: "5px" }}
    >
      <Suspense fallback={<TableSkeleton />}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "rgb(0,0,225)",
              margin: 0,
              flex: "1 1 auto",
              minWidth: "200px",
            }}
          >
            Note: Double-click to update input values.
          </p>
          <div
            style={{
              width: "200px",
              minWidth: "150px",
              paddingRight: "20px",
            }}
          >
            <Slider
              defaultValue={20}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="on"
              sx={{
                "& .MuiSlider-valueLabel": {
                  fontSize: "0.75rem",
                  padding: "2px 6px",
                },
              }}
            />
          </div>
        </div>
        <CustomTable
          variant="primary"
          data={dataMap["instance_stats"]}
          columns={columnsMap["instance_stats"]}
          isPagination
          isAction={true}
          onDelete={onDelete}
        />
      </Suspense>
    </Box>
  );
}

export default PortfolioBody;
