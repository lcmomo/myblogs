import React, { useCallback, useState } from 'react'
import { Input, Row } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
// import useMount from '@/hooks/useMount'
import { decodeQuery } from '@/utils';
import MyIcon from '@/pages/components/Icon';

function SearchButton(props: any) {
  const history = useHistory()
  const location = useLocation()
  const [keyword, setKeyword] = useState('')

  // useMount(() => {
  //   const { keyword } = decodeQuery(location.search)
  //   keyword && setKeyword(keyword)
  // })

  const handleSubmit = useCallback(() => {
    console.log("cur: ", keyword)
    if (keyword) history.push(`/?page=1&keyword=${keyword}`)
  },[keyword]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("key: ", e.target.value, keyword)
    setKeyword(e.target.value);
  },[]);

  const handlePressEnter = useCallback((e: any) => {
    console.log("blur: ", e.target, keyword)
    e.target.blur();
  }, [keyword]);

  return (
    <div id='search-box'>
      <MyIcon type='icon-search' onClick={e => props.history.push(`/?page=1&keyword=${keyword}`)} />
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handlePressEnter}
        className='search-input'
        placeholder='搜索文章'
        style={{ width: 200 }}
      />
    </div>
  )
}

export default SearchButton;
