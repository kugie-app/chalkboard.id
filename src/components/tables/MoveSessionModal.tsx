'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Label } from 'flowbite-react';
import { IconTransfer, IconLoader2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface Table {
  id: number;
  name: string;
  status: string;
  hourlyRate: string;
  perMinuteRate?: string;
}

interface MoveSessionModalProps {
  show: boolean;
  onClose: () => void;
  sessionId: number;
  currentTableId: number;
  currentTableName: string;
  customerName: string;
  onMoveSuccess: (newTableId: number, newTableName: string) => void;
}

const MoveSessionModal: React.FC<MoveSessionModalProps> = ({
  show,
  onClose,
  sessionId,
  currentTableId,
  currentTableName,
  customerName,
  onMoveSuccess
}) => {
  const tCommon = useTranslations('Common');
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      fetchAvailableTables();
    }
  }, [show]);

  const fetchAvailableTables = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/tables');
      if (response.ok) {
        const tables = await response.json();
        // Filter out current table and only show available tables
        const available = tables.filter((table: Table) => 
          table.id !== currentTableId && 
          table.status === 'available'
        );
        setAvailableTables(available);
      } else {
        setError(tCommon('failedToFetchAvailableTables'));
      }
    } catch (error) {
      setError(tCommon('errorFetchingTables'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveSession = async () => {
    if (!selectedTableId) return;
    
    setIsMoving(true);
    setError(null);

    try {
      const response = await fetch(`/api/table-sessions/${sessionId}/move-table`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTableId: selectedTableId }),
      });

      if (response.ok) {
        const data = await response.json();
        const selectedTable = availableTables.find(t => t.id === selectedTableId);
        onMoveSuccess(selectedTableId, selectedTable?.name || '');
        onClose();
      } else {
        const error = await response.json();
        setError(error.message || tCommon('failedToMoveSession'));
      }
    } catch (error) {
      setError(tCommon('errorMovingSession'));
    } finally {
      setIsMoving(false);
    }
  };

  const handleClose = () => {
    if (!isMoving) {
      setSelectedTableId(null);
      setError(null);
      onClose();
    }
  };

  const selectedTable = availableTables.find(t => t.id === selectedTableId);

  return (
    <Modal show={show} onClose={handleClose} size="md">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <IconTransfer className="w-5 h-5" />
          {tCommon('moveSessionToAnotherTable')}
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* Current Session Info */}
          <div className="bg-lightprimary p-3 rounded-lg">
            <h4 className="font-medium text-dark dark:text-white mb-2">{tCommon('currentSession')}</h4>
            <div className="text-sm space-y-1">
              <div><span className="text-bodytext">{tCommon('customer')}:</span> <span className="font-medium">{customerName}</span></div>
              <div><span className="text-bodytext">{tCommon('currentTable')}:</span> <span className="font-medium">{currentTableName}</span></div>
            </div>
          </div>

          {/* Target Table Selection */}
          <div>
            <Label htmlFor="targetTable" value={tCommon('selectTargetTable')} />
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <IconLoader2 className="w-5 h-5 animate-spin" />
                <span className="ml-2 text-sm">{tCommon('loadingAvailableTables')}</span>
              </div>
            ) : availableTables.length === 0 ? (
              <div className="text-center py-4 text-bodytext">
                {tCommon('noAvailableTablesFound')}
              </div>
            ) : (
              <Select
                id="targetTable"
                value={selectedTableId || ''}
                onChange={(e) => setSelectedTableId(parseInt(e.target.value) || null)}
                required
              >
                <option value="">{tCommon('selectATable')}</option>
                {availableTables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} - {table.perMinuteRate ? 
                      `${parseFloat(table.perMinuteRate).toFixed(4)}/min` : 
                      `${parseFloat(table.hourlyRate)}/hour`
                    }
                  </option>
                ))}
              </Select>
            )}
          </div>

          {/* Selected Table Preview */}
          {selectedTable && (
            <div className="bg-lightsuccess p-3 rounded-lg">
              <h4 className="font-medium text-dark dark:text-white mb-2">{tCommon('targetTable')}</h4>
              <div className="text-sm space-y-1">
                <div><span className="text-bodytext">{tCommon('table')}:</span> <span className="font-medium">{selectedTable.name}</span></div>
                <div><span className="text-bodytext">{tCommon('rate')}:</span> <span className="font-medium">
                  {selectedTable.perMinuteRate ? 
                    `${parseFloat(selectedTable.perMinuteRate).toFixed(4)}/minute` : 
                    `${parseFloat(selectedTable.hourlyRate)}/hour`
                  }
                </span></div>
                <div><span className="text-bodytext">{tCommon('status')}:</span> <span className="font-medium text-success">{tCommon('available')}</span></div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-lighterror p-3 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Warning */}
          <div className="bg-lightwarning p-3 rounded-lg">
            <p className="text-warning text-sm">
              <strong>{tCommon('warning')}:</strong> {tCommon('moveSessionWarning')}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          color="primary" 
          onClick={handleMoveSession}
          disabled={!selectedTableId || isMoving || isLoading}
        >
          {isMoving ? (
            <>
              <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
              {tCommon('movingSession')}
            </>
          ) : (
            <>
              <IconTransfer className="w-4 h-4 mr-2" />
              {tCommon('moveSession')}
            </>
          )}
        </Button>
        <Button 
          color="secondary" 
          onClick={handleClose}
          disabled={isMoving}
        >
          {tCommon('cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoveSessionModal;