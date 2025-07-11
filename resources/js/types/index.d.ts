import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Group {
  id: number
  name: string
  label: string
  description: string | null
}


export interface Field {
  id: number
  label: string
  name: string
  type: string
}

export interface Type {
  id: number
  name: string
  fields?: Field[]
}

export interface Credential {
  id: number
}

interface CredentialsByType {
  [typeName: string]: Field[];
}

interface CredentialsByGroup {
  [groupName: string]: CredentialsByType;
}

export interface Client {
  id: number
  name: string
  credentials?: Credential[]
}