import { BsExclamationTriangle } from 'react-icons/bs';
import { FaRegCircleCheck } from 'react-icons/fa6';

interface FormStatusProps {
  message: string;
  type: 'success' | 'error';
}

const FormStatus = ({ message, type }: FormStatusProps) => {
  const configs = {
    success: {
      icon: <FaRegCircleCheck />,
      bgClass: 'bg-emerald-500/15',
      textClass: 'text-emerald-500',
    },

    error: {
      icon: <BsExclamationTriangle />,
      bgClass: 'bg-destructive/15',
      textClass: 'text-destructive',
    },
  };
  const { icon, bgClass, textClass } = configs[type];

  return (
    <div className={`flex items-center gap-x-2 rounded-md p-3 text-lg ${bgClass} ${textClass}`}>
      <span className="text-2xl">{icon}</span>
      <p>{message}</p>
    </div>
  );
};

export default FormStatus;
