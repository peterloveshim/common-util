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
 * @param phoneNumber - 전화번호
 * @returns 국제 전화번호 여부 리턴
 *
 */
export const isValidPhoneNumber = (phoneNumber: string | number) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(String(phoneNumber));
};

/**
 * 입력값의 국내 전화번호 정규 표현식 여부 함수 (하이픈 X)
 *
 * @param phoneNumber - 전화번호
 * @returns 국내 전화번호 여부 리턴
 *
 */
export const isValidKrPhoneNumber = (phoneNumber: string | number) => {
  // 대한민국 휴대폰 번호 정규 표현식 (하이픈 포함 가능)
  //const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  const phoneRegex = /^010\d{8}$/; // 하이픈 제거
  return phoneRegex.test(String(phoneNumber));
};
