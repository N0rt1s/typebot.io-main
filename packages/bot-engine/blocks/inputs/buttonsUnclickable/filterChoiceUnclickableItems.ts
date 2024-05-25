import { executeCondition } from '@typebot.io/logic/executeCondition'
import { ChoiceUnclickableInputBlock, Variable } from '@typebot.io/schemas'

export const filterChoiceUnclickableItems =
  (variables: Variable[]) =>
    (block: ChoiceUnclickableInputBlock): ChoiceUnclickableInputBlock => {
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
