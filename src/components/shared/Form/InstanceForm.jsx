import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, lazy, Suspense, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { instanceSchema } from "@/lib/validation/instance.schema";
import {
  addInstance,
  addPortfolioNameList,
  updateFormData,
  updateResetState,
} from "@/redux/features/form/formData.slice";
import { nanoid } from "@reduxjs/toolkit";

import PropTypes from "prop-types";
import {
  selectFormData,
  selectFormReset, 
} from "@/redux/features/form/formData.selector";
import useTimedMessage from "@/hooks/useTimedMessage";
import ErrorBoundary from "../ErrorBoundary";
import FormSkeleton from "./FormSkeleton";

const FormAlert = lazy(() => import("@/components/ui/FormAlert"));
const PortfolioDetails = lazy(() => import("./PortfolioDetails"));
const GenericMetadata = lazy(() => import("./GenericMetadata"));
const ConsumptionMetadata = lazy(() =>
  import("./Consumption Metadata/ConsumptionMetadata")
);

InstanceForm.propTypes = {
  initialValues: PropTypes.shape({
    portfolioName: PropTypes.string,
    region: PropTypes.string,
    instanceType: PropTypes.string,
    uuid: PropTypes.string,
    pricingModel: PropTypes.string,
  }),
};

function InstanceForm() {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const formReset = useSelector(selectFormReset);
  const defaultFormValues = useSelector(selectFormData);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const form = useForm({
    resolver: zodResolver(instanceSchema),
    defaultValues: defaultFormValues,
    mode: "onTouched",
  });

  const handleSubmit = useCallback(
    (data) => {
      dispatch(addPortfolioNameList(data.portfolioName));
      dispatch(addInstance({ id: nanoid(), ...data }));
      setFormSuccess("Instance added successfully");
      setFormError("");
      form.reset({ portfolioName: data.portfolioName });
    },
    [dispatch, setFormSuccess, setFormError, form]
  );

  const handleError = useCallback(
    (errors) => {
      const errorMessages = Object.values(errors)
        .map((err) => err?.message)
        .filter(Boolean)
        .join(", ");
      setFormError(errorMessages || "Form validation failed");
    },
    [setFormError]
  );

  const portfolioName = form.watch("portfolioName");

  useEffect(() => {
    if (portfolioName === formData.portfolioName) return;
    dispatch(updateFormData({ portfolioName: portfolioName }));
  }, [formData, portfolioName, dispatch]);

  useEffect(() => {
    if (formReset) {
      dispatch(updateResetState(false));
      form.reset(formData);
    }
  }, [formReset, formData, form, dispatch]);
  return (
    <Box
      component="form"
      width="100%"
      sx={{
        p: 0,
        py: 2,
        bgcolor: "primary.contrastText",
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={form.handleSubmit(handleSubmit, handleError)}
      noValidate
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

const InstanceFormWithBoundary = () => (
  <ErrorBoundary fallback="Instance form component has some Errors">
    <Suspense fallback={<FormSkeleton />}>
      <InstanceForm />
    </Suspense>
  </ErrorBoundary>
);
export default InstanceFormWithBoundary;
