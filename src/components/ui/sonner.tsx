import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Toaster premium noir/or — position bottom-right, glassmorphism, accents dorés
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      duration={5000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-black-deep/90 !backdrop-blur-xl !border !border-gold/25 !text-foreground !shadow-elevate !rounded-xl !font-sans",
          title: "!font-display !text-foreground !tracking-tight",
          description: "!text-foreground/65 !text-sm !leading-relaxed",
          success: "!border-gold/40",
          error: "!border-destructive/50",
          actionButton: "!bg-gradient-gold !text-black-deep !font-semibold",
          cancelButton: "!bg-black-elevated/60 !text-foreground/70",
          icon: "!text-gold",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
