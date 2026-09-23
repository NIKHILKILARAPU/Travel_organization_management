import React, { useState } from 'react';
import { useManagement } from '../../context/ManagementContext';
import { X, User, ShieldCheck, FileCheck, Check, UploadCloud } from 'lucide-react';
import type { DriverStatus } from '../../types';

export const AddEditDriverModal: React.FC = () => {
  const { isAddDriverOpen, setIsAddDriverOpen, addDriver } = useManagement();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('1990-05-15');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('2028-12-31');
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<DriverStatus>('Available');

  // Simulated doc upload statuses
  const [uploadedDocs, setUploadedDocs] = useState({
    license: false,
    idProof: false,
    addressProof: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAddDriverOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!phone.trim() || phone.length < 10) errs.phone = 'Valid phone number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!licenseNumber.trim()) errs.licenseNumber = 'Driving License is required';
    if (!address.trim()) errs.address = 'Residential address is required';
    if (!emergencyContact.trim()) errs.emergencyContact = 'Emergency contact is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addDriver({
      name: fullName.trim(),
      phone: phone.startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      email: email.trim(),
      dob,
      address: address.trim(),
      emergencyContact: emergencyContact.trim(),
      licenseNumber: licenseNumber.trim().toUpperCase(),
      licenseExpiry,
      joiningDate,
      status,
      rating: 5.0,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      documents: {
        drivingLicense: { name: 'Driving License', verified: uploadedDocs.license, expiryDate: licenseExpiry },
        idProof: { name: 'Aadhaar Card', verified: uploadedDocs.idProof },
        addressProof: { name: 'Electricity Bill', verified: uploadedDocs.addressProof }
      },
      reportedIssues: []
    });

    setIsAddDriverOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="saas-card max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden my-6 shadow-modal">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Onboard Chauffeur Partner</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Register driver credentials, contact info, and statutory KYC documents</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddDriverOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 bg-white dark:bg-slate-900">
          
          {/* Personal Info */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3.5">
            <h3 className="text-[11px] font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`input-saas ${errors.fullName ? 'border-rose-500' : ''}`}
                />
                {errors.fullName && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 98480 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`input-saas ${errors.phone ? 'border-rose-500' : ''}`}
                />
                {errors.phone && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.phone}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-saas ${errors.email ? 'border-rose-500' : ''}`}
                />
                {errors.email && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Residential Address *</label>
                <input
                  type="text"
                  placeholder="e.g. Flat 302, Undi Road, Bhimavaram"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`input-saas ${errors.address ? 'border-rose-500' : ''}`}
                />
                {errors.address && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.address}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Emergency Contact *</label>
                <input
                  type="text"
                  placeholder="e.g. +91 94401 99881"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className={`input-saas ${errors.emergencyContact ? 'border-rose-500' : ''}`}
                />
                {errors.emergencyContact && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.emergencyContact}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Initial Dispatch Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DriverStatus)}
                  className="input-saas"
                >
                  <option value="Available">Available</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Break">Break</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* License & Credentials */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3.5">
            <h3 className="text-[11px] font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Driving Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">License Number *</label>
                <input
                  type="text"
                  placeholder="e.g. AP39 201800123"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className={`input-saas uppercase font-mono ${errors.licenseNumber ? 'border-rose-500' : ''}`}
                />
                {errors.licenseNumber && <p className="text-rose-500 text-[11px] mt-1 font-medium">{errors.licenseNumber}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">License Expiry Date *</label>
                <input
                  type="date"
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                  className="input-saas"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 text-xs mb-1.5">Organization Joining Date</label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="input-saas"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3.5">
            <h3 className="text-[11px] font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Mandatory KYC Documents</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                onClick={() => setUploadedDocs(prev => ({ ...prev, license: !prev.license }))}
                className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
                  uploadedDocs.license 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' 
                    : 'border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-900'
                }`}
              >
                <UploadCloud className={`w-5 h-5 mx-auto mb-1.5 ${uploadedDocs.license ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Driving License</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {uploadedDocs.license ? '✓ Attached' : 'Click to attach'}
                </span>
              </div>

              <div 
                onClick={() => setUploadedDocs(prev => ({ ...prev, idProof: !prev.idProof }))}
                className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
                  uploadedDocs.idProof 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' 
                    : 'border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-900'
                }`}
              >
                <UploadCloud className={`w-5 h-5 mx-auto mb-1.5 ${uploadedDocs.idProof ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Aadhaar Card</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {uploadedDocs.idProof ? '✓ Attached' : 'Click to attach'}
                </span>
              </div>

              <div 
                onClick={() => setUploadedDocs(prev => ({ ...prev, addressProof: !prev.addressProof }))}
                className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
                  uploadedDocs.addressProof 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' 
                    : 'border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-900'
                }`}
              >
                <UploadCloud className={`w-5 h-5 mx-auto mb-1.5 ${uploadedDocs.addressProof ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">Address Proof</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {uploadedDocs.addressProof ? '✓ Attached' : 'Click to attach'}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddDriverOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check className="w-4 h-4" />
              <span>Save Driver</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
