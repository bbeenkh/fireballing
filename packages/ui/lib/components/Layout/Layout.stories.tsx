import { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import Layout from '.';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {
    maxWidth: { control: 'text' },
    minWidth: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: { maxWidth: '390px' },
  render: args => (
    <Layout {...args}>
      <Layout.Header>
        <Text className="text-subtitle font-medium tracking-[-1px] text-[#0d0b0a]">
          fireballing
        </Text>
      </Layout.Header>
      <Layout.Body>
        <View>
          <Text className="text-label-md font-medium text-[#9e928e]">
            이번 달 받을 세후 분배금
          </Text>
          <Text className="text-h1 font-extrabold tracking-[-0.8px] text-[#0d0b0a] pt-xs">
            1,240,500
          </Text>
        </View>
        <View className="border border-[#261e1c] rounded-md p-lg">
          <View className="flex-row justify-between">
            <View className="gap-xs">
              <Text className="text-label-sm font-medium text-[#9e928e]">
                내 평단가 기준 분배수익률
              </Text>
              <Text className="text-h3 font-bold text-[#ff5a26]">12.4%</Text>
            </View>
            <View className="gap-xs items-end">
              <Text className="text-label-sm font-medium text-[#9e928e]">
                연간 예상 총액
              </Text>
              <Text className="text-subtitle font-bold text-[#0d0b0a]">
                14,886,000원
              </Text>
            </View>
          </View>
        </View>
      </Layout.Body>
      <Layout.Footer>
        <Text className="text-label-sm font-medium text-[#ff5a26]">홈</Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          포트폴리오
        </Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          시뮬레이터
        </Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          마이페이지
        </Text>
      </Layout.Footer>
    </Layout>
  ),
};

export const HeaderOnly: Story = {
  args: { maxWidth: '390px' },
  render: args => (
    <Layout {...args}>
      <Layout.Header>
        <Text className="text-subtitle font-medium text-[#0d0b0a]">
          fireballing
        </Text>
      </Layout.Header>
      <Layout.Body>
        <Text className="text-body text-[#0d0b0a]">
          헤더와 본문만 있는 레이아웃
        </Text>
      </Layout.Body>
    </Layout>
  ),
};

export const FullPage: Story = {
  args: { maxWidth: '390px' },
  render: args => (
    <Layout {...args}>
      <Layout.Header>
        <Text className="text-subtitle font-medium tracking-[-1px] text-[#0d0b0a]">
          fireballing
        </Text>
      </Layout.Header>
      <Layout.Body>
        <View>
          <Text className="text-label-md font-medium text-[#9e928e]">
            이번 달 받을 세후 분배금
          </Text>
          <Text className="text-h1 font-extrabold tracking-[-0.8px] text-[#0d0b0a] pt-xs">
            1,240,500
          </Text>
        </View>
        <View className="border border-[#261e1c] rounded-md p-lg">
          <View className="flex-row justify-between">
            <View className="gap-xs">
              <Text className="text-label-sm font-medium text-[#9e928e]">
                내 평단가 기준 분배수익률
              </Text>
              <Text className="text-h3 font-bold text-[#ff5a26]">12.4%</Text>
            </View>
            <View className="gap-xs items-end">
              <Text className="text-label-sm font-medium text-[#9e928e]">
                연간 예상 총액
              </Text>
              <Text className="text-subtitle font-bold text-[#0d0b0a]">
                14,886,000원
              </Text>
            </View>
          </View>
        </View>
        <View className="border border-[#261e1c] rounded-md p-lg gap-md">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-label-sm font-medium text-[#9e928e]">
                총 자산
              </Text>
              <Text className="text-h3 font-semibold text-[#0d0b0a]">
                158,420,000원
              </Text>
            </View>
            <View className="bg-[rgba(255,90,38,0.1)] px-sm py-xs rounded">
              <Text className="text-label-sm font-bold text-[#ff5a26]">
                +1.8%
              </Text>
            </View>
          </View>
          <View className="border-t border-[#261e1c] pt-md flex-row justify-between">
            <Text className="text-label-sm font-medium text-[#9e928e]">
              평가 손익
            </Text>
            <Text className="text-subtitle font-bold text-[#ff5a26]">
              +2,450,000원
            </Text>
          </View>
        </View>
        <View className="items-center opacity-80 pt-md">
          <Text className="text-label-sm font-medium text-[#9e928e] text-center">
            추정치이며 투자·세무 자문이 아닙니다.{'\n'}데이터 지연이 발생할 수
            있습니다.
          </Text>
        </View>
      </Layout.Body>
      <Layout.Footer>
        <Text className="text-label-sm font-medium text-[#ff5a26]">홈</Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          포트폴리오
        </Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          시뮬레이터
        </Text>
        <Text className="text-label-sm font-medium text-[#9e928e]">
          마이페이지
        </Text>
      </Layout.Footer>
    </Layout>
  ),
};
