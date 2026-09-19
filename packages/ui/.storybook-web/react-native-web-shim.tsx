/**
 * Storybook web용 react-native shim
 * react-native-web 대신 className을 DOM에 직접 전달하는 경량 래퍼
 * NativeWind 런타임 없이 Tailwind CSS 유틸리티가 적용되도록 함
 */
import React from 'react';

type ViewProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type TextProps = React.HTMLAttributes<HTMLSpanElement> & { className?: string };
type PressableProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  onPress?: () => void;
};
type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholderTextColor?: string;
};

export const View = React.forwardRef<HTMLDivElement, ViewProps>(
  ({ children, ...props }, ref) => <div ref={ref} data-rn-view="" {...props}>{children}</div>,
);
View.displayName = 'View';

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ children, ...props }, ref) => <span ref={ref} {...props}>{children}</span>,
);
Text.displayName = 'Text';

export const Pressable = React.forwardRef<HTMLButtonElement, PressableProps>(
  ({ children, onPress, ...props }, ref) => (
    <button ref={ref} type="button" onClick={onPress} {...props}>{children}</button>
  ),
);
Pressable.displayName = 'Pressable';

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ placeholderTextColor, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      style={{ ...((props.style as React.CSSProperties) || {}), ...(placeholderTextColor ? { '--placeholder-color': placeholderTextColor } as React.CSSProperties : {}) }}
    />
  ),
);
TextInput.displayName = 'TextInput';

// re-export types
export type { ViewProps, TextProps, PressableProps as PressableProps, TextInputProps };
