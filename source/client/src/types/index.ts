export interface Team {
  id?: string;
  internalId?: string;
  name?: string;
  description?: string;
  visibility?: string;
  url?: string;
  members?: TeamMembers;
  channels?: TeamChannels;
  drive?: TeamDrive;
}

export interface TeamChannels {
  count?: number;
  hasMore?: boolean;
  values?: TeamChannel[];
}

export interface TeamChannel {
  id?: string;
  name?: string;
  url?: string;
}

export interface TeamMembers {
  count?: number;
  hasMore?: boolean;
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
