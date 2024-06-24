export const isNameValid = (name: string) => name.length >= 3 && name.length <= 100;
export const isDescriptionValid = (description: string) => description.length >= 5 && description.length <= 1000;
export const isPriceValid = (price: number) => price >= 1 && price <= 20000; 