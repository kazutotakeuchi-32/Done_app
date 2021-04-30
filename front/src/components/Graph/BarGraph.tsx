import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setBarGraph } from '../../reducks/users/operations'
import { Selecte } from './Selecte'
import { AnalysisTable } from './AnalysisTable'

const useStyles = makeStyles((theme) => ({
  chart: {
    width: '100%',
    height: '400px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '400px',
    },
  },
}))

function getMode(analysisData: any): number {
  const subject: any = {}
  for (let i = 0; i < analysisData.length; i++) {
    if (subject[analysisData[i].toString(10)]) {
      subject[analysisData[i].toString(10)] += 1
    } else {
      subject[analysisData[i].toString(10)] = 1
    }
  }
  const vls: number[] = Object.values(subject)
  const index = vls.indexOf(Math.max(...vls))
  const result = parseInt(Object.keys(subject)[index])
  return result
}

function getStandardDeviation(datas: number[], average: number) {
  let num = 0
  for (let i = 0; i < datas.length; i++) {
    num += (datas[i] - average) ** 2
  }
  num = num / datas.length
  const result: number = Math.sqrt(num)
  return result
}

function dateType(dateType:string):string|undefined {
  switch (dateType) {
    case "year":
    case "6months":
    case "3months":
      return  "（月）"
    case "month":
    case "week" :
    case "day":
      return "（日）"
  }
}

export const BarGraph = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [barStartDate, setBarStartDate] = useState(new Date())
  const [barAggregationType, setBarAggregationType] = useState('week')
  const [scrrenWidth, setScrrenWidth] = useState(window.screen.width)
  const useDraftLearns = (state) => state.draftLearns
  const useLearns = (state) => state.learns
  const { previousTasks: draftpreviousTasks } = useSelector(useDraftLearns)
  const { previousTasks: learnPreviousTasks } = useSelector(useLearns)
  let totalPlanTime = 0
  let totalDoneTime = 0



  useEffect(() => {
    setScrrenWidth(window.screen.width)
  }, [window.screen.width])


  const analysisData: any = Object.values(learnPreviousTasks.data.map((l) => l.data))
  const total = analysisData.reduce(function (sum, num) {
    return sum + num
  }, 0)
  const mode = getMode(analysisData)
  const standardDeviation =
    Math.round(getStandardDeviation(analysisData, Math.floor(total / analysisData.length)) * 100) / 100

  draftpreviousTasks.data.forEach((l) => (totalPlanTime += l.data))
  learnPreviousTasks.data.forEach((l) => (totalDoneTime += l.data))

  const options = {
    // maintainAspectRatio:window.screen.width > 414 ? false : true,
    maintainAspectRatio: false,
    // maintainAspectRatio:scrrenWidth > 414 ? true:false,
    title: {
      display: true,
      text: draftpreviousTasks.title,
    },
    scales: {
      yAxes: [
        {
          // display: true,
          display: scrrenWidth > 414 ? true : true,
          text: 'dd',
          scaleLabel: {
            display: true,
            labelString: '(時)',
            fontSize: 14,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          display: true,
          text: 'dd',
          scaleLabel: {
            // display: true,
            display: scrrenWidth > 414 ? true : false,
            // labelString: '（月）',
            labelString:dateType(barAggregationType),
            fontSize: 14,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      showAllTooltips: true,
      callbacks: {
        label: function (tooltipItem, data) {
          const vl = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
          const label = data.datasets[tooltipItem.datasetIndex].label
          let achievementRate = Math.floor((vl / data.datasets[0].data[tooltipItem.index]) * 100 + 0.5)
          if (achievementRate == Infinity) {
            achievementRate = 0
          }
          return label == 'Done'
            ? `${label} 学習時間(時) : ${vl} 達成率(%) : ${achievementRate}`
            : `${label} 学習時間(時) : ${vl}`
        },
      },
    },
  }
  const barData = {
    labels: draftpreviousTasks.data.map((l) => l.label),
    datasets: [
      {
        label: 'Plan',
        data: draftpreviousTasks.data.map((l) => l.data),
        fill: true, // for Line chlearing.previousTasks.map((l)=>l.data)rt
        backgroundColor: 'red',
        borderColor: 'red', // for Line chart
      },
      {
        label: 'Done',
        data: learnPreviousTasks.data.map((l) => l.data),
        fill: true, // for Line chart
        backgroundColor: '#17A8F5',
        borderColor: '#17A8F5', // for Line chart
      },
    ],
  }

  return (
    // 棒グラフ
    // セレクトボックス(起点となる日付、集計する方法)
    // 表示(総学習計画時間、総学習時間、総達成率)
    <Grid container>
      <Grid sm={9} xs={12} style={{ width: 'auto', height: 'auto', paddingTop: '20px' }}>
        <div className={classes.chart}>
          <Bar data={barData} options={options} />
        </div>
      </Grid>
      <Grid sm={3} xs={12} style={{ margin: 'auto' }}>
        <Selecte
          startDate={barStartDate}
          aggregationType={barAggregationType}
          onChangeDate={(e) => {
            setBarStartDate(e)
            dispatch(setBarGraph(e, barAggregationType, location.href.split('/')[4]))
          }}
          onChangeSelect={(e) => {
            setBarAggregationType(e.target.value)
            dispatch(setBarGraph(barStartDate, e.target.value, location.href.split('/')[4]))
          }}
          onClick={(e) => {
            // console.log(e)
            ;('')
          }}
        />
      </Grid>
      <Grid sm={12} xs={12} style={{ width: '100%', height: 'auto' }}>
        <div className="" style={{ width: '100%', height: 'auto' }}>
          <AnalysisTable
            totalPlanTime={totalPlanTime}
            totalDoneTime={totalDoneTime}
            achievementRate={Math.floor((totalDoneTime / totalPlanTime) * 100 + 0.5)}
            maxTime={Math.max(...analysisData)}
            minTime={Math.min(...analysisData)}
            average={Math.floor(total / analysisData.length)}
            mode={mode}
            standardDeviation={standardDeviation}
          />
        </div>
        {/* <div className="">
          <p>総計画(時) ：{totalPlanTime}</p>
          <p>総学習（時）：{totalDoneTime}</p>
          <p>達成率（％）：{Math.floor((totalDoneTime / totalPlanTime) * 100 + 0.5)}</p>
          <p>最大値(時)</p>
          <p>最小値</p>
          <p>平均値(時)</p>
          <p>最頻値</p>
          <p>標準偏差</p>
        </div> */}
      </Grid>
    </Grid>
  )
}

// <div className="">
// <DatePicker
//   selected={barStartDate}
//   onChange={async (e) => {
//     setBarStartDate(e)
//     dispatch(setBarGraph(e, barAggregationType, location.href.split('/')[4]))
//   }}
//   dateFormat="yyyy年MM月dd日 "
//   maxDate={new Date()}
//   minDate={new Date(2020, 3)}
//   // monthsShown={1}
//   locale="ja"
//   // withPortal
// />
// <select
//   className="ui dropdown"
//   name="dropdown"
//   value={barAggregationType}
//   onChange={async (e) => {
//     setBarAggregationType(e.target.value)
//     dispatch(setBarGraph(barStartDate, e.target.value, location.href.split('/')[4]))
//   }}
// >
//   <option value="year">年で集計</option>
//   <option value="6months">6ヶ月で集計</option>
//   <option value="3months">３ヶ月で集計</option>
//   <option value="month">1ヶ月で集計</option>
//   <option value="week" selected>
//     １週間で集計
//   </option>
//   <option value="day">1日で集計</option>
// </select>
// </div>
// <div className="">
// <IconButton style={{ background: '#3f51b5' }}>
//   <ZoomOutMapIcon />
// </IconButton>
// </div>
