export interface DataSourcePermission {
  id: number;
  datasourceId: number;
  permission: number;
  permissionName: string;
  created: string;
  updated: string;
  userId?: number;
  userLogin?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  teamId?: number;
  teamAvatarUrl?: string;
  team?: string;
  builtInRole?: string;
  managed: boolean;
}

export interface DataSourcePermissionDTO {
  datasourceId: number;
  enabled: boolean;
  permissions: DataSourcePermission[];
}

export interface DataSourcePermissionState {
  datasourceId: number;
  enabled: boolean;
  permissions: DataSourcePermission[];
}
