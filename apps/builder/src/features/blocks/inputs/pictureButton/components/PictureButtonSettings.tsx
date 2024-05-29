import { TextInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { FormLabel, Input, Select, Stack } from '@chakra-ui/react'
import { PictureButtonBlock, Variable } from '@typebot.io/schemas'
import React, { useRef, useState } from 'react'
import { SwitchWithRelatedSettings } from '@/components/SwitchWithRelatedSettings'
import { defaultPictureButtonOptions } from '@typebot.io/schemas/features/blocks/inputs/pictureButton/constants'
import { useTranslate } from '@tolgee/react'

type Props = {
  options?: PictureButtonBlock['options']
  onOptionsChange: (options: PictureButtonBlock['options']) => void
}

export const PictureButtonSettings = ({ options, onOptionsChange }: Props) => {
  const { t } = useTranslate()
  const questionRef = useRef<HTMLInputElement>(null)

  const [questionValue, setQuestionValue] = useState("");
  const updateIsMultiple = (isMultipleChoice: boolean) =>
    onOptionsChange({ ...options, isMultipleChoice })
  const updatePicturesPerRow = (e: any) => {
    let picturesInRow = parseInt(e.currentTarget.value);
    onOptionsChange({ ...options, picturesInRow })
  }
  const updateButtonLabel = (buttonLabel: string) =>
    onOptionsChange({ ...options, buttonLabel })
  const updateSaveVariable = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })
  const updateSearchInputPlaceholder = (searchInputPlaceholder: string) =>
    onOptionsChange({ ...options, searchInputPlaceholder })
  const updateIsSearchable = (isSearchable: boolean) =>
    onOptionsChange({ ...options, isSearchable })

  // const updateQuestion = (question: string) =>
  //   onOptionsChange({ ...options, question })

  const updateIsDynamicItemsEnabled = (isEnabled: boolean) =>
    onOptionsChange({
      ...options,
      dynamicItems: {
        ...options?.dynamicItems,
        isEnabled,
      },
    })

  const updateDynamicItemsPictureSrcsVariable = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      dynamicItems: {
        ...options?.dynamicItems,
        pictureSrcsVariableId: variable?.id,
      },
    })

  const updateDynamicItemsTitlesVariable = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      dynamicItems: {
        ...options?.dynamicItems,
        titlesVariableId: variable?.id,
      },
    })

  const updateDynamicItemsDescriptionsVariable = (variable?: Variable) =>
    onOptionsChange({
      ...options,
      dynamicItems: {
        ...options?.dynamicItems,
        descriptionsVariableId: variable?.id,
      },
    })

  const onInputChange = (e: any) => {
    setQuestionValue(e.target.value);
  }

  return (
    <Stack spacing={4}>
      <SwitchWithRelatedSettings
        label={t('blocks.inputs.settings.isSearchable.label')}
        initialValue={
          options?.isSearchable ?? defaultPictureButtonOptions.isSearchable
        }
        onCheckChange={updateIsSearchable}
      >
        <TextInput
          label={t('blocks.inputs.settings.input.placeholder.label')}
          defaultValue={
            options?.searchInputPlaceholder ??
            defaultPictureButtonOptions.searchInputPlaceholder
          }
          onChange={updateSearchInputPlaceholder}
        />
      </SwitchWithRelatedSettings>

      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {"Pictures Per Row"}
        </FormLabel>
        <Select onChange={updatePicturesPerRow}
          defaultValue={
            options?.picturesInRow ??
            defaultPictureButtonOptions.picturesInRow
          }
          placeholder='Select'>
          <option value={1}> 1</option>
          <option value={2}> 2</option>
          <option value={3}> 3</option>
        </Select>
      </Stack>

      <SwitchWithRelatedSettings
        label={t('blocks.inputs.picture.settings.dynamicItems.label')}
        initialValue={
          options?.dynamicItems?.isEnabled ??
          defaultPictureButtonOptions.dynamicItems.isEnabled
        }
        onCheckChange={updateIsDynamicItemsEnabled}
      >
        <Stack>
          <FormLabel mb="0" htmlFor="variable">
            {t('blocks.inputs.picture.settings.dynamicItems.images.label')}
          </FormLabel>
          <VariableSearchInput
            initialVariableId={options?.dynamicItems?.pictureSrcsVariableId}
            onSelectVariable={updateDynamicItemsPictureSrcsVariable}
          />
        </Stack>
        <Stack>
          <FormLabel mb="0" htmlFor="variable">
            {t('blocks.inputs.picture.settings.dynamicItems.titles.label')}
          </FormLabel>
          <VariableSearchInput
            initialVariableId={options?.dynamicItems?.titlesVariableId}
            onSelectVariable={updateDynamicItemsTitlesVariable}
          />
        </Stack>
        <Stack>
          <FormLabel mb="0" htmlFor="variable">
            {t(
              'blocks.inputs.picture.settings.dynamicItems.descriptions.label'
            )}
          </FormLabel>
          <VariableSearchInput
            initialVariableId={options?.dynamicItems?.descriptionsVariableId}
            onSelectVariable={updateDynamicItemsDescriptionsVariable}
          />
        </Stack>
      </SwitchWithRelatedSettings>


      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {t('blocks.inputs.settings.saveAnswer.label')}
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.variableId}
          onSelectVariable={updateSaveVariable}
        />
      </Stack>
    </Stack>
  )
}
