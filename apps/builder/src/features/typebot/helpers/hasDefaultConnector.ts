import { isDefined } from '@typebot.io/lib'
import {
  isChoiceInput,
  isChoiceUnclickableInput,
  isConditionBlock,
  isPictureButtonInput,
  isPictureChoiceInput,
} from '@typebot.io/schemas/helpers'
import { BlockV6 } from '@typebot.io/schemas'
import { InputBlockType } from '@typebot.io/schemas/features/blocks/inputs/constants'
import { LogicBlockType } from '@typebot.io/schemas/features/blocks/logic/constants'

export const hasDefaultConnector = (block: BlockV6) =>
  (
    !isChoiceInput(block) &&
    !isChoiceUnclickableInput(block) &&
    !isPictureChoiceInput(block) &&
    !isPictureButtonInput(block) &&
    !isConditionBlock(block) &&
    block.type !== LogicBlockType.AB_TEST) ||
  (block.type === InputBlockType.CHOICE &&
    isDefined(block.options?.dynamicVariableId)) ||
  (block.type === InputBlockType.CHOICE_UNCLICKABLE &&
    isDefined(block.options?.dynamicVariableId)) ||
  (block.type === InputBlockType.PICTURE_CHOICE &&
    block.options?.dynamicItems?.isEnabled &&
    block.options.dynamicItems.pictureSrcsVariableId) ||
  (block.type === InputBlockType.PICTURE_BUTTON &&
    block.options?.dynamicItems?.isEnabled &&
    block.options.dynamicItems.pictureSrcsVariableId)
