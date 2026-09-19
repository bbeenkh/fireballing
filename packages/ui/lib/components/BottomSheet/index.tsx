import React, { useCallback, useRef } from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { twMerge } from 'tailwind-merge';

interface IBottomSheetProps {
  /** 스냅 포인트 배열 (예: ['25%', '50%', '90%']) */
  snapPoints?: (string | number)[];
  /** 바텀시트 열림 상태 */
  open?: boolean;
  /** 닫힘 콜백 */
  onClose?: () => void;
  /** 배경 딤 표시 여부 (기본값: true) */
  backdrop?: boolean;
  /** 바텀시트 제목 */
  title?: string;
  /** 바텀시트 내부 콘텐츠 */
  children: React.ReactNode;
  /** 추가 스타일 클래스 */
  className?: string;
}

interface IBottomSheetActionProps extends PressableProps {
  /** 액션 버튼 라벨 */
  label: string;
  className?: string;
}

/**
 * # BottomSheet
 * ---
 * - 간단설명: @gorhom/bottom-sheet 기반 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - snapPoints로 시트 높이 제어
 *   - open prop으로 열림/닫힘 제어, onClose로 닫힘 이벤트 수신
 *   - title로 상단 제목 표시
 *   - BottomSheet.Action으로 하단 CTA 버튼 배치
 *   - 피그마 디자인: bg-white, 상단 라운드 20px, 패딩 24px, 간격 20px
 * ---
 * @param snapPoints 스냅 포인트 배열
 * @param open 열림 상태
 * @param onClose 닫힘 콜백
 * @param backdrop 배경 딤 표시 여부
 * @param title 바텀시트 제목
 * @param children 바텀시트 내부 콘텐츠
 * ---
 * @example
 * <BottomSheet open={isOpen} onClose={() => setIsOpen(false)} title="새 그룹">
 *   <Input label="그룹명" placeholder="입력" />
 *   <BottomSheet.Action label="저장" onPress={handleSave} />
 * </BottomSheet>
 */
function BottomSheet({
  snapPoints = ['25%', '50%'],
  open = false,
  onClose,
  backdrop = true,
  title,
  children,
  className,
}: IBottomSheetProps) {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    [],
  );

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      index={open ? 0 : -1}
      snapPoints={snapPoints}
      onClose={onClose}
      enablePanDownToClose
      backdropComponent={backdrop ? renderBackdrop : undefined}
      handleIndicatorStyle={{ backgroundColor: '#e7ded6', width: 40 }}
      backgroundStyle={{
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          className={twMerge('flex flex-col gap-gutter p-lg', className)}
        >
          {title && (
            <Text className="text-subtitle font-bold text-[#0d0b0a]">
              {title}
            </Text>
          )}
          {children}
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
}

/**
 * # BottomSheet.Action
 * ---
 * - 간단설명: 바텀시트 하단 CTA 액션 버튼
 * - 제약사항 및 특이사항:
 *   - 피그마: bg-[#ff5a26], rounded-[12px], p-[16px], 텍스트 중앙정렬
 * ---
 * @param label 버튼 라벨 텍스트
 * ---
 * @example
 * <BottomSheet.Action label="저장" onPress={handleSave} />
 */
function Action({ label, className, ...props }: IBottomSheetActionProps) {
  return (
    <Pressable
      className={twMerge(
        'bg-[#ff5a26] rounded-md p-md items-center justify-center w-full active:bg-[#ff2e00]',
        className,
      )}
      {...props}
    >
      <Text className="text-body font-bold text-[#0d0b0a]">{label}</Text>
    </Pressable>
  );
}

BottomSheet.Action = Action;

export type { IBottomSheetProps, IBottomSheetActionProps };
export default BottomSheet;
