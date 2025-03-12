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
 * 입력값 + 콤마 리턴
 *
 * @example
 * ```ts
 * const result = fNumber(10000, { code: "ko-KR", currency: "KRW" }); // result = "10,000"
 * ```
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
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
 * 입력값 + 콤마 + 화폐 기호 리턴
 *
 * @example
 * ```ts
 * const result = fCurrency(10000, { code: "ko-KR", currency: "KRW" }); // result = "₩10,000"
 * ```
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 + 콤마 + 화폐 기호 리턴
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
 * 입력값 + 콤마 + 화폐 기호 리턴
 *
 * @example
 * ```ts
 * const result = fPercent(10.12, { code: "ko-KR", currency: "KRW" }, {
 *  maximumFractionDigits: 2
 * });
 * // result = "10.12%"
 * ```
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 + 콤마 + 화폐 기호 리턴
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
    minimumFractionDigits: 0, // 소수점 없으면 XX%
    maximumFractionDigits: 2, // 소수점 있으면 최대 두자리까지 XX.YY%
    ...options,
  }).format(number / 100);

  return fm;
}

/**
 * 입력값 줄임말 리턴
 *
 * @example
 * ```ts
 * const result = fShortenNumber(10000, { code: "ko-KR", currency: "KRW" }); // result = "1만"
 * const result = fShortenNumber(10000, { code: "en-US", currency: "USD" }); // result = "10k"
 * ```
 *
 * @param inputValue - 숫자 입력값
 * @param localeValue - { code: "ko-KR", currency: "KRW" }
 * @param options - Intl.NumberFormat 2번째 인자값
 *
 * @returns 입력값 줄임말 리턴
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

/**
 * 입력한 bytes 를 유닛 단위 리턴
 *
 * @example
 * ```ts
 * const result = fData(10000); // result = "9.77 Kb"
 * ```
 *
 * @param inputValue - 숫자 입력값
 *
 * @returns 입력값 유닛 단위 리턴
 *
 */
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
