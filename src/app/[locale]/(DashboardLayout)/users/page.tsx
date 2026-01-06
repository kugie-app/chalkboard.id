"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Button,
  Table,
  Modal,
  TextInput,
  Label,
  Select,
  Alert,
  Badge,
  Dropdown,
  Card
} from 'flowbite-react';
import { HiOutlineDotsVertical, HiPlus, HiPencil, HiTrash, HiCheck, HiX } from 'react-icons/hi';
import CardBox from '@/components/shared/CardBox';
import { Staff } from '@/schema/fnb';

const UsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const tUsers = useTranslations('Users');
  const tCommon = useTranslations('Common');
  const tAlerts = useTranslations('Alerts');
  
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [filterActive, setFilterActive] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    role: 'staff'
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch staff members
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const activeParam = filterActive === 'active' ? '?active=true' : '';
      const response = await fetch(`/api/staff${activeParam}`);
      
      if (response.ok) {
        const staffData = await response.json();
        setStaff(staffData);
      } else {
        showAlert('error', tAlerts('failedToLoadData'));
      }
    } catch (error) {
      console.error('Failed to fetch staff:', error);
      showAlert('error', tAlerts('failedToLoadData'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStaff();
    }
  }, [session, filterActive]);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleAddStaff = async () => {
    if (!formData.name || !formData.role) {
      showAlert('error', tAlerts('pleaseSelectStaffMember'));
      return;
    }

    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showAlert('success', tAlerts('categoryCreatedSuccess'));
        setShowAddModal(false);
        setFormData({ name: '', role: 'staff' });
        fetchStaff();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToSaveCategory'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToSaveCategory'));
    }
  };

  const handleEditStaff = async () => {
    if (!selectedStaff || !formData.name || !formData.role) {
      showAlert('error', tAlerts('pleaseSelectStaffMember'));
      return;
    }

    try {
      const response = await fetch('/api/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedStaff.id,
          name: formData.name,
          role: formData.role,
          isActive: selectedStaff.isActive
        }),
      });

      if (response.ok) {
        showAlert('success', tAlerts('categoryUpdatedSuccess'));
        setShowEditModal(false);
        setSelectedStaff(null);
        setFormData({ name: '', role: 'staff' });
        fetchStaff();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToSaveCategory'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToSaveCategory'));
    }
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;

    try {
      const response = await fetch(`/api/staff?id=${selectedStaff.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showAlert('success', tAlerts('categoryDeletedSuccess'));
        setShowDeleteModal(false);
        setSelectedStaff(null);
        fetchStaff();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToDeleteCategory'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToDeleteCategory'));
    }
  };

  const handleToggleActive = async (staffMember: Staff) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: staffMember.id,
          name: staffMember.name,
          role: staffMember.role,
          isActive: !staffMember.isActive
        }),
      });

      if (response.ok) {
        const action = !staffMember.isActive ? 'activated' : 'deactivated';
        showAlert('success', tAlerts('categoryUpdatedSuccess'));
        fetchStaff();
      } else {
        const error = await response.json();
        showAlert('error', error.message || tAlerts('failedToSaveCategory'));
      }
    } catch (error) {
      showAlert('error', tAlerts('failedToSaveCategory'));
    }
  };

  const openEditModal = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name,
      role: staffMember.role
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowDeleteModal(true);
  };

  const filteredStaff = staff.filter(member => {
    if (filterActive === 'active') return member.isActive;
    if (filterActive === 'inactive') return !member.isActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {alert && (
        <Alert color={alert.type === 'success' ? 'success' : 'failure'} className="mb-4">
          {alert.message}
        </Alert>
      )}

      <CardBox>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {tUsers('title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {tUsers('subtitle')}
            </p>
          </div>
          <Button 
            color="primary" 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2"
          >
            <HiPlus className="h-4 w-4" />
            {tUsers('addStaffMember')}
          </Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="w-48"
            >
              <option value="all">{tUsers('filters.allStaff')}</option>
              <option value="active">{tUsers('filters.activeOnly')}</option>
              <option value="inactive">{tUsers('filters.inactiveOnly')}</option>
            </Select>
          </div>
          <div className="text-sm text-gray-500">
            {tUsers('messages.totalStaffMembers', { count: filteredStaff.length })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>{tUsers('table.name')}</Table.HeadCell>
              <Table.HeadCell>{tUsers('table.role')}</Table.HeadCell>
              <Table.HeadCell>{tUsers('table.status')}</Table.HeadCell>
              <Table.HeadCell>{tUsers('table.created')}</Table.HeadCell>
              <Table.HeadCell>{tUsers('table.actions')}</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredStaff.map((member) => (
                <Table.Row key={member.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </Table.Cell>
                  <Table.Cell className="capitalize">
                    {member.role}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={member.isActive ? 'success' : 'failure'}
                      className="inline-flex"
                    >
                      {member.isActive ? tUsers('status.active') : tUsers('status.inactive')}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(member.createdAt!).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <Button color="light" size="sm" className="p-2">
                          <HiOutlineDotsVertical className="h-4 w-4" />
                        </Button>
                      )}
                    >
                      <Dropdown.Item onClick={() => openEditModal(member)}>
                        <HiPencil className="h-4 w-4 mr-2" />
                        {tUsers('actions.edit')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleToggleActive(member)}>
                        {member.isActive ? (
                          <>
                            <HiX className="h-4 w-4 mr-2" />
                            {tUsers('actions.deactivate')}
                          </>
                        ) : (
                          <>
                            <HiCheck className="h-4 w-4 mr-2" />
                            {tUsers('actions.activate')}
                          </>
                        )}
                      </Dropdown.Item>
                      {member.isActive && (
                        <Dropdown.Item onClick={() => openDeleteModal(member)} className="text-red-600">
                          <HiTrash className="h-4 w-4 mr-2" />
                          {tUsers('actions.delete')}
                        </Dropdown.Item>
                      )}
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
              {filteredStaff.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-8 text-gray-500">
                    {tUsers('messages.noStaffMembersFound')}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </CardBox>

      {/* Add Staff Modal */}
      <Modal show={showAddModal} onClose={() => {
        setShowAddModal(false);
        setFormData({ name: '', role: 'staff' });
      }}>
        <Modal.Header>{tUsers('addNewStaffMember')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value={tUsers('form.fullName')} className="mb-2 block" />
              <TextInput
                id="name"
                placeholder={tUsers('form.enterFullName')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div>
              <Label htmlFor="role" value={tUsers('form.role')} className="mb-2 block" />
              <Select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-control"
                required
              >
                <option value="staff">{tUsers('roles.staff')}</option>
                <option value="manager">{tUsers('roles.manager')}</option>
                <option value="admin">{tUsers('roles.admin')}</option>
                <option value="cashier">{tUsers('roles.cashier')}</option>
                <option value="waiter">{tUsers('roles.waiter')}</option>
                <option value="chef">{tUsers('roles.chef')}</option>
                <option value="supervisor">{tUsers('roles.supervisor')}</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleAddStaff}>
            {tUsers('addStaffMember')}
          </Button>
          <Button 
            color="gray" 
            onClick={() => {
              setShowAddModal(false);
              setFormData({ name: '', role: 'staff' });
            }}
          >
            {tUsers('form.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal show={showEditModal} onClose={() => {
        setShowEditModal(false);
        setSelectedStaff(null);
        setFormData({ name: '', role: 'staff' });
      }}>
        <Modal.Header>{tUsers('editStaffMember')}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name" value={tUsers('form.fullName')} className="mb-2 block" />
              <TextInput
                id="edit-name"
                placeholder={tUsers('form.enterFullName')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-role" value={tUsers('form.role')} className="mb-2 block" />
              <Select
                id="edit-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="form-control"
                required
              >
                <option value="staff">{tUsers('roles.staff')}</option>
                <option value="manager">{tUsers('roles.manager')}</option>
                <option value="admin">{tUsers('roles.admin')}</option>
                <option value="cashier">{tUsers('roles.cashier')}</option>
                <option value="waiter">{tUsers('roles.waiter')}</option>
                <option value="chef">{tUsers('roles.chef')}</option>
                <option value="supervisor">{tUsers('roles.supervisor')}</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleEditStaff}>
            {tUsers('updateStaffMember')}
          </Button>
          <Button 
            color="gray" 
            onClick={() => {
              setShowEditModal(false);
              setSelectedStaff(null);
              setFormData({ name: '', role: 'staff' });
            }}
          >
            {tUsers('form.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} size="md" onClose={() => {
        setShowDeleteModal(false);
        setSelectedStaff(null);
      }}>
        <Modal.Header>{tUsers('confirmDeactivation')}</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiTrash className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {tUsers('messages.deactivateConfirmation', { name: selectedStaff?.name || '' })}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {tUsers('messages.deactivateDescription')}
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteStaff}>
                {tUsers('messages.yesDeactivate')}
              </Button>
              <Button 
                color="gray" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedStaff(null);
                }}
              >
                {tUsers('form.cancel')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsersPage; 