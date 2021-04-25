import React  from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    padding: '50px 10px',
  },
  fabSize: {
    width: '70px',
    height: '70px',
  }
}))

type Props = {
  addClick: () => void
  deleteClick: (e: any) => void
  tasksLength: number
}

export const PreviewButton = (props: Props) => {
  const { addClick, deleteClick, tasksLength } = props
  const classes = useStyles()
  return (
    <Grid spacing={5} container justify={'center'}>
      <Grid classes={{ root: classes.gridRoot }}>
        <Fab color="primary" component="span" aria-label="add" className={classes.fabSize} onClick={addClick}>
          <AddIcon />
        </Fab>
      </Grid>
      {tasksLength != 0 && (
        <Grid classes={{ root: classes.gridRoot }}>
          <Fab color="primary" component="span" aria-label="add" className={classes.fabSize} onClick={deleteClick}>
            <CloseIcon />
          </Fab>
        </Grid>
      )}
    </Grid>
  )
}
