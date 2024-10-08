import { SearchInput } from '@/components/inputs/SearchInput'
import { InputSubmitContent } from '@/types'
import { isMobile } from '@/utils/isMobileSignal'
import { isDefined, isNotEmpty, isSvgSrc } from '@typebot.io/lib/utils'
import { PictureButtonBlock } from '@typebot.io/schemas'
import { For, Show, createEffect, createSignal, onMount } from 'solid-js'
import { PlateText, PlateTextProps } from '../../bubbles/textBubble/components/plate/PlateText'

type Props = {
  defaultItems: PictureButtonBlock['items']
  block: PictureButtonBlock
  options: PictureButtonBlock['options']
  onSubmit: (value: InputSubmitContent) => void
  onTransitionEnd: () => void
}

export const SinglePictureButton = (props: Props) => {
  let inputRef: HTMLInputElement | undefined
  let questionRef: HTMLInputElement | undefined
  const [filteredItems, setFilteredItems] = createSignal(props.defaultItems)
  const [totalLoadedImages, setTotalLoadedImages] = createSignal(0)

  console.log(props.options?.picturesInRow)
  onMount(() => {
    if (!isMobile() && inputRef) inputRef.focus({ preventScroll: true })
  })

  const handleClick = (itemIndex: number) => {
    const item = filteredItems()[itemIndex]
    return props.onSubmit({
      label: isNotEmpty(item.title) ? item.title : item.pictureSrc ?? item.id,
      value: item.id,
    })
  }

  const filterItems = (inputValue: string) => {
    setFilteredItems(
      props.defaultItems.filter(
        (item) =>
          item.title
            ?.toLowerCase()
            .includes((inputValue ?? '').toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes((inputValue ?? '').toLowerCase())
      )
    )
  }

  createEffect(() => {
    if (
      totalLoadedImages() ===
      props.defaultItems.filter((item) => isDefined(item.pictureSrc)).length
    )
      props.onTransitionEnd()
  })

  const onImageLoad = () => {
    setTotalLoadedImages((acc) => acc + 1)
  }

  return (
    <div class="flex flex-col gap-2 w-full">
      <Show when={props.options?.isSearchable}>

        <div class="flex items-end typebot-input w-full">
          <SearchInput
            ref={inputRef}
            onInput={filterItems}
            placeholder={props.options?.searchInputPlaceholder ?? ''}
            onClear={() => setFilteredItems(props.defaultItems)}
          />
        </div>
      </Show>
      <div class="flex flex-col flex-1" style={{"background":"#f7f8ff"}}>
        {/* <div >{props.block.question}</div> */}
        <div class='overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis opacity-100 text-right'>
          <PlateText
            {...({ text: props.block.question } as PlateTextProps)}
            isUniqueChild={true}
          />
        </div>
      </div>
      <div
        class={
          'gap-2 flex flex-wrap justify-end' +
          (props.options?.isSearchable
            ? ' overflow-y-scroll max-h-[464px] rounded-md'
            : '')
        }
      >
        <For each={filteredItems()}>
          {(item, index) => (
            <button
              on:click={() => handleClick(index())}
              data-itemid={item.id}
              class={
                'flex flex-col typebot-picture-button-1 focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  ' +
                (isSvgSrc(item.pictureSrc) ? 'has-svg-1' : '')
              }
              style={props.options?.picturesInRow == 2 ? "width:48%;" :
                props.options?.picturesInRow == 3 ? "width:31%;" : ""
              }
            >
              <img
                src={item.pictureSrc}
                alt={item.title ?? `Picture ${index() + 1}`}
                elementtiming={`Picture choice ${index() + 1}`}
                fetchpriority={'high'}
                class="m-auto"
                onLoad={onImageLoad}
              />
              <div
                class={
                  'flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full' +
                  (item.description ? ' items-start' : '')
                }
              >
                <span class="font-semibold">{item.title}</span>
                <span class="text-sm whitespace-pre-wrap text-left">
                  {item.description}
                </span>
              </div>
            </button>
          )}
        </For>
      </div>
    </div>
  )
}
