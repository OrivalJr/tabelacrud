/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CondominioCreateFormInputValues = {
    nome?: string;
    cnpj?: string;
    bairro?: string;
    cidade?: string;
    Estrutura?: any;
};
export declare type CondominioCreateFormValidationValues = {
    nome?: ValidationFunction<string>;
    cnpj?: ValidationFunction<string>;
    bairro?: ValidationFunction<string>;
    cidade?: ValidationFunction<string>;
    Estrutura?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CondominioCreateFormOverridesProps = {
    CondominioCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nome?: PrimitiveOverrideProps<TextFieldProps>;
    cnpj?: PrimitiveOverrideProps<TextFieldProps>;
    bairro?: PrimitiveOverrideProps<TextFieldProps>;
    cidade?: PrimitiveOverrideProps<TextFieldProps>;
    Estrutura?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CondominioCreateFormProps = React.PropsWithChildren<{
    overrides?: CondominioCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CondominioCreateFormInputValues) => CondominioCreateFormInputValues;
    onSuccess?: (fields: CondominioCreateFormInputValues) => void;
    onError?: (fields: CondominioCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CondominioCreateFormInputValues) => CondominioCreateFormInputValues;
    onValidate?: CondominioCreateFormValidationValues;
} & React.CSSProperties>;
export default function CondominioCreateForm(props: CondominioCreateFormProps): React.ReactElement;
