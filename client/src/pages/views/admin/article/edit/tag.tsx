import MyIcon from '@/pages/components/my_icon'
import { Tag } from 'antd'
import Input from 'antd/lib/input'

import Tooltip from 'antd/lib/tooltip'
import React, { FC, useState, useEffect } from 'react'

// import { Input, Tooltip,  Tag } from 'antd'

const { CheckableTag } = Tag

type AppTagProps = {
  list: Array<any>,
  setList: any,
  selectedList: Array<any>,
  setSelectedList: any
}
const AppTag: FC<AppTagProps> = (props: AppTagProps) => {
  const { list, setList } = props
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { selectedList, setSelectedList } = props
  let inputRef: any = null

  function removeItem(item: string) {
    const newList = list.filter(l => l !== item)
    setList(newList)
  }

  function addItem() {
    if (inputValue && !list.find(d => d === inputValue)) {
      setList([...list, inputValue])
      setSelectedList([...selectedList, inputValue])
      setInputValue('')
    }

    setInputVisible(false)
  }

  function showInput() {
    setInputVisible(true)
    inputRef && inputRef.focus()
  }

  // 行点击选中事件
  function handleSelect(value: string, checked: boolean) {
    const newList = checked ? [...selectedList, value] : selectedList.filter(t => t !== value)
    setSelectedList(newList)
  }

  return (
    <>
      {list.map((item, index) => {
        const isLongTag = item.length > 20
        const tagElem = (
          <CheckableTag
            key={item}
            // closable='true'
            // onClose={() => removeItem(item)}
            checked={selectedList.includes(item)}
            onChange={checked => handleSelect(item, checked)}
          >
            {isLongTag ? `${item.slice(0, 20)}...` : item}
          </CheckableTag>
        )
        return isLongTag ? (
          <Tooltip title={item} key={item}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        )
      })}

      <Input
        style={{ width: 78, display: inputVisible ? 'inline' : 'none' }}
        ref={el => {
          inputRef = el
        }}
        type='text'
        size='small'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onBlur={addItem}
        onPressEnter={addItem}
      />

      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <MyIcon type='icon-plus-square' /> 新建标签
        </Tag>
      )}
    </>
  )
}

export default AppTag;
