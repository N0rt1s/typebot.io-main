import { defaultButtonLabel } from '../constants'
import { PictureButtonBlock } from './schema'

export const defaultPictureButtonOptions = {
  buttonLabel: defaultButtonLabel,
  searchInputPlaceholder: 'Filter the options...',
  // isMultipleChoice: false,
  picturesInRow: 1,
  isSearchable: false,
  dynamicItems: {
    isEnabled: false,
  },
} as const satisfies PictureButtonBlock['options']
