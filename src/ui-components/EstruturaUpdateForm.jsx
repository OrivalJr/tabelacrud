/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getEstrutura } from "../../queries";
import { updateEstrutura } from "../../mutations";
const client = generateClient();
export default function EstruturaUpdateForm(props) {
  const {
    id: idProp,
    estrutura: estruturaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    descricao: "",
    terraco: false,
  };
  const [descricao, setDescricao] = React.useState(initialValues.descricao);
  const [terraco, setTerraco] = React.useState(initialValues.terraco);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = estruturaRecord
      ? { ...initialValues, ...estruturaRecord }
      : initialValues;
    setDescricao(cleanValues.descricao);
    setTerraco(cleanValues.terraco);
    setErrors({});
  };
  const [estruturaRecord, setEstruturaRecord] =
    React.useState(estruturaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEstrutura.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEstrutura
        : estruturaModelProp;
      setEstruturaRecord(record);
    };
    queryData();
  }, [idProp, estruturaModelProp]);
  React.useEffect(resetStateValues, [estruturaRecord]);
  const validations = {
    descricao: [],
    terraco: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          descricao: descricao ?? null,
          terraco: terraco ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateEstrutura.replaceAll("__typename", ""),
            variables: {
              input: {
                id: estruturaRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EstruturaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Descricao"
        isRequired={false}
        isReadOnly={false}
        value={descricao}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              descricao: value,
              terraco,
            };
            const result = onChange(modelFields);
            value = result?.descricao ?? value;
          }
          if (errors.descricao?.hasError) {
            runValidationTasks("descricao", value);
          }
          setDescricao(value);
        }}
        onBlur={() => runValidationTasks("descricao", descricao)}
        errorMessage={errors.descricao?.errorMessage}
        hasError={errors.descricao?.hasError}
        {...getOverrideProps(overrides, "descricao")}
      ></TextField>
      <SwitchField
        label="Terraco"
        defaultChecked={false}
        isDisabled={false}
        isChecked={terraco}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              descricao,
              terraco: value,
            };
            const result = onChange(modelFields);
            value = result?.terraco ?? value;
          }
          if (errors.terraco?.hasError) {
            runValidationTasks("terraco", value);
          }
          setTerraco(value);
        }}
        onBlur={() => runValidationTasks("terraco", terraco)}
        errorMessage={errors.terraco?.errorMessage}
        hasError={errors.terraco?.hasError}
        {...getOverrideProps(overrides, "terraco")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || estruturaModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || estruturaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
