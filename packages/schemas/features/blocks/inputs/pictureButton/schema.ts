import { z } from '../../../../zod'
import { optionBaseSchema, blockBaseSchema } from '../../shared'
import { conditionSchema } from '../../logic'
import { InputBlockType } from '../constants'
import { itemBaseSchemas } from '../../../items/shared'

export const pictureButtonOptionsSchema = optionBaseSchema.merge(
  z.object({
    isMultipleChoice: z.boolean().optional(),
    isSearchable: z.boolean().optional(),
    buttonLabel: z.string().optional(),
    searchInputPlaceholder: z.string().optional(),
    picturesInRow: z.number().optional(),
    dynamicItems: z
      .object({
        isEnabled: z.boolean().optional(),
        titlesVariableId: z.string().optional(),
        descriptionsVariableId: z.string().optional(),
        pictureSrcsVariableId: z.string().optional(),
      })
      .optional(),
  })
)

export const pictureButtonItemSchemas = {
  v5: itemBaseSchemas.v5.extend({
    pictureSrc: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    // picturesInRow: z.number().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
  v6: itemBaseSchemas.v6.extend({
    pictureSrc: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    // picturesInRow: z.number().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
}

export const pictureButtonItemSchema = z.union([
  pictureButtonItemSchemas.v5,
  pictureButtonItemSchemas.v6,
])

export const pictureButtonBlockV5Schema = blockBaseSchema.merge(
  z.object({
    type: z.enum([InputBlockType.PICTURE_BUTTON]),
    question: z.string().optional(),
    items: z.array(pictureButtonItemSchemas.v5),
    options: pictureButtonOptionsSchema.optional(),
  })
)

export const pictureButtonBlockV6Schema = blockBaseSchema.merge(
  z.object({
    type: z.enum([InputBlockType.PICTURE_BUTTON]),
    question: z.string().optional(),
    items: z.array(pictureButtonItemSchemas.v6),
    options: pictureButtonOptionsSchema.optional(),
  })
)

export const pictureButtonBlockSchemas = {
  v5: pictureButtonBlockV5Schema.openapi({
    title: 'Picture button v5',
    ref: 'pictureButtonV5',
  }),
  v6: pictureButtonBlockV6Schema.openapi({
    title: 'Picture button',
    ref: 'pictureButton',
  }),
} as const

export const pictureButtonBlockSchema = z.union([
  pictureButtonBlockSchemas.v5,
  pictureButtonBlockSchemas.v6,
])

export type PictureButtonItem = z.infer<typeof pictureButtonItemSchema>
export type PictureButtonBlock = z.infer<typeof pictureButtonBlockSchema>
