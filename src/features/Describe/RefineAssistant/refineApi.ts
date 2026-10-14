// xiao1009 The one call RefineAD makes to the backend. Inline axios with an explicit
// withCredentials, following the call in EditClip.tsx:632-638; withCredentials is also on globally
// (App.tsx:145), and a 401 is additionally picked up by the interceptor at App.tsx:148-162, which
// clears the login state and shows the session-expired toast.
import axios from 'axios'
import { apiUrl } from '@/shared/config'
import {
  RefineSuggestRequest,
  RefineSuggestResponse,
} from '@/shared/types/refine'

// xiao1009 Shown when the backend gave us nothing usable to show, e.g. the request never arrived.
export const DEFAULT_REFINE_ERROR =
  'Could not get a suggestion. Please try again.'

// xiao1009 Matches MAX_INSTRUCTION_CHARS in api/src/controllers/refine.controller.ts, so the input
// stops the describer before the backend has to answer 400.
export const MAX_INSTRUCTION_CHARS = 500

// xiao1009 Carries the HTTP status so the panel can tell "try again" cases (503 timeout) apart from
// ones that will not get better on their own.
export class RefineRequestError extends Error {
  public status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'RefineRequestError'
    this.status = status
  }
}

// xiao1009 The backend sends a readable sentence in `message` for every failure, so it is shown as
// is. 401 is the exception: 'Authentication required' means nothing to a describer.
const readErrorMessage = (error: any): string => {
  if (error?.response?.status === 401) {
    return 'Your session has expired. Please sign in again.'
  }
  return error?.response?.data?.message || DEFAULT_REFINE_ERROR
}

export const requestRefineSuggestion = async (
  body: RefineSuggestRequest,
): Promise<RefineSuggestResponse> => {
  try {
    const response = await axios.post<RefineSuggestResponse>(
      `${apiUrl}/refine/suggest`,
      body,
      { withCredentials: true },
    )
    return response.data
  } catch (error: any) {
    throw new RefineRequestError(
      readErrorMessage(error),
      error?.response?.status,
    )
  }
}
