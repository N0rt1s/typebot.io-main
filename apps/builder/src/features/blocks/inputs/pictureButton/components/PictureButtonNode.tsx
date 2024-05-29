import { BlockIndices, PictureButtonBlock, PictureButtonItem } from '@typebot.io/schemas'
import React, { useRef, useState } from 'react'
import { Stack, Tag, Wrap, Text, Popover, FormLabel, Input, InputProps, Textarea } from '@chakra-ui/react'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { SetVariableLabel } from '@/components/SetVariableLabel'
import { ItemNodesList } from '@/features/graph/components/nodes/item/ItemNodesList'
import { useTranslate } from '@tolgee/react'
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react'
type Props = {
  block: PictureButtonBlock
  indices: BlockIndices
}

export const PictureButtonNode = ({ block, indices }: Props) => {
  const { t } = useTranslate()
  const { typebot, updateBlock } = useTypebot()
  const [questionValue, setQuestionValue] = useState("");
  const questionRef = useRef<HTMLInputElement>(null)
  const dynamicVariableName = typebot?.variables.find(
    (variable) =>
      variable.id === block.options?.dynamicItems?.pictureSrcsVariableId
  )?.name
  const onInputChange = (e: any) => {
    setQuestionValue(e.target.value)
    // const updatedBlock = { ...block, content: e.target.value }
    // updateBlock(indices, updatedBlock)
  }

  const onInputSubmit = (e: any) => {
    console.log("called input submit")
    const updatedBlock = { ...block, question: questionValue }
    updateBlock(indices, updatedBlock)
  }
  return (
    <Stack w="full">
      {block.options?.dynamicItems?.isEnabled && dynamicVariableName ? (
        <Wrap spacing={1}>
          <Text>
            {t('blocks.inputs.picture.settings.dynamicVariables.display.label')}
          </Text>
          <Tag bg="orange.400" color="white">
            {dynamicVariableName}
          </Tag>
          <Text>
            {t(
              'blocks.inputs.picture.settings.dynamicVariables.pictures.label'
            )}
          </Text>
        </Wrap>
      ) : (
        <>
          <Stack>
            <Textarea
              data-testid="question-input"
              // label="Question"
              // defaultValue="asd"
              defaultValue={block.question}
              placeholder={"Ask a question"}
              onChange={onInputChange}
              onBlur={onInputSubmit}
            />
          </Stack>
          <ItemNodesList block={block} indices={indices} />
        </>
      )}
      {block.options?.variableId ? (
        <SetVariableLabel
          variableId={block.options.variableId}
          variables={typebot?.variables}
        />
      ) : null}
    </Stack>
  )
}
