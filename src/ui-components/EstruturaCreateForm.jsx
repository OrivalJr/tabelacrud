/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listCondominios } from "../../queries";
import {
  createEstrutura,
  updateCondominio,
  updateEstrutura,
} from "../../mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EstruturaCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    Condominio: undefined,
  };
  const [descricao, setDescricao] = React.useState(initialValues.descricao);
  const [terraco, setTerraco] = React.useState(initialValues.terraco);
  const [Condominio, setCondominio] = React.useState(initialValues.Condominio);
  const [CondominioLoading, setCondominioLoading] = React.useState(false);
  const [condominioRecords, setCondominioRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDescricao(initialValues.descricao);
    setTerraco(initialValues.terraco);
    setCondominio(initialValues.Condominio);
    setCurrentCondominioValue(undefined);
    setCurrentCondominioDisplayValue("");
    setErrors({});
  };
  const [currentCondominioDisplayValue, setCurrentCondominioDisplayValue] =
    React.useState("");
  const [currentCondominioValue, setCurrentCondominioValue] =
    React.useState(undefined);
  const CondominioRef = React.createRef();
  const getIDValue = {
    Condominio: (r) => JSON.stringify({ id: r?.id }),
  };
  const CondominioIdSet = new Set(
    Array.isArray(Condominio)
      ? Condominio.map((r) => getIDValue.Condominio?.(r))
      : getIDValue.Condominio?.(Condominio)
  );
  const getDisplayValue = {
    Condominio: (r) => `${r?.nome ? r?.nome + " - " : ""}${r?.id}`,
  };
  const validations = {
    descricao: [],
    terraco: [],
    Condominio: [],
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
  const fetchCondominioRecords = async (value) => {
    setCondominioLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ nome: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listCondominios.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listCondominios?.items;
      var loaded = result.filter(
        (item) => !CondominioIdSet.has(getIDValue.Condominio?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setCondominioRecords(newOptions.slice(0, autocompleteLength));
    setCondominioLoading(false);
  };
  React.useEffect(() => {
    fetchCondominioRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          descricao,
          terraco,
          Condominio,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            descricao: modelFields.descricao,
            terraco: modelFields.terraco,
            estruturaCondominioId: modelFields?.Condominio?.id,
          };
          const estrutura = (
            await client.graphql({
              query: createEstrutura.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createEstrutura;
          const promises = [];
          const condominioToLink = modelFields.Condominio;
          if (condominioToLink) {
            promises.push(
              client.graphql({
                query: updateCondominio.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: Condominio.id,
                    condominioEstruturaId: estrutura.id,
                  },
                },
              })
            );
            const estruturaToUnlink = await condominioToLink.Estrutura;
            if (estruturaToUnlink) {
              promises.push(
                client.graphql({
                  query: updateEstrutura.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: estruturaToUnlink.id,
                      estruturaCondominioId: null,
                    },
                  },
                })
              );
            }
          }
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EstruturaCreateForm")}
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
              Condominio,
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
              Condominio,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              descricao,
              terraco,
              Condominio: value,
            };
            const result = onChange(modelFields);
            value = result?.Condominio ?? value;
          }
          setCondominio(value);
          setCurrentCondominioValue(undefined);
          setCurrentCondominioDisplayValue("");
        }}
        currentFieldValue={currentCondominioValue}
        label={"Condominio"}
        items={Condominio ? [Condominio] : []}
        hasError={errors?.Condominio?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Condominio", currentCondominioValue)
        }
        errorMessage={errors?.Condominio?.errorMessage}
        getBadgeText={getDisplayValue.Condominio}
        setFieldValue={(model) => {
          setCurrentCondominioDisplayValue(
            model ? getDisplayValue.Condominio(model) : ""
          );
          setCurrentCondominioValue(model);
        }}
        inputFieldRef={CondominioRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Condominio"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Condominio"
          value={currentCondominioDisplayValue}
          options={condominioRecords
            .filter((r) => !CondominioIdSet.has(getIDValue.Condominio?.(r)))
            .map((r) => ({
              id: getIDValue.Condominio?.(r),
              label: getDisplayValue.Condominio?.(r),
            }))}
          isLoading={CondominioLoading}
          onSelect={({ id, label }) => {
            setCurrentCondominioValue(
              condominioRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCondominioDisplayValue(label);
            runValidationTasks("Condominio", label);
          }}
          onClear={() => {
            setCurrentCondominioDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchCondominioRecords(value);
            if (errors.Condominio?.hasError) {
              runValidationTasks("Condominio", value);
            }
            setCurrentCondominioDisplayValue(value);
            setCurrentCondominioValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Condominio", currentCondominioDisplayValue)
          }
          errorMessage={errors.Condominio?.errorMessage}
          hasError={errors.Condominio?.hasError}
          ref={CondominioRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Condominio")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
