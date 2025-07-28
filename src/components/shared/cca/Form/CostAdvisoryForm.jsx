import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, lazy, Suspense, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { CCAInstanceSchema } from "@/lib/validation/instance.schema";
import { nanoid } from "@reduxjs/toolkit";

import PropTypes from "prop-types";
import useTimedMessage from "@/hooks/useTimedMessage";
import { addInstance } from "@/redux/features/instance/instance.slice";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";

const FormAlert = lazy(() => import("@/components/ui/FormAlert"));
const PortfolioDetails = lazy(() => import("./CCAPortfolioDetails"));
const GenericMetadata = lazy(() => import("./GenericMetadata"));

CostAdvisoryForm.propTypes = {
  initialValues: PropTypes.shape({
    portfolioName: PropTypes.string,
    region: PropTypes.string,
    instanceType: PropTypes.string,
    uuid: PropTypes.string,
    pricingModel: PropTypes.string,
  }),
};

function CostAdvisoryForm() {
  const dispatch = useDispatch();
  const currentProvider = useSelector(selectCurrentProviderName);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const form = useForm({
    resolver: zodResolver(CCAInstanceSchema),
    defaultValues: {
      region: "",
      instanceType: "",
      pricingModel: "",
      quantity: "",
      noOfHours: "",
      uuid: "",
    },
    mode: "onTouched",
  });

  const handleSubmit = useCallback(
    (data) => {
      dispatch(
        addInstance({
          id: nanoid(),
          ...data,
          uuid: data.uuid || nanoid(),
          cloud: currentProvider,
        })
      );
      setFormSuccess("Instance added successfully");
      setFormError("");
      form.reset({});
    },
    [dispatch, setFormSuccess, setFormError, form, currentProvider]
  );

  const handleError = (errors) => {
    console.log({errors})
    setFormError("Please enter the required fields.");
  };

  useEffect(() => {
    form.reset({});
  }, [form, currentProvider]);

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleSubmit, handleError)}
      noValidate
      width="100%"
      sx={{
        p: 0,
        py: 2,
        bgcolor: "primary.contrastText",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={null}>
        <PortfolioDetails form={form} />
        <Divider sx={{ mt: 1 }} />

        <GenericMetadata form={form} />
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

export default CostAdvisoryForm;
