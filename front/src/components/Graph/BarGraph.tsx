import { Grid } from '@material-ui/core'
import React from 'react'

export const BarGraph = () => {
  const option ={}
  const data={}
  return (
    // 棒グラフ
    // セレクトボックス(起点となる日付、集計する方法)
    // 表示(総学習計画時間、総学習時間、総達成率)
    <Grid container>
      <Grid sm={9} xs={12} style={{ width: '100%', height: '400px', background: '#333' }}>
      </Grid>
      <Grid sm={3} xs={12} style={{ width: '100%', height: '400px', background: '#111' }}>
      </Grid>
    </Grid>
  )
}
