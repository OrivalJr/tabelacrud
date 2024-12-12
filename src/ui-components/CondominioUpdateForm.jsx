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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCondominio, listEstruturas } from "../../queries";
import { updateCondominio, updateEstrutura } from "../../mutations";
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
export default function CondominioUpdateForm(props) {
  const {
    id: idProp,
    condominio: condominioModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    nome: "",
    cnpj: "",
    bairro: "",
    cidade: "",
    Estrutura: undefined,
  };
  const [nome, setNome] = React.useState(initialValues.nome);
  const [cnpj, setCnpj] = React.useState(initialValues.cnpj);
  const [bairro, setBairro] = React.useState(initialValues.bairro);
  const [cidade, setCidade] = React.useState(initialValues.cidade);
  const [Estrutura, setEstrutura] = React.useState(initialValues.Estrutura);
  const [EstruturaLoading, setEstruturaLoading] = React.useState(false);
  const [estruturaRecords, setEstruturaRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = condominioRecord
      ? { ...initialValues, ...condominioRecord, Estrutura }
      : initialValues;
    setNome(cleanValues.nome);
    setCnpj(cleanValues.cnpj);
    setBairro(cleanValues.bairro);
    setCidade(cleanValues.cidade);
    setEstrutura(cleanValues.Estrutura);
    setCurrentEstruturaValue(undefined);
    setCurrentEstruturaDisplayValue("");
    setErrors({});
  };
  const [condominioRecord, setCondominioRecord] =
    React.useState(condominioModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCondominio.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCondominio
        : condominioModelProp;
      const EstruturaRecord = record ? await record.Estrutura : undefined;
      setEstrutura(EstruturaRecord);
      setCondominioRecord(record);
    };
    queryData();
  }, [idProp, condominioModelProp]);
  React.useEffect(resetStateValues, [condominioRecord, Estrutura]);
  const [currentEstruturaDisplayValue, setCurrentEstruturaDisplayValue] =
    React.useState("");
  const [currentEstruturaValue, setCurrentEstruturaValue] =
    React.useState(undefined);
  const EstruturaRef = React.createRef();
  const getIDValue = {
    Estrutura: (r) => JSON.stringify({ id: r?.id }),
  };
  const EstruturaIdSet = new Set(
    Array.isArray(Estrutura)
      ? Estrutura.map((r) => getIDValue.Estrutura?.(r))
      : getIDValue.Estrutura?.(Estrutura)
  );
  const getDisplayValue = {
    Estrutura: (r) => `${r?.descricao ? r?.descricao + " - " : ""}${r?.id}`,
  };
  const validations = {
    nome: [],
    cnpj: [],
    bairro: [],
    cidade: [],
    Estrutura: [],
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
  const fetchEstruturaRecords = async (value) => {
    setEstruturaLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ descricao: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listEstruturas.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listEstruturas?.items;
      var loaded = result.filter(
        (item) => !EstruturaIdSet.has(getIDValue.Estrutura?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setEstruturaRecords(newOptions.slice(0, autocompleteLength));
    setEstruturaLoading(false);
  };
  React.useEffect(() => {
    fetchEstruturaRecords("");
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
          nome: nome ?? null,
          cnpj: cnpj ?? null,
          bairro: bairro ?? null,
          cidade: cidade ?? null,
          Estrutura: Estrutura ?? null,
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
          const promises = [];
          const estruturaToUnlink = await condominioRecord.Estrutura;
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
          const estruturaToLink = modelFields.Estrutura;
          if (estruturaToLink) {
            promises.push(
              client.graphql({
                query: updateEstrutura.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: Estrutura.id,
                    estruturaCondominioId: condominioRecord.id,
                  },
                },
              })
            );
            const condominioToUnlink = await estruturaToLink.Condominio;
            if (condominioToUnlink) {
              promises.push(
                client.graphql({
                  query: updateCondominio.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: condominioToUnlink.id,
                      condominioEstruturaId: null,
                    },
                  },
                })
              );
            }
          }
          const modelFieldsToSave = {
            nome: modelFields.nome ?? null,
            cnpj: modelFields.cnpj ?? null,
            bairro: modelFields.bairro ?? null,
            cidade: modelFields.cidade ?? null,
            condominioEstruturaId: modelFields?.Estrutura?.id ?? null,
          };
          promises.push(
            client.graphql({
              query: updateCondominio.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: condominioRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "CondominioUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nome"
        isRequired={false}
        isReadOnly={false}
        value={nome}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nome: value,
              cnpj,
              bairro,
              cidade,
              Estrutura,
            };
            const result = onChange(modelFields);
            value = result?.nome ?? value;
          }
          if (errors.nome?.hasError) {
            runValidationTasks("nome", value);
          }
          setNome(value);
        }}
        onBlur={() => runValidationTasks("nome", nome)}
        errorMessage={errors.nome?.errorMessage}
        hasError={errors.nome?.hasError}
        {...getOverrideProps(overrides, "nome")}
      ></TextField>
      <TextField
        label="Cnpj"
        isRequired={false}
        isReadOnly={false}
        value={cnpj}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nome,
              cnpj: value,
              bairro,
              cidade,
              Estrutura,
            };
            const result = onChange(modelFields);
            value = result?.cnpj ?? value;
          }
          if (errors.cnpj?.hasError) {
            runValidationTasks("cnpj", value);
          }
          setCnpj(value);
        }}
        onBlur={() => runValidationTasks("cnpj", cnpj)}
        errorMessage={errors.cnpj?.errorMessage}
        hasError={errors.cnpj?.hasError}
        {...getOverrideProps(overrides, "cnpj")}
      ></TextField>
      <TextField
        label="Bairro"
        isRequired={false}
        isReadOnly={false}
        value={bairro}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nome,
              cnpj,
              bairro: value,
              cidade,
              Estrutura,
            };
            const result = onChange(modelFields);
            value = result?.bairro ?? value;
          }
          if (errors.bairro?.hasError) {
            runValidationTasks("bairro", value);
          }
          setBairro(value);
        }}
        onBlur={() => runValidationTasks("bairro", bairro)}
        errorMessage={errors.bairro?.errorMessage}
        hasError={errors.bairro?.hasError}
        {...getOverrideProps(overrides, "bairro")}
      ></TextField>
      <TextField
        label="Cidade"
        isRequired={false}
        isReadOnly={false}
        value={cidade}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nome,
              cnpj,
              bairro,
              cidade: value,
              Estrutura,
            };
            const result = onChange(modelFields);
            value = result?.cidade ?? value;
          }
          if (errors.cidade?.hasError) {
            runValidationTasks("cidade", value);
          }
          setCidade(value);
        }}
        onBlur={() => runValidationTasks("cidade", cidade)}
        errorMessage={errors.cidade?.errorMessage}
        hasError={errors.cidade?.hasError}
        {...getOverrideProps(overrides, "cidade")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              nome,
              cnpj,
              bairro,
              cidade,
              Estrutura: value,
            };
            const result = onChange(modelFields);
            value = result?.Estrutura ?? value;
          }
          setEstrutura(value);
          setCurrentEstruturaValue(undefined);
          setCurrentEstruturaDisplayValue("");
        }}
        currentFieldValue={currentEstruturaValue}
        label={"Estrutura"}
        items={Estrutura ? [Estrutura] : []}
        hasError={errors?.Estrutura?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Estrutura", currentEstruturaValue)
        }
        errorMessage={errors?.Estrutura?.errorMessage}
        getBadgeText={getDisplayValue.Estrutura}
        setFieldValue={(model) => {
          setCurrentEstruturaDisplayValue(
            model ? getDisplayValue.Estrutura(model) : ""
          );
          setCurrentEstruturaValue(model);
        }}
        inputFieldRef={EstruturaRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Estrutura"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Estrutura"
          value={currentEstruturaDisplayValue}
          options={estruturaRecords
            .filter((r) => !EstruturaIdSet.has(getIDValue.Estrutura?.(r)))
            .map((r) => ({
              id: getIDValue.Estrutura?.(r),
              label: getDisplayValue.Estrutura?.(r),
            }))}
          isLoading={EstruturaLoading}
          onSelect={({ id, label }) => {
            setCurrentEstruturaValue(
              estruturaRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEstruturaDisplayValue(label);
            runValidationTasks("Estrutura", label);
          }}
          onClear={() => {
            setCurrentEstruturaDisplayValue("");
          }}
          defaultValue={Estrutura}
          onChange={(e) => {
            let { value } = e.target;
            fetchEstruturaRecords(value);
            if (errors.Estrutura?.hasError) {
              runValidationTasks("Estrutura", value);
            }
            setCurrentEstruturaDisplayValue(value);
            setCurrentEstruturaValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Estrutura", currentEstruturaDisplayValue)
          }
          errorMessage={errors.Estrutura?.errorMessage}
          hasError={errors.Estrutura?.hasError}
          ref={EstruturaRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Estrutura")}
        ></Autocomplete>
      </ArrayField>
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
          isDisabled={!(idProp || condominioModelProp)}
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
              !(idProp || condominioModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
