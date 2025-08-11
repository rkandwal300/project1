import React, { useEffect, useState, useMemo, Fragment } from "react";
import {
    Box,
    Button,
    Tabs,
    Tab,
    Typography,
    Switch,
    IconButton,
} from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import { isEIA } from "@/lib/router";
import {
    selectCostTableColumns,
    selectInstanceTableColumns,
} from "@/redux/features/customizeTable/customizeTable.selector";
import {
    resetCustomizeTableColumn,
    toggleCostColumnVisibility,
    toggleInstanceColumnVisibility,
} from "@/redux/features/customizeTable/customizeTable.slice";
import { instanceAdvisoryColumn } from "./InstanceAdvisoryColumn";
import { CostAdvisoryColumn } from "../cca/costAdvice/CostAdvisoryColumn";

// ---------------- Reusable TabPanel ----------------
const TabPanel = ({ children, value, index }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`custom-tabpanel-${index}`}
        aria-labelledby={`custom-tab-${index}`}
    >
        {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
);

// ---------------- Data shaping helper ----------------
const shapeColumns = (columns) =>
    columns.reduce((acc, val) => {
        if (val.header) {
            acc.push({
                id: val.id,
                header: val.header,
                accessorKey: val.accessorKey,
                columns: val.columns || [],
            });
        } else if (val.columns && acc.length > 0) {
            // Merge columns to previous element
            acc[acc.length - 1].columns = [
                ...(acc[acc.length - 1].columns || []),
                ...val.columns,
            ];
        }
        return acc;
    }, []);

// ---------------- Main Component ----------------
export default function CustomizeTableColumns({ onClose }) {
    const dispatch = useDispatch();
    const isInstance = isEIA();

    const selector = isInstance
        ? selectInstanceTableColumns
        : selectCostTableColumns;
    const toggleAction = isInstance
        ? toggleInstanceColumnVisibility
        : toggleCostColumnVisibility;
    const columnData = isInstance
        ? instanceAdvisoryColumn
        : CostAdvisoryColumn;

    const storedVisibility = useSelector(selector);
    const [value, setValue] = useState(0);
    const [columnVisibility, setColumnVisibility] = useState(storedVisibility);

    const tabsData = useMemo(() => shapeColumns(columnData), [columnData]);

    useEffect(() => {
        setColumnVisibility(storedVisibility);
    }, [storedVisibility]);

    const handleToggle = (id) => {
        setColumnVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleReset = () => {
        dispatch(resetCustomizeTableColumn());
        onClose();
    };

    const handleApply = () => {
        dispatch(toggleAction(columnVisibility));
        onClose();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarViewMonthIcon fontSize="small" />
                <Typography variant="body1" fontWeight="bold">
                    Customize Table Columns
                </Typography>
            </Box>

            {/* Tabs */}
            <Tabs
                value={value}
                onChange={(_, newVal) => setValue(newVal)}
                sx={{
                    backgroundColor: "secondary.main",
                    borderRadius: 1,
                    p: 0.5,
                    "& .MuiTabs-indicator": { display: "none" },
                    gap: 1,
                }}
            >
                {tabsData.map((col) => (
                    <Tab
                        key={col.id + col.header}
                        label={col.header}
                        sx={{
                            textTransform: "none",
                            borderRadius: 1,
                            px: 2,
                            minHeight: 40,
                            fontWeight: 500,
                            "&.Mui-selected": {
                                backgroundColor: "white",
                                color: "primary.main",
                                border: "1px solid",
                                borderColor: "primary.main",
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                            },
                            "&:hover": {
                                backgroundColor: "white",
                                color: "primary.main",
                            },
                        }}
                    />
                ))}
            </Tabs>

            {/* Panels */}
            {tabsData.map((col, index) => (
                <TabPanel key={col.id} value={value} index={index}>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 1,
                            gridTemplateColumns:
                                col.columns.length > 1 ? "repeat(2, 1fr)" : "1fr",
                        }}
                    >
                        {col.columns.map((subCol, idx) => (
                            <Box
                                key={subCol.id + idx}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 1,
                                    border: "1px solid rgba(122, 118, 118, 0.5)",
                                    borderRadius: 1,
                                }}
                            >
                                <Typography variant="body2">{subCol.header}</Typography>
                                <Switch
                                    checked={!!columnVisibility[subCol.id]}
                                    onChange={() => handleToggle(subCol.id)}
                                    inputProps={{ "aria-label": subCol.header }}
                                />
                            </Box>
                        ))}
                    </Box>
                </TabPanel>
            ))}

            {/* Actions */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button variant="contained" color="error" onClick={onClose} startIcon={<CloseIcon />}>
                    Close
                </Button>
                <Button variant="contained" onClick={handleReset} startIcon={<CloseIcon />}>
                    Reset All
                </Button>
                <Button variant="contained" onClick={handleApply} startIcon={<CheckIcon />}>
                    Apply Changes
                </Button>
            </Box>
        </Box>
    );
}
