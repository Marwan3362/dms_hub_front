import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole, PartnerTier } from '../types';

const defaultUsers: Record<UserRole, UserProfile> = {
  developer: {
    id: 'usr_dev_01',
    name: 'Eng. Tarek Abdulrahman',
    nameAr: 'م. طارق عبد الرحمن',
    email: 'tarek.abdulrahman@devnet.eg',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    role: 'developer',
    company: 'Nile Industrial Automation',
    companyAr: 'النيل للأتمتة الصناعية',
    tier: 'Silver',
    points: 1850,
    certifications: [
      'Certified Report Developer',
      'Certified Integration Specialist'
    ],
    skills: ['REST APIs', 'OPC-UA', 'FastReports', 'PostgreSQL', 'Python', 'C#'],
    joinedDate: '2024-03-15'
  },
  partner: {
    id: 'usr_partner_02',
    name: 'Dr. Mona El-Shazly',
    nameAr: 'د. منى الشاذلي',
    email: 'mona.elshazly@delta-solutions.com',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    role: 'partner',
    company: 'Delta Medical Systems SAE',
    companyAr: 'دلتا للنظم الطبية ش.م.م',
    tier: 'Gold',
    points: 4320,
    certifications: [
      'Certified Solution Partner',
      'Certified Integration Specialist',
      'AI & Advanced Analytics Specialist'
    ],
    skills: ['HL7 / FHIR R4', 'DICOM Service', 'Hospital ERP', 'Enterprise BI', 'React'],
    joinedDate: '2023-08-10'
  },
  customer_it: {
    id: 'usr_cust_03',
    name: 'Eng. Karim El-Sayed',
    nameAr: 'م. كريم السيد',
    email: 'k.elsayed@alex-steel-group.com',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    role: 'customer_it',
    company: 'Alexandria Heavy Steel Mills',
    companyAr: 'مصانع الإسكندرية للصلب الثقيل',
    tier: 'Bronze',
    points: 920,
    certifications: ['Certified Report Developer'],
    skills: ['Industrial ERP', 'OEE Telemetry', 'SQL Server Views', 'Production Lines'],
    joinedDate: '2025-01-20'
  },
  admin: {
    id: 'usr_admin_00',
    name: 'Eng. Ahmed Farouk (DMS Core)',
    nameAr: 'م. أحمد فاروق (فريق DMS الرئيسي)',
    email: 'ahmed.farouk@dms-sae.com',
    avatar: '/src/assets/images/avatar_engineer_dms_1791789009707.jpg',
    role: 'admin',
    company: 'Data Management Systems SAE (HQ)',
    companyAr: 'أنظمة إدارة البيانات (المقر الرئيسي)',
    tier: 'Platinum',
    points: 9999,
    certifications: [
      'Certified Solution Partner',
      'AI & Advanced Analytics Specialist',
      'Certified Integration Specialist',
      'Certified Report Developer'
    ],
    skills: ['DMS Core Architecture', 'Security Clearance', 'E-Invoicing Gateway', 'HL7/FHIR'],
    joinedDate: '2020-01-01'
  }
};

interface AuthContextType {
  user: UserProfile;
  switchUserRole: (role: UserRole) => void;
  updateUser: (updated: Partial<UserProfile>) => void;
  addPoints: (points: number) => void;
  deductPoints: (points: number) => boolean;
  addCertification: (certName: string) => void;
  allSampleUsers: Record<UserRole, UserProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('developer');
  const [users, setUsers] = useState<Record<UserRole, UserProfile>>(defaultUsers);

  const user = users[currentRole];

  const switchUserRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    setUsers((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        ...updated
      }
    }));
  };

  const addPoints = (points: number) => {
    setUsers((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        points: prev[currentRole].points + points
      }
    }));
  };

  const deductPoints = (points: number): boolean => {
    if (user.points < points) return false;
    setUsers((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        points: prev[currentRole].points - points
      }
    }));
    return true;
  };

  const addCertification = (certName: string) => {
    if (user.certifications.includes(certName)) return;
    setUsers((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        certifications: [...prev[currentRole].certifications, certName],
        points: prev[currentRole].points + 250 // bonus points for earning certification
      }
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        switchUserRole,
        updateUser,
        addPoints,
        deductPoints,
        addCertification,
        allSampleUsers: users
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
