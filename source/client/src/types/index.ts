export interface Team {
  id?: string;
  internalId?: string;
  name?: string;
  description?: string;
  visibility?: string;
  url?: string;
  icon?: string;
}

export interface TeamChannels {
  count?: number;
  nextLink?: string;
  values?: TeamChannel[];
}

export interface TeamChannel {
  id?: string;
  name?: string;
  url?: string;
}

export interface TeamMembers {
  count?: number;
  nextLink?: string;
  values?: TeamMember[];
}

export interface TeamMember {
  id?: string;
  name?: string;
  email?: string;
}

export interface TeamDrive {
  id?: string;
  url?: string;
}
