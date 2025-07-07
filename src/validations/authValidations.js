const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/;

export const VALIDATION_RULES = {
  fullName: {
    required: 'Vui lòng nhập họ và tên',
  },

  userName: {
    required: 'Vui lòng nhập tên đăng nhập',
  },

  email: {
    required: 'Vui lòng nhập email',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Email không hợp lệ',
    },
  },

  phone: {
    required: 'Vui lòng nhập số điện thoại',
    pattern: {
      value: PHONE_REGEX,
      message: 'Số điện thoại không hợp lệ (định dạng Việt Nam)',
    },
  },

  emailOrPhone: {
    required: 'Vui lòng nhập email hoặc SĐT',
    validate: value => {
      const trimmed = value?.trim();
      return (
        EMAIL_REGEX.test(trimmed) ||
        PHONE_REGEX.test(trimmed) ||
        'Vui lòng nhập đúng định dạng email hoặc SĐT'
      );
    },
  },

  password: {
    required: 'Vui lòng nhập mật khẩu',
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự',
    },
  },

  newPassword: {
    required: 'Vui lòng nhập mật khẩu mới',
    minLength: {
      value: 8,
      message: 'Mật khẩu mới phải có ít nhất 8 ký tự',
    },
    validate: value => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase || !hasLowerCase) {
        return 'Mật khẩu phải có cả chữ hoa và chữ thường';
      }
      if (!hasNumber) {
        return 'Mật khẩu phải có ít nhất một số';
      }
      if (!hasSpecialChar) {
        return 'Mật khẩu phải có ít nhất một ký tự đặc biệt';
      }
      return true;
    },
  },

  confirmPassword: watchPassword => ({
    required: 'Vui lòng nhập lại mật khẩu',
    validate: value =>
      value === watchPassword || 'Mật khẩu xác nhận không khớp',
  }),

  yearOfBirth: {
    required: 'Vui lòng nhập năm sinh',
    pattern: {
      value: /^\d{4}$/,
      message: 'Năm sinh phải là 4 chữ số',
    },
  },

  address: {
    required: 'Vui lòng nhập địa chỉ',
    minLength: {
      value: 5,
      message: 'Địa chỉ quá ngắn',
    },
  },

  nationality: {
    required: 'Vui lòng chọn quốc gia',
  },

  gender: {
    required: 'Vui lòng chọn giới tính',
    validate: value =>
      ['male', 'female', 'other'].includes(value)
        ? true
        : 'Giới tính không hợp lệ',
  },
};
