import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const CostAdvisaryCard = ({ item }) => {
    const { currentPlatform, recommendations } = item.data;
    const theme = useTheme();

    const gridHeaderContent = [
        {
            icon: <CloudQueueIcon fontSize="small" />,
            label: "AWS",
        },
        {
            icon: <PlaceOutlinedIcon fontSize="small" />,
            label: currentPlatform.zone || "us-east-1a",
        },
        {
            icon: <TagOutlinedIcon fontSize="small" />,
            label: currentPlatform.numberOfInstances || "2",
        },
    ];

    return (
        <Box
            border="1px solid #ddd"
            display="flex"
            flexDirection="column"
            width="100%"
        >
            {/* Header Row */}
            <Box
                display="flex"
                alignItems="center"
                gap={4}
                px={2}
                py={1}
                borderBottom="1px solid #ddd"
                fontWeight="bold"
                backgroundColor={theme.palette.secondary.main}
            >
                <Typography>
                    {currentPlatform.instanceType || "c5.12xlarge"}
                </Typography>
                {gridHeaderContent.map((headerItem, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={0.5}>
                        {headerItem.icon}
                        <Typography variant="body2">{headerItem.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Recommendations */}
            <Box display="flex" width="100%">
                {recommendations.map((rec, index) => {
                    const statItems = [
                        {
                            icon: PaidOutlinedIcon,
                            value: rec.monthlyCost ? parseInt(rec.monthlyCost) : null,
                            suffixIcon: "↑",
                            color: "green",
                        },
                        {
                            icon: BarChartIcon,
                            value: rec.perf ? parseInt(rec.perf * 10) : null,
                            suffixIcon: "↓",
                            color: "red",
                        },
                    ];

                    return (
                        <Box
                            key={index}
                            flex={1}
                            borderRight={index !== 2 ? "1px solid #ddd" : "none"}
                            p={1.5}
                        >
                            <Typography fontWeight="600" variant="body2" mb={1}>
                                Recommendation {index + 1}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={3}>
                                {/* Instance Type */}
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <AccessTimeIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {rec.instanceType || "c5a.8xlarge"}
                                    </Typography>
                                </Box>

                                {/* Stats Items */}
                                {statItems.map((stat, idx) => (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                    >
                                        <stat.icon fontSize="small" />
                                        <Typography variant="body2">
                                            {stat.value ?? "-"}{" "}
                                            {stat.suffixIcon && (
                                                <Typography
                                                    component="span"
                                                    color={stat.color}
                                                    display="inline"
                                                >
                                                    {stat.suffixIcon}
                                                </Typography>
                                            )}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default CostAdvisaryCard;
