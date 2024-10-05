import type { ResponseType } from './types'
import './style.scss'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import useRequest from '../../hooks/useRequest'


//默认请求数据
const defaultRequestData = {
    url: '/hotsearch',
    method: 'GET',
}

const Search = () => {
    const localSearchList = localStorage.getItem('search-list')
    const searchListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : []

    const [historyList, setHistoryList] = useState(searchListHistory)
    const [keyword, setKeyword] = useState('')

    const { data } = useRequest<ResponseType>(defaultRequestData)
    const hotList = data?.data || []

    function handleKeyDown(key: string) {
        if (key === 'Enter' && keyword) {
            const keywordIndex = historyList.findIndex(item => item === keyword)

            const newHistoryList = [...historyList]
            if (keywordIndex > -1) {
                newHistoryList.splice(keywordIndex, 1)
            }
            newHistoryList.unshift(keyword)
            if (newHistoryList.length >= 8) {
                newHistoryList.length = 8
            }
            setHistoryList(newHistoryList)
            localStorage.setItem('search-list', JSON.stringify(newHistoryList))
            setKeyword('')
        }
    }

    function handleHistoryListClean() {
        setHistoryList([])
        localStorage.setItem('search-list', JSON.stringify([]))
    }

    return (
        <div className='page search-page'>
            <div className='search'>
                <Link to='/home' className='search-back-link'>
                    <div className='search-back-icon iconfont'>&#xe605;</div>
                </Link>
                <div className='search-area'>
                    <div className='search-icon iconfont'>&#xe64e;</div>
                    <input
                        type="text"
                        className='search-input'
                        placeholder='请输入商品名称'
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        onKeyDown={(e) => { handleKeyDown(e.key) }}
                    />
                </div>
            </div>

            {
                historyList.length ? (
                    <>
                        <div className='title'>
                            历史搜索
                            <div
                                onClick={handleHistoryListClean}
                                className='iconfont title-close'
                            >&#xe614;</div>
                        </div>
                        <ul className='list'>
                            {
                                historyList.map((item, index) => {
                                    return (
                                        <li
                                            className='list-item'
                                            key={item + index}
                                        >
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </>
                ) : null
            }

            {
                hotList.length ? (
                    <>
                        <div className='title'>
                            热门搜索
                        </div>
                        <ul className='list'>
                            {
                                hotList.map(item => (
                                    <li
                                        className='list-item'
                                        key={item.id}
                                    >
                                        {item.keyword}
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                ) : null
            }
        </div>
    )
}

export default Search