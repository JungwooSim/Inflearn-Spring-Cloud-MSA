import { useCallback, useMemo, useReducer } from 'react';
import { FolderDTO } from 'app/types';
import { contextSrv } from 'app/core/services/context_srv';
import { DashboardQuery, DashboardSection, OnDeleteItems, OnMoveItems, OnToggleChecked } from '../types';
import { DELETE_ITEMS, MOVE_ITEMS, TOGGLE_ALL_CHECKED, TOGGLE_CHECKED } from '../reducers/actionTypes';
import { manageDashboardsReducer, manageDashboardsState, ManageDashboardsState } from '../reducers/manageDashboards';
import { useSearch } from './useSearch';
import { GENERAL_FOLDER_ID } from '../constants';

const hasChecked = (section: DashboardSection) => {
  return section.checked || section.items.some((item) => item.checked);
};

export const useManageDashboards = (
  query: DashboardQuery,
  state: Partial<ManageDashboardsState> = {},
  folder?: FolderDTO
) => {
  const reducer = useReducer(manageDashboardsReducer, {
    ...manageDashboardsState,
    ...state,
  });

  const {
    state: { results, loading, initialLoading, allChecked },
    onToggleSection,
    dispatch,
  } = useSearch<ManageDashboardsState>(query, reducer, {});

  const onToggleChecked: OnToggleChecked = useCallback(
    (item) => {
      dispatch({ type: TOGGLE_CHECKED, payload: item });
    },
    [dispatch]
  );

  const onToggleAllChecked = () => {
    dispatch({ type: TOGGLE_ALL_CHECKED });
  };

  const onDeleteItems: OnDeleteItems = (folders, dashboards) => {
    dispatch({ type: DELETE_ITEMS, payload: { folders, dashboards } });
  };

  const onMoveItems: OnMoveItems = (selectedDashboards, folder) => {
    dispatch({ type: MOVE_ITEMS, payload: { dashboards: selectedDashboards, folder } });
  };

  const canMove = useMemo(() => results.some((result) => result.items.some((item) => item.checked)), [results]);

  const canDelete = useMemo(() => {
    const somethingChecked = results.some(hasChecked);
    const includesGeneralFolder = results.find((result) => result.checked && result.id === GENERAL_FOLDER_ID);
    return somethingChecked && !includesGeneralFolder;
  }, [results]);

  const canSave = folder?.canSave;
  const hasEditPermissionInFolders = folder ? canSave : contextSrv.hasEditPermissionInFolders;
  const noFolders = canSave && folder?.id && results.length === 0 && !loading && !initialLoading;

  return {
    results,
    loading,
    initialLoading,
    canSave,
    allChecked,
    hasEditPermissionInFolders,
    canMove,
    canDelete,
    onToggleSection,
    onToggleChecked,
    onToggleAllChecked,
    onDeleteItems,
    onMoveItems,
    noFolders,
  };
};
