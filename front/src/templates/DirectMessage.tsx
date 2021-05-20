import React from 'react'
import { TabPanel } from './TabPanel'
import Logo from '../assets/images/done.png'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'


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
          <List className={classes.root}>
            <header
              style={{
                width: '100%',
                height: '30px',
                boxShadow: '0px 3px 6px #0000001A',
                display: 'flex',
                justifyContent: 'space-around',
                borderRadius: '5px',
              }}
            >
              <img src={Logo} alt="" className={classes.img} />
            </header>
            <div className="" style={{ height: '450px', overflow: 'scroll' ,background:"#7494C0"}}></div>
            <footer
              style={{
                height: '30px',
                background: 'royalblue',
                display: 'flex',
                justifyContent: 'space-around',
                margin: '0',
                color: 'white',
                borderRadius: '5px',
              }}
            >
             <form style={{display:"flex"}}>
               <div className="">
                <input type="text" />
               </div>
                <div className="">
                <input type="button" value="" />
                </div>
             </form>
            </footer>
          </List>
        </div>
      </div>
      {/* <div className="">
       DM
      </div> */}
    </TabPanel>
  )
}
