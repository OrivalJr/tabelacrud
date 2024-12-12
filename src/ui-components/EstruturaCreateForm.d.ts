/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type EstruturaCreateFormInputValues = {
    descricao?: string;
    terraco?: boolean;
};
export declare type EstruturaCreateFormValidationValues = {
    descricao?: ValidationFunction<string>;
    terraco?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EstruturaCreateFormOverridesProps = {
    EstruturaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    descricao?: PrimitiveOverrideProps<TextFieldProps>;
    terraco?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type EstruturaCreateFormProps = React.PropsWithChildren<{
    overrides?: EstruturaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EstruturaCreateFormInputValues) => EstruturaCreateFormInputValues;
    onSuccess?: (fields: EstruturaCreateFormInputValues) => void;
    onError?: (fields: EstruturaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EstruturaCreateFormInputValues) => EstruturaCreateFormInputValues;
    onValidate?: EstruturaCreateFormValidationValues;
} & React.CSSProperties>;
export default function EstruturaCreateForm(props: EstruturaCreateFormProps): React.ReactElement;
