export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^(0|\+84)[0-9]{9}$/,

  // Kiểm tra định dạng email hoặc số điện thoại
  emailOrPhone: {
    required: 'Vui lòng nhập email hoặc SĐT',
    validate: value => {
      const trimmedValue = value.trim();
      return (
        VALIDATION_RULES.EMAIL_REGEX.test(trimmedValue) ||
        VALIDATION_RULES.PHONE_REGEX.test(trimmedValue) ||
        'Vui lòng nhập đúng định dạng email hoặc SĐT'
      );
    },
  },

  // Kiểm tra định dạng mật khẩu
  password: {
    required: 'Vui lòng nhập mật khẩu',
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự',
    },
  },

  // Kiểm tra định dạng mật khẩu mới
  newPassword: {
    required: 'Vui lòng nhập mật khẩu mới',
    minLength: {
      value: 8,
      message: 'Mật khẩu mới phải có ít nhất 8 ký tự',
    },
    validate: value => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase || !hasLowerCase) {
        return 'Mật khẩu mới phải có cả chữ hoa và chữ thường';
      }
      if (!hasNumbers) {
        return 'Mật khẩu mới phải có ít nhất 1 chữ số';
      }
      if (!hasSpecialChar) {
        return 'Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt';
      }
      return true;
    },
  },

  // Kiểm tra mật khẩu xác nhận
  confirmPassword: watchPassword => value =>
    value === watchPassword || 'Mật khẩu xác nhận không khớp',
};
