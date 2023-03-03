/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */

import { DataType } from "./type";

export const unknownProp = null;

export const numericProp = [Number, String];

export const truthProp = {
  type: Boolean,
  default: true,
};

export const falsyProp = {
  type: Boolean,
  default: false,
};

export const makeRequiredProp = (type) => ({
  type,
  required: true,
});

export const makeArrayProp = (defaultVal) => ({
  type: Array,
  default: () => (DataType.isArray(defaultVal) ? defaultVal : []),
});

export const makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal,
});

export const makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal,
});

export const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal,
});
