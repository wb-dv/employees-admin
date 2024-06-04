const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const deleteEmptyValues = <Data extends Record<string, unknown>>(
  values: Data,
): Data => {
  const copyData = { ...values };

  Object.keys(copyData).forEach((key: keyof Data) => {
    const value = copyData[key];

    if (!value) delete copyData[key];

    if (isObject(value)) copyData[key] = deleteEmptyValues(value);
  });

  return copyData;
};
