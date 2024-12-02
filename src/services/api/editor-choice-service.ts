import { apiClient } from './base-api-client';
import { EditorChoice } from './types/editor-choice-types';

export const editorChoiceService = {
  async getEditorChoiceBooks(): Promise<EditorChoice[]> {
    const response = await apiClient.get('/editor-choices');
    return response.data;
  },
};
