import { defaultButtonLabel } from '../constants'
import { ChoiceUnclickableInputBlock } from './schema'

export const defaultChoiceUnclickableInputOptions = {
  buttonLabel: defaultButtonLabel,
  searchInputPlaceholder: 'Filter the options...',
  isMultipleChoice: false,
  isSearchable: false,
} as const satisfies ChoiceUnclickableInputBlock['options']
