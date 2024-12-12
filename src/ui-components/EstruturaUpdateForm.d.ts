/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type EstruturaUpdateFormInputValues = {
    descricao?: string;
    terraco?: boolean;
    Condominio?: any;
};
export declare type EstruturaUpdateFormValidationValues = {
    descricao?: ValidationFunction<string>;
    terraco?: ValidationFunction<boolean>;
    Condominio?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EstruturaUpdateFormOverridesProps = {
    EstruturaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    descricao?: PrimitiveOverrideProps<TextFieldProps>;
    terraco?: PrimitiveOverrideProps<SwitchFieldProps>;
    Condominio?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EstruturaUpdateFormProps = React.PropsWithChildren<{
    overrides?: EstruturaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    estrutura?: any;
    onSubmit?: (fields: EstruturaUpdateFormInputValues) => EstruturaUpdateFormInputValues;
    onSuccess?: (fields: EstruturaUpdateFormInputValues) => void;
    onError?: (fields: EstruturaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EstruturaUpdateFormInputValues) => EstruturaUpdateFormInputValues;
    onValidate?: EstruturaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EstruturaUpdateForm(props: EstruturaUpdateFormProps): React.ReactElement;
