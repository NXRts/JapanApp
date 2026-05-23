'use client';

import styled from 'styled-components';
import { useDeviceMode } from '@/context/DeviceModeContext';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 3px;
  border-radius: 999px;
  position: relative;
  width: 86px;
  height: 36px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.05);
    box-shadow: 0 0 12px rgba(var(--primary-rgb), 0.1);
  }
`;

const Slider = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 38px;
  height: 28px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isMobile }) => ($isMobile ? 'translateX(40px)' : 'translateX(0)')};
`;

const Option = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : 'var(--text-secondary)')};
  transition: color 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.2;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export function DeviceModeSwitcher() {
  const { deviceMode, toggleDeviceMode, isMounted } = useDeviceMode();

  if (!isMounted) return null;

  const isMobile = deviceMode === 'mobile';

  return (
    <SwitcherContainer onClick={toggleDeviceMode} title={`Switch to ${isMobile ? 'PC' : 'Mobile'} Mode`}>
      <Slider $isMobile={isMobile} />
      <Option $isActive={!isMobile}>
        {/* PC Icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </Option>
      <Option $isActive={isMobile}>
        {/* Mobile Icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      </Option>
    </SwitcherContainer>
  );
}
