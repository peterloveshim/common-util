/*
 * Locales code
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

import { InputNumberValue, Locale, Options } from "./";

const DEFAULT_LOCALE = { code: "ko-KR", currency: "KRW" };
//const DEFAULT_LOCALE = { code: "en-US", currency: "USD" };

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

/**
 * 입력값 콤마 리턴
 *
 * @type Options
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - 예 : { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 콤마 리턴
 *
 */
export function fNumber(
  inputValue: InputNumberValue,
  localeValue?: Locale,
  options?: Options
) {
  const locale = localeValue || DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

/**
 * 입력값 콤마 리턴
 *
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 콤마 리턴
 *
 */
export function fCurrency(
  inputValue: InputNumberValue,
  localeValue?: Locale,
  options?: Options
) {
  const locale = localeValue || DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    style: "currency",
    currency: locale.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

/**
 * 입력값 콤마 리턴
 *
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 콤마 리턴
 *
 */
export function fPercent(
  inputValue: InputNumberValue,
  localeValue?: Locale,
  options?: Options
) {
  const locale = localeValue || DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number / 100);

  return fm;
}

/**
 * 입력값 콤마 리턴
 *
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 콤마 리턴
 *
 */
export function fShortenNumber(
  inputValue: InputNumberValue,
  localeValue?: Locale,
  options?: Options
) {
  const locale = localeValue || DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(locale.code, {
    notation: "compact",
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

export function fData(inputValue: InputNumberValue) {
  const number = processInput(inputValue);
  if (number === null || number === 0) return "0 bytes";

  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
  const decimal = 2;
  const baseValue = 1024;

  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${
    units[index]
  }`;

  return fm;
}
