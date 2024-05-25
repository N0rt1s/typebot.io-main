import { z } from '../../../../zod'
import { InputBlockType } from '../constants'
import { itemBaseSchemas } from '../../../items/shared'
import { optionBaseSchema, blockBaseSchema } from '../../shared'
import { conditionSchema } from '../../logic'

export const choiceUnclickableInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    isMultipleChoice: z.boolean().optional(),
    buttonLabel: z.string().optional(),
    dynamicVariableId: z.string().optional(),
    isSearchable: z.boolean().optional(),
    searchInputPlaceholder: z.string().optional(),
  })
)

export const buttonUnclickableItemSchemas = {
  v5: itemBaseSchemas.v5.extend({
    content: z.string().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
  v6: itemBaseSchemas.v6.extend({
    content: z.string().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
}

export const buttonUnclickableItemSchema = z.union([
  buttonUnclickableItemSchemas.v5,
  buttonUnclickableItemSchemas.v6,
])

export const buttonsUnclickableInputV5Schema = blockBaseSchema.merge(
  z.object({
    type: z.enum([InputBlockType.CHOICE_UNCLICKABLE]),
    items: z.array(buttonUnclickableItemSchemas.v5),
    options: choiceUnclickableInputOptionsSchema.optional(),
  })
)

export const buttonsUnclickableInputSchemas = {
  v5: buttonsUnclickableInputV5Schema.openapi({
    title: 'ButtonsUnclickable v5',
    ref: 'buttonsUnclickableInputV5',
  }),
  v6: buttonsUnclickableInputV5Schema
    .extend({
      items: z.array(buttonUnclickableItemSchemas.v6),
    })
    .openapi({
      title: 'Buttons (Unclickable)',
      ref: 'buttonsUnclickableInput',
    }),
} as const

export const buttonsUnclickableInputSchema = z.union([
  buttonsUnclickableInputSchemas.v5,
  buttonsUnclickableInputSchemas.v6,
])

export type ButtonUnclickableItem = z.infer<typeof buttonUnclickableItemSchema>
export type ChoiceUnclickableInputBlock = z.infer<typeof buttonsUnclickableInputSchema>
