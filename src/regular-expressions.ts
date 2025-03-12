/**
 * 입력값의 이메일 정규 표현식 여부 함수
 *
 * @param email - 이메일
 * @returns 이메일 여부 리턴
 *
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 입력값의 국제 전화번호 정규 표현식 여부 함수
 *
 * @param number - 전화번호
 * @returns 국제 전화번호 여부 리턴
 *
 */
export const isValidPhoneNumber = (number: string) => {
  const cleaned = number.replace(/[\s\-\(\)]/g, ""); // 공백, -, () 제거
  const intlPhoneRegex = /^\+?[1-9]\d{6,14}$/; // E.164 기준 (1~15자리 숫자)

  return intlPhoneRegex.test(cleaned);
};

/**
 * 입력값의 국내 전화번호 정규 표현식 여부 함수
 * - 하이픈 여부 상관없음
 *
 * @param number 전화번호
 * @returns 국내 전화번호 여부 리턴
 *
 */
export const isValidKrPhoneNumber = (number: string) => {
  const cleaned = number.replace(/\D/g, ""); // 숫자만 남기기
  if (!/^01[0-9]\d{7,8}$/.test(cleaned)) return false; // 기본 패턴 검사

  // 중간 번호 (3~4자리) 추출
  const middlePart =
    cleaned.length === 10 ? cleaned.slice(2, 5) : cleaned.slice(3, 7);

  // 중간 번호가 000~099이면 유효하지 않음 (비현실적인 번호)
  if (/^0\d{2,3}$/.test(middlePart)) return false;

  return true;
};
