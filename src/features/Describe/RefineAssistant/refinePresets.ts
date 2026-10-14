// xiao1009 The preset buttons the panel renders. Only id and label live here: the full instruction
// text stays on the backend (api/src/prompts/refinePresets.ts), so wording can be changed without
// releasing the frontend.
//
// The ids and the labels below are copied from that file and must match it exactly. The backend
// answers 400 with the list of valid ids if they ever drift apart.
import { RefinePresetId } from '@/shared/types/refine'

export interface RefinePresetButton {
  id: RefinePresetId
  label: string
}

// xiao1009 The panel renders this array in a loop, so adding a preset is one entry here plus one
// entry in the backend file. Order is the order the buttons appear in.
export const REFINE_PRESETS: RefinePresetButton[] = [
  { id: 'shorten-to-fit', label: 'Shorten to fit' },
  { id: 'simplify', label: 'Simplify' },
  { id: 'fix-grammar', label: 'Fix grammar' },
  { id: 'keep-onscreen-text-verbatim', label: 'Keep on-screen text' },
]
