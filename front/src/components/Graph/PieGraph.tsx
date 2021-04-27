import React from 'react'
import { Grid } from '@material-ui/core'

export const PieGraph = () => {
  const option ={}
  const data={}
  return (
    // 円グラフ
    // セレクトボックス(起点となる日付、集計する方法)
    // 表示(総学習計画時間、総学習時間、総達成率)
    <Grid container>
      <Grid sm={9} xs={12} style={{ width: '100%', height: '400px', background: 'green' }}>
      </Grid>
      <Grid sm={3} xs={12} style={{ width: '100%', height: '400px', background: 'red' }}>
      </Grid>
    </Grid>
  )
}
