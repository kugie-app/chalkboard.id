'use client';
import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { IconClock, IconPlayerPause, IconEdit, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface DurationManagementProps {
  sessionId: number;
  currentDurationType: 'hourly' | 'per_minute';
  elapsedMinutes: number;
  onDurationTypeChange: (newType: 'hourly' | 'per_minute') => void;
  onDurationUpdate: (newDuration: number) => void;
  isUpdating?: boolean;
}

const DurationManagement: React.FC<DurationManagementProps> = ({
  sessionId,
  currentDurationType,
  elapsedMinutes,
  onDurationTypeChange,
  onDurationUpdate,
  isUpdating = false
}) => {
  const tCommon = useTranslations('Common');
  const [isEditing, setIsEditing] = useState(false);
  const [editDuration, setEditDuration] = useState(elapsedMinutes);

  const formatTime = (totalMinutes: number) => {
    if (currentDurationType === 'hourly') {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      return `${hours} ${tCommon('hours')} ${minutes} ${tCommon('minutes')}`;
    } else {
      const minutes = Math.floor(totalMinutes);
      const seconds = Math.round((totalMinutes - minutes) * 60);
      return `${minutes} ${tCommon('min')} ${seconds} ${tCommon('sec')}`;
    }
  };

  const handleDurationTypeToggle = () => {
    const newType = currentDurationType === 'hourly' ? 'per_minute' : 'hourly';
    onDurationTypeChange(newType);
  };

  return (
    <div className="bg-white dark:bg-darkgray border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconClock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-dark dark:text-white">
            {tCommon('durationManagement')}
          </span>
        </div>

        {/* Duration Type Toggle */}
        <Button
          size="xs"
          color={currentDurationType === 'hourly' ? 'primary' : 'secondary'}
          onClick={handleDurationTypeToggle}
          disabled={isUpdating}
        >
          {currentDurationType === 'hourly' ? tCommon('changeToPerMinute') : tCommon('changeToHourly')}
        </Button>
      </div>

      {/* Current Duration Display/Edit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-bodytext">{tCommon('currentDuration')}:</span>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={editDuration}
                onChange={(e) => setEditDuration(parseInt(e.target.value) || 0)}
                className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:border-primary"
                min="0"
              />
              <span className="text-sm text-bodytext">{tCommon('minutes')}</span>
            </div>
          ) : (
            <span className="font-medium text-dark dark:text-white">
              {formatTime(elapsedMinutes)}
            </span>
          )}
        </div>
      </div>

      {/* Billing Information */}
      <div className="text-xs text-bodytext pt-2 border-t">
        <div className="flex justify-between">
          <span>{tCommon('billingType')}:</span>
          <span className="font-medium">
            {currentDurationType === 'hourly' ? tCommon('hourlyRate') : tCommon('perMinuteRate')}
          </span>
        </div>
        {currentDurationType === 'hourly' && (
          <div className="flex justify-between mt-1">
            <span>{tCommon('billableHours')}:</span>
            <span className="font-medium">
              {Math.ceil(elapsedMinutes / 60)} {tCommon('hours')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DurationManagement;