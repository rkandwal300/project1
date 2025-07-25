import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch,useSelector } from "react-redux";
import { useCallback, lazy, Suspense, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { instanceSchema } from "@/lib/validation/instance.schema";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import useTimedMessage from "@/hooks/useTimedMessage";
import ErrorBoundary from "../ErrorBoundary";
import FormSkeleton from "./FormSkeleton";
import { addInstance } from "@/redux/features/instance/instance.slice"; 
import PortfolioDetails from "./PortfolioDetails";
import GenericMetadata from "./GenericMetadata";
import ConsumptionMetadata from "./Consumption Metadata/ConsumptionMetadata"; 
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";

const FormAlert = lazy(() => import("@/components/ui/FormAlert"));

function InstanceForm() {
  const dispatch = useDispatch();
 
  const providerName = useSelector(selectCurrentProviderName);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const form = useForm({
    resolver: zodResolver(instanceSchema),
    defaultValues: {},
    mode: "onTouched",
  });

  const handleSubmit = useCallback(
    (data) => {
      dispatch(
        addInstance({ id: nanoid(), ...data, uuid: data.uuid || nanoid() })
      );
      setFormSuccess("Instance added successfully");
      setFormError("");
      form.reset({});
    },
    [dispatch, setFormSuccess, setFormError, form]
  );

  const handleError = () => {
    setFormError("Please enter the required fields.");
  };

  useEffect(() => {
    form.reset({});
  }, [form, providerName]);
  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleSubmit, handleError)}
      noValidate
      width="100%"
      sx={{
        p: 0,
        pb: 2,
        bgcolor: "primary.contrastText",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={null}>
        <PortfolioDetails form={form} />
        <Divider />

        <GenericMetadata form={form} />
        <ConsumptionMetadata form={form} />
      </Suspense>

      <FormAlert
        open={!!formError}
        severity="error"
        onClose={() => setFormError("")}
      >
        {formError}
      </FormAlert>
      <FormAlert
        open={!!formSuccess}
        severity="success"
        onClose={() => setFormSuccess("")}
      >
        {formSuccess}
      </FormAlert>
    </Box>
  );
}

InstanceForm.propTypes = {
  initialValues: PropTypes.shape({
    portfolioName: PropTypes.string,
    region: PropTypes.string,
    instanceType: PropTypes.string,
    uuid: PropTypes.string,
    pricingModel: PropTypes.string,
  }),
};

const InstanceFormWithBoundary = () => (
  <ErrorBoundary fallback="Instance form component has some Errors">
    <Suspense fallback={<FormSkeleton />}>
      <InstanceForm />
    </Suspense>
  </ErrorBoundary>
);
export default InstanceFormWithBoundary;
