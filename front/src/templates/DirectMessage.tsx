import React from 'react'
import { TabPanel } from './TabPanel'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { DirectMessageItems } from './DirectMessageItems'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '50%',
      boxShadow: '0px 3px 6px #0000001A',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      paddingBottom: '0',
    },
    inline: {
      display: 'inline',
    },
    img: {
      height: '30px',
      // width:"30px"
      // marginLeft:"px",
    },
    avatar: {
      height: '30px',
      width: '30px',
      // marginLeft:"px",
    },
  })
)

type Props = {
  value: number
  index: number
}
export const DirectMessage = (props: Props) => {
  const { value, index } = props
  const classes = useStyles()
  return (
    <TabPanel index={index} value={value}>
      <div className="" style={{ padding: '40px 0' }}>
        <div className="" style={{ margin: 'auto' }}>
          <DirectMessageItems/>
        </div>
      </div>
    </TabPanel>
  )
}
