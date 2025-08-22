import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setExplorerProvider,
  setRegion,
  fetchProviderData,
  setProvider,
} from "@/redux/features/Explorer/Explorer.slice";
import SelectHoc from "../../../ui/Select";
import CustomTable from "../../../ui/table/CustomTable"; 

const ExplorerBox = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.explorerData.explorerProvider);
  const region = useSelector((state) => state.explorerData.selectedRegion);
  const regions = useSelector((state) => state.explorerData.regions) || [];
  const data = useSelector((state) => state.explorerData.data) ;

  const [search, setSearch] = useState("");

  const handleProviderChange = (e) => {
    const selectedProvider = e.target.value;
    dispatch(setExplorerProvider(selectedProvider));  // sets provider & clears region
    dispatch(setProvider(selectedProvider));          // sets available regions
    dispatch(fetchProviderData(selectedProvider));    // fetches region-specific data
  };

  const handleRegionChange = (e) => {
    dispatch(setRegion(e.target.value));
    dispatch(fetchProviderData(provider)); // update data for selected region
  };

  useEffect(() => {
    if (provider) {
      dispatch(fetchProviderData(provider));
    }
  }, [provider, dispatch]);

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(
        (val) =>
          val &&
          val
            .toString()
            .toLowerCase()
            .includes(lower)
      )
    );
  }, [search, data]);

  return (
    <Box>
      <Box sx={{ width: "100%", bgcolor: "background.paper", p: 5, mt: 2 }}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexWrap="wrap" gap={4}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 350 }}>
              <InputLabel>Filter by Service Provider</InputLabel>
              <SelectHoc
                label={'Filter by Service Provider'}
                value={provider || ""}
                onChange={handleProviderChange}
                options={[
                  { value: "aws", label: "AWS" },
                  { value: "azure", label: "AZURE" },
                  { value: "gcp", label: "GCP" },
                ]}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                fullWidth
                sx={{ maxWidth: 350, mb: 2 }}
              />
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 350 }}>
              <InputLabel>Filter by Region</InputLabel>
              <Select
                value={region || ""}
                onChange={handleRegionChange}
                label="Filter by Region"
                disabled={!provider || regions.length === 0}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 250,
                      width: 350,
                      mt: 1,
                      borderRadius: 2,
                      boxShadow: 3,
                    },
                  },
                }}
              >
                {regions && regions.length > 0 ? (
                  regions.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      value={item}
                      sx={{
                        fontSize: "0.95rem",
                        py: 1.5,
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No regions available
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              sx={{ minWidth: 350 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      {filteredData.length === 0 ? <></> :
        <CustomTable
          isPagination={false}
          data={filteredData}
          columns={[
            { header: "Region", accessorKey: "region", cell: ({ getValue }) => <p style={{ height: '8px' }}>{getValue()}</p> },
            { header: "Generation", accessorKey: "CPU_Generation" },
            { header: "Instance Type", accessorKey: "instance" },
            { header: "vCPU", accessorKey: "vCPU" },
            { header: "Memory (GB)", accessorKey: "memory(GB)" },
            { header: "Ondemand Price($)", accessorKey: "instancePricingOndemand" },
            { header: "Reserved Price($)", accessorKey: "instancePricingReserved" },
            { header: "Spot Price($)", accessorKey: "Instance_Pricing_Spot" },
          ]}
          variant="primary"
          sx={{ height: "100%", borderRadius: 0, px: 2, pb: 2, overflowY: "auto", backgroundColor: "background.paper" }}
        />}
    </Box>
  );
};

export default ExplorerBox;
