import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { createGlobalStyle } from "styled-components";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const ToasterStyles = createGlobalStyle`
  .toaster {
    .toast {
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border: 1px solid hsl(var(--border));
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 0.5rem;
      padding: 1rem;
      
      [data-description] {
        color: hsl(var(--muted-foreground));
      }
      
      [data-button] {
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        font-weight: 500;
        
        &[data-cancel] {
          background: hsl(var(--muted));
          color: hsl(var(--muted-foreground));
        }
      }
    }
  }
`;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <>
      <ToasterStyles />
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster"
        {...props}
      />
    </>
  );
};

export { Toaster };


