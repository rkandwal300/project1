import React from "react";
import { useTheme, useMediaQuery } from "@mui/material"; 
import BarChart from "./BarChart";

const data = {
    currentPlatform: {
        cost: 4061.84,
        power: 1455.14,
        carbon: 170.68,
    },
    recommendations: [
        { cost: 4395.34, power: 694.485882, carbon: 81.42874 },
        { cost: 4915.78, power: 962.145882, carbon: 112.887394 },
        { cost: 6208.44, power: 1397.885882, carbon: 176.5321 },
    ],
};

const Dashboard = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "24px",
        padding: "16px",
    };

    const gridMdStyle = {
        gridTemplateColumns: "repeat(3, 1fr)",
    };

    return (
        <div
            style={{
                ...gridStyle,
                ...(isMd ? gridMdStyle : {}),
            }}
        >
            <div style={{ width: "100%" }}>
                <BarChart
                    title="Cost"
                    currentValue={data.currentPlatform.cost}
                    recommendations={data.recommendations}
                    yLabel="cost"
                    unit="$"
                />
            </div>
            <div style={{ width: "100%" }}>
                <BarChart
                    title="Power"
                    currentValue={data.currentPlatform.power}
                    recommendations={data.recommendations}
                    yLabel="power"
                    unit="kW"
                />
            </div>
            <div style={{ width: "100%" }}>
                <BarChart
                    title="Carbon"
                    currentValue={data.currentPlatform.carbon}
                    recommendations={data.recommendations}
                    yLabel="carbon"
                    unit="kgCO₂eq"
                />
            </div>
        </div>
    );
};

export default Dashboard;
