import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import StorageIcon from "@mui/icons-material/Storage";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";


const CostAdvisaryCard = ({ item, isCCa, page }) => {
    const { currentPlatform, recommendations } = item.data;
    const theme = useTheme();

    const gridHeaderContent = [
        {
            icon: <CloudQueueIcon fontSize="small" />,
            label: currentPlatform.cspProvider ?? "AWS",
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
                <Box
                    display="inline-flex"
                    alignItems="center"
                    px={1.5}
                    py={0.5}
                    sx={{
                        marginLeft: "auto",
                        backgroundColor: "grey.200",
                        borderRadius: "999px", // pill shape
                    }}
                >

                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                        {page}
                    </Typography>

                </Box>

            </Box>

            {/* Recommendations */}
            <Box display="flex" width="100%">
                <RecommandationList recommendations={recommendations} isCCa={isCCa} />
            </Box>
        </Box>
    );
};

export default CostAdvisaryCard;


const RecommandationList = ({ recommendations, isCCa }) => {
    const recomandationName = ["Hourly Cost Optimization", "Modernize", "Modernize & Downside"]

    const getStats = (cost, perf) => [
        {
            icon: PaidOutlinedIcon,
            value: cost ? parseInt(cost) : null,
            suffixIcon: "↑",
            color: "green",
        },
        {
            icon: StackedBarChartIcon,
            value: perf ? parseInt(perf * 10) : null,
            suffixIcon: "↓",
            color: "red",
        },
    ];
    const data = recommendations.map((rec, index) => (
        <Box
            key={rec.instanceType + index}
            flex={1}
            borderRight={index !== 2 ? "1px solid #ddd" : "none"}
            p={1.5}
        >
            <Typography fontWeight="600" variant="body2" mb={1}>
                {recomandationName[index]}
            </Typography>

            <Box display="flex" alignItems="center" gap={3}>
                {/* Instance Type */}
                <Box display="flex" alignItems="center" gap={0.5}>
                    <StorageIcon fontSize="small" />
                    <Typography variant="body2">
                        {rec.instanceType || "c5a.8xlarge"}
                    </Typography>
                </Box>

                {/* Stats Items */}
                {getStats(isCCa ? rec['monthlyCost'] : rec['cost'], rec.perf).map((stat) => (
                    <Box
                        key={stat.value}
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                    >
                        <stat.icon fontSize="small" />
                        <Typography variant="body2">
                            {stat.value ?? "-"}{" "}
                        </Typography>
                        {stat.suffixIcon && (
                            <Typography
                                component="span"
                                color={stat.color}
                                display="inline"
                            >
                                {stat.suffixIcon}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    ))
    return data
}
