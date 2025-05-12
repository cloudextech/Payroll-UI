import React, { useState } from 'react';
import { X, User, Phone, Users, Building, Wallet, ChevronRight, Save, Upload, FileText, Plus, Trash2, DollarSign } from 'lucide-react';

interface AddEmployeeDialogProps {
  onClose: () => void;
  onSave: (employeeData: any) => void;
}

interface FileUpload {
  file: File;
  preview?: string;
}

interface CustomField {
  id: string;
  name: string;
  value: string;
}

interface FamilyMember {
  name: string;
  age: string;
  relation: string;
  aadharNumber: string;
  insuranceNumber: string;
  phoneNumber: string;
  groupPhoto: FileUpload | null;
  aadharDoc: FileUpload | null;
  insuranceDoc: FileUpload | null;
}

export function AddEmployeeDialog({ onClose, onSave }: AddEmployeeDialogProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      employeeId: '',
      designation: '',
      department: '',
      dateOfJoining: '',
      dateOfBirth: '',
      age: '',
      nationality: '',
      religion: '',
      gender: '',
      maritalStatus: '',
      bloodGroup: '',
      insuranceNo: '',
      degree: '',
      institution: '',
      graduationYear: '',
      fatherName: '',
      photo: null as FileUpload | null,
      degreeDoc: null as FileUpload | null,
      insuranceDoc: null as FileUpload | null,
    },
    contact: {
      currentAddress: '',
      permanentAddress: '',
      mobileNumber: '',
      aadharLinkMobile: '',
      emailId: '',
      uanNumber: '',
      esiNumber: '',
      panCard: '',
      aadharNumber: '',
      esiDoc: null as FileUpload | null,
      panCardDoc: null as FileUpload | null,
      aadharDoc: null as FileUpload | null,
      emergencyContact1: {
        name: '',
        number: '',
        relation: ''
      },
      emergencyContact2: {
        name: '',
        number: '',
        relation: ''
      }
    },
    family: {
      members: [{
        name: '',
        age: '',
        relation: '',
        aadharNumber: '',
        insuranceNumber: '',
        phoneNumber: '',
        groupPhoto: null as FileUpload | null,
        aadharDoc: null as FileUpload | null,
        insuranceDoc: null as FileUpload | null,
      }]
    },
    account: {
      accountName: '',
      bankName: '',
      accountNumber: '',
      reenterAccountNumber: '',
      ifscCode: '',
      branchName: '',
      passbook: null as FileUpload | null,
    },
    salary: {
      basic: '',
      hra: '',
      others: '',
      conveyanceAllowance: '',
      attendanceAllowance: '',
      nightAllowance: '',
      specialAllowance: '',
      customFields: [] as CustomField[],
    }
  });

  const inputClasses = "w-full bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30";
  const labelClasses = "text-sm text-gray-500 dark:text-gray-400 block";
  const cardClasses = "glass-card rounded-xl p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50";
  const buttonClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-purple-500/20 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/30 dark:hover:bg-purple-500/30",
    danger: "hover:bg-red-500/10 text-red-500",
  };

  const handleInputChange = (tab: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (tab: string, field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [field]: {
            file,
            preview: e.target?.result as string
          }
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEmergencyContactChange = (contactNum: 1 | 2, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [`emergencyContact${contactNum}`]: {
          ...prev.contact[`emergencyContact${contactNum}`],
          [field]: value
        }
      }
    }));
  };

  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      family: {
        members: prev.family.members.map((member, i) => 
          i === index ? { ...member, [field]: value } : member
        )
      }
    }));
  };

  const handleFamilyMemberFileUpload = (index: number, field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        family: {
          members: prev.family.members.map((member, i) => 
            i === index ? {
              ...member,
              [field]: {
                file,
                preview: e.target?.result as string
              }
            } : member
          )
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddFamilyMember = () => {
    setFormData(prev => ({
      ...prev,
      family: {
        members: [...prev.family.members, {
          name: '',
          age: '',
          relation: '',
          aadharNumber: '',
          insuranceNumber: '',
          phoneNumber: '',
          groupPhoto: null,
          aadharDoc: null,
          insuranceDoc: null,
        }]
      }
    }));
  };

  const handleRemoveFamilyMember = (index: number) => {
    if (formData.family.members.length > 1) {
      setFormData(prev => ({
        ...prev,
        family: {
          members: prev.family.members.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const handleSalaryChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const handleAddCustomField = () => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        customFields: [
          ...prev.salary.customFields,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            value: ''
          }
        ]
      }
    }));
  };

  const handleCustomFieldChange = (id: string, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        customFields: prev.salary.customFields.map(f => 
          f.id === id ? { ...f, [field]: value } : f
        )
      }
    }));
  };

  const handleRemoveCustomField = (id: string) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        customFields: prev.salary.customFields.filter(f => f.id !== id)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const FileUploadField = ({ 
    tab, 
    field, 
    label, 
    accept = "image/*,application/pdf" 
  }: { 
    tab: string; 
    field: string; 
    label: string; 
    accept?: string;
  }) => {
    const file = formData[tab as keyof typeof formData][field];
    
    return (
      <div className="space-y-2">
        <label className={labelClasses}>{label}</label>
        <div 
          className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${file ? 'border-purple-500/50 bg-purple-500/5' : 'border-gray-700 hover:border-purple-500/30 hover:bg-purple-500/5'}`}
        >
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(tab, field, file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {file ? (
            <div className="flex items-center justify-center space-x-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400">{file.file.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Click or drag file to upload</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PhotoUploadField = ({ tab, field }: { tab: string; field: string }) => {
    const photo = formData[tab as keyof typeof formData][field];
    
    return (
      <div className="space-y-2">
        <label className={labelClasses}>Employee Photo</label>
        <div 
          className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${photo ? 'border-purple-500/50 bg-purple-500/5' : 'border-gray-700 hover:border-purple-500/30 hover:bg-purple-500/5'}`}
          style={{ height: '200px' }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(tab, field, file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {photo ? (
            <img 
              src={photo.preview} 
              alt="Employee" 
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Upload employee photo</span>
              <span className="text-xs text-gray-500 mt-1">Click or drag image here</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="h-4 w-4" /> },
    { id: 'contact', label: 'Contact Details', icon: <Phone className="h-4 w-4" /> },
    { id: 'family', label: 'Family Details', icon: <Users className="h-4 w-4" /> },
    { id: 'account', label: 'Account Details', icon: <Building className="h-4 w-4" /> },
    { id: 'salary', label: 'Salary Details', icon: <Wallet className="h-4 w-4" /> }
  ];

  const renderPersonalInfoTab = () => (
    <div className="space-y-6">
      <PhotoUploadField tab="personal" field="photo" />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>First Name*</label>
          <input
            type="text"
            value={formData.personal.firstName}
            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Last Name*</label>
          <input
            type="text"
            value={formData.personal.lastName}
            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Employee ID*</label>
          <input
            type="text"
            value={formData.personal.employeeId}
            onChange={(e) => handleInputChange('personal', 'employeeId', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Designation*</label>
          <input
            type="text"
            value={formData.personal.designation}
            onChange={(e) => handleInputChange('personal', 'designation', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Department*</label>
          <input
            type="text"
            value={formData.personal.department}
            onChange={(e) => handleInputChange('personal', 'department', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Date of Joining*</label>
          <input
            type="date"
            value={formData.personal.dateOfJoining}
            onChange={(e) => handleInputChange('personal', 'dateOfJoining', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Date of Birth*</label>
          <input
            type="date"
            value={formData.personal.dateOfBirth}
            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Age*</label>
          <input
            type="number"
            value={formData.personal.age}
            onChange={(e) => handleInputChange('personal', 'age', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Nationality*</label>
          <input
            type="text"
            value={formData.personal.nationality}
            onChange={(e) => handleInputChange('personal', 'nationality', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Religion</label>
          <input
            type="text"
            value={formData.personal.religion}
            onChange={(e) => handleInputChange('personal', 'religion', e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Gender*</label>
          <select
            value={formData.personal.gender}
            onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
            className={inputClasses}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Marital Status*</label>
          <select
            value={formData.personal.maritalStatus}
            onChange={(e) => handleInputChange('personal', 'maritalStatus', e.target.value)}
            className={inputClasses}
            required
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Blood Group*</label>
          <select
            value={formData.personal.bloodGroup}
            onChange={(e) => handleInputChange('personal', 'bloodGroup', e.target.value)}
            className={inputClasses}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Insurance Number</label>
          <input
            type="text"
            value={formData.personal.insuranceNo}
            onChange={(e) => handleInputChange('personal', 'insuranceNo', e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Father's Name*</label>
          <input
            type="text"
            value={formData.personal.fatherName}
            onChange={(e) => handleInputChange('personal', 'fatherName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Degree*</label>
          <input
            type="text"
            value={formData.personal.degree}
            onChange={(e) => handleInputChange('personal', 'degree', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Institution*</label>
          <input
            type="text"
            value={formData.personal.institution}
            onChange={(e) => handleInputChange('personal', 'institution', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Graduation Year*</label>
          <input
            type="text"
            value={formData.personal.graduationYear}
            onChange={(e) => handleInputChange('personal', 'graduationYear', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        
        <div className="col-span-2">
          <FileUploadField 
            tab="personal" 
            field="degreeDoc" 
            label="Upload Degree Certificate" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="col-span-2">
          <FileUploadField 
            tab="personal" 
            field="insuranceDoc" 
            label="Upload Insurance Document" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    </div>
  );

  const renderContactDetailsTab = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className={labelClasses}>Current Address*</label>
        <textarea
          value={formData.contact.currentAddress}
          onChange={(e) => handleInputChange('contact', 'currentAddress', e.target.value)}
          className={`${inputClasses} h-24`}
          required
        />
      </div>
      <div className="space-y-2">
        <label className={labelClasses}>Permanent Address*</label>
        <textarea
          value={formData.contact.permanentAddress}
          onChange={(e) => handleInputChange('contact', 'permanentAddress', e.target.value)}
          className={`${inputClasses} h-24`}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>Mobile Number*</label>
          <input
            type="tel"
            value={formData.contact.mobileNumber}
            onChange={(e) => handleInputChange('contact', 'mobileNumber', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Aadhar Link Mobile*</label>
          <input
            type="tel"
            value={formData.contact.aadharLinkMobile}
            onChange={(e) => handleInputChange('contact', 'aadharLinkMobile', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Email ID*</label>
          <input
            type="email"
            value={formData.contact.emailId}
            onChange={(e) => handleInputChange('contact', 'emailId', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>UAN Number</label>
          <input
            type="text"
            value={formData.contact.uanNumber}
            onChange={(e) => handleInputChange('contact', 'uanNumber', e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>ESI Number</label>
          <input
            type="text"
            value={formData.contact.esiNumber}
            onChange={(e) => handleInputChange('contact', 'esiNumber', e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>PAN Card*</label>
          <input
            type="text"
            value={formData.contact.panCard}
            onChange={(e) => handleInputChange('contact', 'panCard', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Aadhar Number*</label>
          <input
            type="text"
            value={formData.contact.aadharNumber}
            onChange={(e) => handleInputChange('contact', 'aadharNumber', e.target.value)}
            className={inputClasses}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium">Emergency Contact 1</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClasses}>Name*</label>
            <input
              type="text"
              value={formData.contact.emergencyContact1.name}
              onChange={(e) => handleEmergencyContactChange(1, 'name', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Number*</label>
            <input
              type="tel"
              value={formData.contact.emergencyContact1.number}
              onChange={(e) => handleEmergencyContactChange(1, 'number', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Relation*</label>
            <input
              type="text"
              value={formData.contact.emergencyContact1.relation}
              onChange={(e) => handleEmergencyContactChange(1, 'relation', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium">Emergency Contact 2</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClasses}>Name*</label>
            <input
              type="text"
              value={formData.contact.emergencyContact2.name}
              onChange={(e) => handleEmergencyContactChange(2, 'name', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Number*</label>
            <input
              type="tel"
              value={formData.contact.emergencyContact2.number}
              onChange={(e) => handleEmergencyContactChange(2, 'number', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Relation*</label>
            <input
              type="text"
              value={formData.contact.emergencyContact2.relation}
              onChange={(e) => handleEmergencyContactChange(2, 'relation', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-gray-900 dark:text-white font-medium">Documents</h4>
        <div className="grid grid-cols-1 gap-6">
          <FileUploadField 
            tab="contact" 
            field="esiDoc" 
            label="Upload ESI Document" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
          
          <FileUploadField 
            tab="contact" 
            field="panCardDoc" 
            label="Upload PAN Card" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
          
          <FileUploadField 
            tab="contact" 
            field="aadharDoc" 
            label="Upload Aadhar Card" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    </div>
  );

  const renderFamilyDetailsTab = () => (
    <div className="space-y-6">
      {formData.family.members.map((member, index) => (
        <div key={index} className={`${cardClasses} relative`}>
          <div className="absolute top-4 right-4">
            {formData.family.members.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFamilyMember(index)}
                className={`p-2 ${buttonClasses.danger} rounded-lg transition-colors`}
                title="Remove Member"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Family Member {index + 1}
          </h4>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClasses}>Name*</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Age*</label>
              <input
                type="number"
                value={member.age}
                onChange={(e) => handleFamilyMemberChange(index, 'age', e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Relation*</label>
              <input
                type="text"
                value={member.relation}
                onChange={(e) => handleFamilyMemberChange(index, 'relation', e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Aadhar Number*</label>
              <input
                type="text"
                value={member.aadharNumber}
                onChange={(e) => handleFamilyMemberChange(index, 'aadharNumber', e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Insurance Number</label>
              <input
                type="text"
                value={member.insuranceNumber}
                onChange={(e) => handleFamilyMemberChange(index, 'insuranceNumber', e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Phone Number*</label>
              <input
                type="tel"
                value={member.phoneNumber}
                onChange={(e) => handleFamilyMemberChange(index, 'phoneNumber', e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div className="col-span-2 space-y-6">
              <FileUploadField 
                tab="family"
                field={`members.${index}.groupPhoto`}
                label="Upload Group Photo"
                accept="image/*"
              />

              <FileUploadField 
                tab="family"
                field={`members.${index}.aadharDoc`}
                label="Upload Aadhar Document"
                accept=".pdf,.jpg,.jpeg,.png"
              />

              <FileUploadField 
                tab="family"
                field={`members.${index}.insuranceDoc`}
                label="Upload Insurance Document"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddFamilyMember}
        className={`w-full flex items-center justify-center space-x-2 ${buttonClasses.secondary} px-4 py-3 rounded-xl transition-colors`}
      >
        <Plus className="h-5 w-5" />
        <span>Add Another Family Member</span>
      </button>
    </div>
  );

  const renderAccountDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClasses}>Account Holder Name*</label>
          <input
            type="text"
            value={formData.account.accountName}
            onChange={(e) => handleInputChange('account', 'accountName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Bank Name*</label>
          <input
            type="text"
            value={formData.account.bankName}
            onChange={(e) => handleInputChange('account', 'bankName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Account Number*</label>
          <input
            type="text"
            value={formData.account.accountNumber}
            onChange={(e) => handleInputChange('account', 'accountNumber', e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Re-enter Account Number*</label>
          <input
            type="text"
            value={formData.account.reenterAccountNumber}
            onChange={(e) => handleInputChange('account', 'reenterAccountNumber', e.target.value)}
            className={`${inputClasses} ${
              formData.account.accountNumber && 
              formData.account.reenterAccountNumber &&
              formData.account.accountNumber !== formData.account.reenterAccountNumber
                ? 'border-red-500'
                : ''
            }`}
            required
          />
          {formData.account.accountNumber && 
           formData.account.reenterAccountNumber &&
           formData.account.accountNumber !== formData.account.reenterAccountNumber && (
            <p className="text-xs text-red-500 mt-1">Account numbers do not match</p>
          )}
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>IFSC Code*</label>
          <input
            type="text"
            value={formData.account.ifscCode}
            onChange={(e) => handleInputChange('account', 'ifscCode', e.target.value.toUpperCase())}
            className={inputClasses}
            required
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            title="Please enter a valid IFSC code (e.g., SBIN0123456)"
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Branch Name*</label>
          <input
            type="text"
            value={formData.account.branchName}
            onChange={(e) => handleInputChange('account', 'branchName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="col-span-2">
          <FileUploadField 
            tab="account" 
            field="passbook" 
            label="Upload Bank Passbook" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    </div>
  );

  const renderSalaryDetailsTab = () => (
    <div className="space-y-6">
      <div className={cardClasses}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <DollarSign className="h-5 w-5 text-purple-400 mr-2" />
          Salary Components
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClasses}>Basic*</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.basic}
                onChange={(e) => handleSalaryChange('basic', e.target.value)}
                className={`${inputClasses} pl-8`}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>HRA</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.hra}
                onChange={(e) => handleSalaryChange('hra', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Others</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.others}
                onChange={(e) => handleSalaryChange('others', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Conveyance Allowance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.conveyanceAllowance}
                onChange={(e) => handleSalaryChange('conveyanceAllowance', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Attendance Allowance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.attendanceAllowance}
                onChange={(e) => handleSalaryChange('attendanceAllowance', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Night Allowance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.nightAllowance}
                onChange={(e) => handleSalaryChange('nightAllowance', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Special Allowance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={formData.salary.specialAllowance}
                onChange={(e) => handleSalaryChange('specialAllowance', e.target.value)}
                className={`${inputClasses} pl-8`}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Custom Fields</h3>
          <button
            type="button"
            onClick={handleAddCustomField}
            className={`flex items-center space-x-2 ${buttonClasses.secondary} px-3 py-1.5 rounded-lg transition-colors`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Field</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.salary.customFields.map((field) => (
            <div key={field.id} className="flex items-start space-x-4">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => handleCustomFieldChange(field.id, 'name', e.target.value)}
                  placeholder="Field Name"
                  className={inputClasses}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(field.id, 'value', e.target.value)}
                    placeholder="Amount"
                    className={`${inputClasses} pl-8`}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCustomField(field.id)}
                className={`p-2 ${buttonClasses.danger} rounded-lg transition-colors`}
                title="Remove Field"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfoTab();
      case 'contact':
        return renderContactDetailsTab();
      case 'family':
        return renderFamilyDetailsTab();
      case 'account':
        return renderAccountDetailsTab();
      case 'salary':
        return renderSalaryDetailsTab();
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-[1000px] max-h-[90vh] shadow-2xl relative flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Employee</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200/50 dark:border-gray-700/50 mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Save Employee</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50 dark:bg-gray-900">
            {renderTabContent()}
          </div>
        </form>
      </div>
    </div>
  );
}