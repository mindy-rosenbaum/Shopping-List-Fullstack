import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
    style: {
      direction: 'rtl',
      fontSize: '14px',
    }
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 5000,
    style: {
      direction: 'rtl',
      fontSize: '14px',
    }
  });
};

export const showWarning = (message: string) => {
  toast(message, {
    icon: '⚠️',
    duration: 4000,
    style: {
      direction: 'rtl',
      fontSize: '14px',
      background: '#ff9800',
      color: '#fff',
    }
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    icon: 'ℹ️',
    duration: 4000,
    style: {
      direction: 'rtl',
      fontSize: '14px',
    }
  });
};