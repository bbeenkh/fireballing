import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from './index';

/**
 * 웹 스토리북용 바텀시트 비주얼 데모
 * 실제 @gorhom/bottom-sheet는 네이티브 전용이므로, 웹에서는 shim으로 시각적 구조만 확인
 */
const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#faf8f5',
          position: 'relative',
        }}
      >
        <div style={{ padding: 20 }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              backgroundColor: '#ff5a26',
              color: '#0d0b0a',
              border: 'none',
              borderRadius: 12,
              padding: '16px 24px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              width: '100%',
              maxWidth: 390,
            }}
          >
            바텀시트 열기
          </button>
        </div>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          snapPoints={['40%']}
          title="새 그룹"
        >
          <BottomSheet.Action label="저장" />
        </BottomSheet>
      </div>
    );
  },
};

export const WithContent: Story = {
  render: function Render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#faf8f5',
          position: 'relative',
        }}
      >
        <BottomSheet open snapPoints={['50%']} title="포트폴리오 추가">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e7ded6',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <span
                style={{ fontSize: 13, color: '#9e928e', display: 'block', marginBottom: 8 }}
              >
                그룹명 (필수, 20자)
              </span>
              <span style={{ fontSize: 15, color: '#0d0b0a' }}>
                내 은퇴 연금 포트
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
              }}
            >
              {['일반', 'ISA', '연금'].map((type, i) => (
                <div
                  key={type}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '12px 16px',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    ...(i === 2
                      ? {
                          backgroundColor: 'rgba(255,90,38,0.1)',
                          border: '1px solid #ff5a26',
                          color: '#ff5a26',
                        }
                      : {
                          backgroundColor: 'white',
                          border: '1px solid #e7ded6',
                          color: '#9e928e',
                        }),
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
          <BottomSheet.Action label="저장" />
        </BottomSheet>
      </div>
    );
  },
};

export const Closed: Story = {
  render: function Render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#faf8f5',
          padding: 20,
        }}
      >
        <span style={{ color: '#9e928e', fontSize: 14 }}>
          바텀시트가 닫혀있는 상태 (open=false)
        </span>
        <BottomSheet open={false} snapPoints={['30%']} title="설정">
          <span>이 내용은 보이지 않습니다.</span>
        </BottomSheet>
      </div>
    );
  },
};
