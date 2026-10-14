// xiao1009 Request and response types for POST /api/refine/suggest (RefineAD).
// These mirror api/src/dtos/refine.dto.ts field for field. If the backend contract changes, change
// both files in the same PR.

// xiao1009 Must stay identical to REFINE_PRESETS in api/src/prompts/refinePresets.ts: the frontend
// only ever sends the id, and the backend answers 400 for one it does not know.
export type RefinePresetId =
  | 'shorten-to-fit'
  | 'simplify'
  | 'fix-grammar'
  | 'keep-onscreen-text-verbatim'

export interface RefineClipInput {
  clipId: string
  currentText: string
}

// xiao1009 v1 sends exactly one clip; the backend rejects anything else with 400. presetId and
// instruction are each optional, but at least one of them has to be present.
export interface RefineSuggestRequest {
  audioDescriptionId: string
  clips: RefineClipInput[]
  presetId?: RefinePresetId
  instruction?: string
}

// xiao1009 wordBudget only comes back for presets that work to a time budget, so the panel can show
// the word target next to the suggestion.
export interface RefineSuggestion {
  clipId: string
  original: string
  suggestion: string
  wordBudget?: number
}

export interface RefineSuggestResponse {
  requestId: string
  model: string
  suggestions: RefineSuggestion[]
}

// xiao1009 Every backend failure answers with this shape, from error.middleware.ts.
export interface RefineErrorResponse {
  message: string
}
