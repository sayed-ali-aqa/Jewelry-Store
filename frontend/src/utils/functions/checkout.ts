import { shippingOptions } from "../../../datalist"

export function getShippingMethodValue(value: string) {
    const selectedMethod = shippingOptions.find((option) => option.method === value)

    return selectedMethod ? selectedMethod.price : 0;
}

export function getShippingDurationValue(value: string) {
    const selectedMethod = shippingOptions.find((option) => option.method === value)

    return { minShippingDuration: selectedMethod?.minDuration, maxShippingDuration: selectedMethod?.maxDuration };
}