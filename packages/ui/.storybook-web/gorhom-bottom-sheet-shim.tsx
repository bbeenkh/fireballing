/**
 * Storybook web용 @gorhom/bottom-sheet shim
 * 네이티브 전용 바텀시트를 웹에서 시각적으로 모사하는 경량 래퍼
 */
import React, { forwardRef } from 'react';

const BottomSheet = forwardRef<HTMLDivElement, any>(
  (
    {
      children,
      index = -1,
      snapPoints,
      backgroundStyle,
      handleIndicatorStyle,
      backdropComponent: BackdropComponent,
      ...props
    },
    ref,
  ) => {
    const isOpen = index >= 0;
    if (!isOpen) return null;

    return (
      <>
        {BackdropComponent && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 49,
            }}
          />
        )}
        <div
          ref={ref}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
            zIndex: 50,
            minHeight: 200,
            ...backgroundStyle,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#e7ded6',
                ...handleIndicatorStyle,
              }}
            />
          </div>
          {children}
        </div>
      </>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';

const BottomSheetView = ({ children, style }: any) => (
  <div style={style}>{children}</div>
);

const BottomSheetBackdrop = ({ opacity = 0.4 }: any) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: `rgba(0,0,0,${opacity})`,
    }}
  />
);

const BottomSheetScrollView = ({ children, ...props }: any) => (
  <div style={{ overflow: 'auto' }} {...props}>
    {children}
  </div>
);

export default BottomSheet;
export { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView };
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BottomSheetProps {}
export interface BottomSheetBackdropProps {}
