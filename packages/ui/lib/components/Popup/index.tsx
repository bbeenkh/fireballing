import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  type PressableProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

interface IPopupProps {
  /** 팝업 표시 여부 */
  visible?: boolean;
  /** 팝업 제목 */
  title?: string;
  /** 팝업 본문 메시지 */
  message?: string;
  /** 팝업 내부 커스텀 콘텐츠 */
  children?: React.ReactNode;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 확인 버튼 라벨 (기본값: '확인') */
  confirmLabel?: string;
  /** 확인 콜백 */
  onConfirm?: () => void;
  /** 취소 버튼 라벨 (듀얼 버튼 모드, 설정 시 버튼 2개 표시) */
  cancelLabel?: string;
  /** 취소 콜백 */
  onCancel?: () => void;
  className?: string;
}

/**
 * # Popup
 * ---
 * - 간단설명: 모달 팝업/다이얼로그 컴포넌트
 * - 제약사항 및 특이사항:
 *   - cancelLabel 설정 시 듀얼 버튼 모드
 *   - children으로 이미지 등 커스텀 콘텐츠 삽입 가능
 *   - 배경 딤 터치 시 onClose 호출
 * ---
 * @param visible 팝업 표시 여부
 * @param title 팝업 제목
 * @param message 팝업 본문
 * @param confirmLabel 확인 버튼 라벨
 * @param onConfirm 확인 콜백
 * @param cancelLabel 취소 버튼 라벨
 * @param onCancel 취소 콜백
 * ---
 * @example
 * <Popup
 *   visible={showPopup}
 *   title="알림"
 *   message="선택하지 않은 답변이 있어요."
 *   confirmLabel="확인"
 *   onConfirm={() => setShowPopup(false)}
 * />
 */
export function Popup({
  visible = false,
  title,
  message,
  children,
  onClose,
  confirmLabel = '확인',
  onConfirm,
  cancelLabel,
  onCancel,
  className,
}: IPopupProps) {
  const isDual = cancelLabel != null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/40 items-center justify-center"
        onPress={onClose}
      >
        <Pressable
          className={twMerge(
            'bg-white rounded-xl w-[300px] p-gutter',
            className,
          )}
          onPress={e => e.stopPropagation()}
        >
          {title && (
            <Text className="text-subtitle font-bold text-[#1a1a1a] text-center mb-md">
              {title}
            </Text>
          )}
          {message && (
            <Text className="text-body-sm text-[#888888] text-center mb-gutter">
              {message}
            </Text>
          )}
          {children && (
            <View className="items-center mb-gutter">{children}</View>
          )}
          <View className={isDual ? 'flex-row gap-sm' : ''}>
            {isDual && (
              <Pressable
                className="flex-1 bg-[#f5f5f5] rounded-md h-[48px] items-center justify-center active:bg-[#e3e3e3]"
                onPress={onCancel ?? onClose}
              >
                <Text className="text-body-sm font-bold text-[#1a1a1a]">
                  {cancelLabel}
                </Text>
              </Pressable>
            )}
            <Pressable
              className={twMerge(
                'bg-[#8c39fb] rounded-md h-[48px] items-center justify-center active:bg-[#742bd5]',
                isDual ? 'flex-1' : 'w-full',
              )}
              onPress={onConfirm ?? onClose}
            >
              <Text className="text-body-sm font-bold text-white">
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default Popup;
