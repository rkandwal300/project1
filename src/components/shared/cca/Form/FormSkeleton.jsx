import { Box, Skeleton } from "@mui/material";

const FormSkeleton = ({ fields = 5 }) => (
  <Box display="flex" flexDirection="column" gap={2} width="100%">
    {Array.from({ length: fields }).map((_, i) => (
      <Box key={i}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="rectangular" height={40} width="100%" />
      </Box>
    ))}
    <Skeleton variant="rectangular" width={120} height={40} />
  </Box>
);

export default FormSkeleton;