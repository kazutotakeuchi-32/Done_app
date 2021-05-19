import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import { TabPanel } from './TabPanel'
import TimeLineItems from './TimeLineItems'
import Pagination from '@material-ui/lab/Pagination'
import { createStyles,  makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        // height:"500px",
        overflow: 'scroll',
      },
    },
    ul: {
      justifyContent: 'center',
      //  marginLeft:"45px",
      paddingTop: '20px',
    },
  })
)

type PaginationProps = {
  maxPage: number
  currentPage: number
  onChange: (event: any, page: number) => void
}
export default function BasicPagination({ maxPage, currentPage, onChange }: PaginationProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination count={maxPage} classes={{ ul: classes.ul }} page={currentPage} onChange={onChange} />
    </div>
  )
}

type Props = {
  value: number
  index: number
}

function getNextAggregationType(prevAggregationType: string): string {
  let nextAggregationType = ''
  switch (prevAggregationType) {
    case '投稿':
      nextAggregationType = 'MYONLY'
      break
    case 'タイムライン':
      nextAggregationType = 'BASIC'
      break
    case 'いいね':
      nextAggregationType = 'LIKE'
      break
  }
  return nextAggregationType
}

export const TimeLine = (props: Props) => {
  const scrollTopRef = useRef<any>(null)
  const { value, index } = props
  const [data, setData] = useState<any>([])
  const [maxPage, setMaxPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [aggregationType, setAggregationType] = useState('BASIC')

  useEffect(() => {
    const id = location.href.split('/')[4]
    const fetchTimeLine = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/${id}/time_line?cuurent_page=${currentPage}&type=BASIC`
      )
      setData(res.data.data.timeLine)
      setMaxPage(res.data.data.maxPage)
      if (res.data.data.maxPage == currentPage) {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }
    fetchTimeLine()
  }, [location.href])
  return (
    <TabPanel index={index} value={value}>
      <div
        className=""
        style={{ padding: '40px 0' }}
      >
        <div className="" style={{ margin: 'auto' }}>
          <div className="" style={{ height: '500px' }}>
            <TimeLineItems
              timeLine={data}
              scrollTopRef={scrollTopRef}
              isActive={isActive}
              onClick={async (e) => {
                const text: string = e.target.innerText
                const nextAggregationType: string = getNextAggregationType(text)
                const res = await axios.get(
                  `http://localhost:3000/api/v1/users/${
                    location.href.split('/')[4]
                  }/time_line?cuurent_page=1&type=${nextAggregationType}`
                )
                setData(res.data.data.timeLine)
                setMaxPage(res.data.data.maxPage)
                setCurrentPage(1)
                setAggregationType(nextAggregationType)
                scrollTopRef?.current?.scrollIntoView()
                if (maxPage == 1) {
                  setIsActive(true)
                } else {
                  setIsActive(false)
                }
              }}
            />
          </div>
          <BasicPagination
            maxPage={maxPage}
            currentPage={currentPage}
            onChange={async (event, page) => {
              const res = await axios.get(
                `http://localhost:3000/api/v1/users/${
                  location.href.split('/')[4]
                }/time_line?cuurent_page=${page}&type=${aggregationType}`
              )
              setData(res.data.data.timeLine)
              setMaxPage(res.data.data.maxPage)
              setCurrentPage(page)
              scrollTopRef?.current?.scrollIntoView()
              if (maxPage == page) {
                setIsActive(true)
              } else {
                setIsActive(false)
              }
            }}
          />
        </div>
      </div>
    </TabPanel>
  )
}
