import { test, expect } from "vitest";
import {
  fNumber,
  fCurrency,
  fPercent,
  fShortenNumber,
  fData,
} from "./format-number";

const US_LOCALE = { code: "en-US", currency: "USD" };
const KR_LOCALE = { code: "ko-KR", currency: "KRW" };

test("fNumber test", () => {
  expect(fNumber(10000, US_LOCALE)).toBe("10,000");
  expect(fNumber(10000, KR_LOCALE)).toBe("10,000");
});

test("fCurrency test", () => {
  expect(fCurrency(10000, US_LOCALE)).toBe("$10,000");
  expect(fCurrency(10000, KR_LOCALE)).toBe("₩10,000");
});

test("fPercent test", () => {
  expect(fPercent(10000, US_LOCALE)).toBe("10,000%");
  expect(fPercent(10000, KR_LOCALE)).toBe("10,000%");
});

test("fShortenNumber test", () => {
  expect(fShortenNumber(10000, US_LOCALE)).toBe("10k");
  expect(fShortenNumber(10000, KR_LOCALE)).toBe("1만");
});

test("fData test", () => {
  expect(fData(10000)).toBe("9.77 Kb");
});
