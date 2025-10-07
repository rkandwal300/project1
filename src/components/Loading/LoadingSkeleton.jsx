import { Skeleton, Box } from "@mui/material";

function LoadingSkeleton({ lines = 20, width = "80%", height = 20, spacing = 6 }) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            px={"10px"}
            gap={"4"}
        >
            {[...Array(lines)].map((_, i) => (
                <Skeleton
                    key={"ske" + i}
                    animation="wave"
                    height={height}
                    width={width}
                    style={{ marginBottom: i !== lines - 1 ? spacing : 0 }}
                    variant="rectangular"
                />
            ))}
        </Box>
    );
}

export default LoadingSkeleton;
