import { Toaster as Sonner } from 'sonner@2.0.3';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          background: 'white',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
        },
        className: 'sonner-toast',
      }}
      {...props}
    />
  );
};

export { Toaster };
