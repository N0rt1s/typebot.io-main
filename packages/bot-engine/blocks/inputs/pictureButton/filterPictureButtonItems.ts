import { executeCondition } from '@typebot.io/logic/executeCondition'
import { PictureButtonBlock, Variable } from '@typebot.io/schemas'

export const filterPictureButtonItems =
  (variables: Variable[]) =>
    (block: PictureButtonBlock): PictureButtonBlock => {
      const filteredItems = block.items.filter((item) => {
        if (item.displayCondition?.isEnabled && item.displayCondition?.condition)
          return executeCondition({
            variables,
            condition: item.displayCondition.condition,
          })

        return true
      })
      return {
        ...block,
        items: filteredItems,
      }
    }
