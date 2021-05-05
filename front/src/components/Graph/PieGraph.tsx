import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Pie } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setPieGraph } from '../../reducks/users/operations'
import { Selecte } from './Selecte'
import { SubjectAnalysisTable } from './SubjectAnalysisTable'

const useStyles = makeStyles((theme) => ({
  chart: {
    width: '100%',
    height: '300px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '300px',
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

type Props ={
  value:number,
  index:number
}

export const PieGraph = ({index,value}:Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [pieStartDate, setPieStartDate] = useState(new Date())
  const [pieAggregationType, setPieAggregationType] = useState('day')
  const useDraftLearns = (state) => state.draftLearns
  const useLearns = (state) => state.learns
  const { nextTasks: draftNextTasks } = useSelector(useDraftLearns)
  const { nextTasks: learnNextTasks } = useSelector(useLearns)
  const draftSubject = {}
  const learnSubject = {}
  let totalPlanTime = 0
  let totalDoneTime = 0

  useEffect(()=>{
    if (localStorage.getItem("pieStartDate")) {
      const date:any = localStorage.getItem("pieStartDate")
      const d=new Date(date)
      setPieStartDate(d)
      // localStorage.removeItem("pieStartDate")
    }
    if (localStorage.getItem("pieAggregationType")) {
      const AT:any = localStorage.getItem("pieAggregationType")
      setPieAggregationType(AT)
      // localStorage.removeItem("pieAggregationType")
    }
  },[value])

  draftNextTasks.data.map((l) => {
    if (draftSubject[l.subject] && l.subject != '') {
      draftSubject[l.subject] = draftSubject[l.subject] + l.time
    } else {
      draftSubject[l.subject] = l.time
    }
    totalPlanTime += l.time
  })
  learnNextTasks.data.map((l) => {
    if (learnSubject[l.subject] && l.subject != '') {
      learnSubject[l.subject] = learnSubject[l.subject] + l.time
    } else {
      learnSubject[l.subject] = l.time
    }
    totalDoneTime += l.time
  })

  const pieDraftData = Object.values(draftSubject)
  const pieDraftLabel = Object.keys(draftSubject)
  const pieLearnData: number[] = Object.values(learnSubject)
  const pieLearnLabel = Object.keys(learnSubject)
  const max = Math.max(...pieLearnData)
  const min = Math.min(...pieLearnData)
  const mode = getMode(pieLearnData)
  const total = pieLearnData.reduce((a, b) => a + b, 0)
  const average = Math.floor(total / pieLearnData.length)
  const standardDeviation =
    Math.round(getStandardDeviation(pieLearnData, Math.floor(total / pieLearnData.length)) * 100) / 100

  // Plan
  const piePlanOptions = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: draftNextTasks.title.replace('状況', '予定'),
    },
    tooltips: {
      enabled: true,
      showAllTooltips: true,
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue
          })
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = Math.floor((currentValue / total) * 100 + 0.5)
          return `${data.labels[tooltipItem.index]} 学習時間(時) : ${
            dataset.data[tooltipItem.index]
          } 構成比(%) : ${percentage}`
        },
      },
    },
    legend: {
      display: true,
    },
    pieceLabel: {
      render: function (args) {
        const dataset = args.dataset.data
        const total = dataset.reduce(function (previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue
        })
        return `${Math.floor((args.value / total) * 100 + 0.5)}%`
      },
      fontSize: 15,
    },
  }

  const pieDataPlan = {
    datasets: [
      {
        data: pieDraftData,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
    labels: pieDraftLabel,
  }

  const planValue: any = pieDataPlan.datasets[0].data
  const pieDoneOptions = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: learnNextTasks.title,
    },
    tooltips: {
      enabled: true,
      showAllTooltips: true,
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue
          })
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = Math.floor((currentValue / total) * 100 + 0.5)
          let achievementRate = Math.floor((dataset.data[tooltipItem.index] / planValue[tooltipItem.index]) * 100 + 0.5)
          if (achievementRate == Infinity) {
            achievementRate = 0
          }
          return `${data.labels[tooltipItem.index]} 学習時間(時) : ${
            dataset.data[tooltipItem.index]
          } 達成率(%) : ${achievementRate} 構成比(%) : ${percentage}`
        },
      },
    },
    legend: {
      display: true,
    },
    pieceLabel: {
      render: function (args) {
        const dataset = args.dataset.data
        const total = dataset.reduce(function (previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue
        })
        return `${Math.floor((args.value / total) * 100 + 0.5)}%`
      },
      fontSize: 15,
    },
  }

  const pieDataDone = {
    datasets: [
      {
        data: pieLearnData,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
    labels: pieLearnLabel,
  }

  return (
    // 円グラフ
    // セレクトボックス(起点となる日付、集計する方法)
    // 表示(総学習計画時間、総学習時間、総達成率)
    <Grid container>
      <Grid sm={9} xs={12} style={{ width: 'auto', height: '650px', background: '', padding: '20px' }}>
        <div className={classes.chart}>
          <Pie options={piePlanOptions} data={pieDataPlan} />
          <Pie options={pieDoneOptions} data={pieDataDone} />
        </div>
      </Grid>
      <Grid sm={3} xs={12} style={{ width: '100%', height: 'auto', margin: 'auto' }}>
        <Selecte
          startDate={pieStartDate}
          aggregationType={pieAggregationType}
          onChangeDate={(e) => {
            setPieStartDate(e)
            dispatch(setPieGraph(e, pieAggregationType, location.href.split('/')[4]))
            localStorage.setItem("pieStartDate",e)
            localStorage.setItem("pieAggregationType",pieAggregationType)
          }}
          onChangeSelect={(e) => {
            setPieAggregationType(e.target.value)
            dispatch(setPieGraph(pieStartDate, e.target.value, location.href.split('/')[4]))
            localStorage.setItem("pieStartDate",pieStartDate.toString())
            localStorage.setItem("pieAggregationType",e.target.value)
          }}
          onClick={(e) => {
            console.log(e)
          }}
        />
      </Grid>
      <Grid sm={12} xs={12} style={{ width: '100%', height: 'auto' }}>
        <div className="" style={{ width: '100%', height: 'auto' }}>
          <SubjectAnalysisTable
            totalPlanTime={totalPlanTime}
            totalDoneTime={totalDoneTime}
            achievementRate={Math.floor((totalDoneTime / totalPlanTime) * 100 + 0.5)}
            maxTime={max}
            minTime={min}
            average={average}
            mode={mode}
            standardDeviation={standardDeviation}
          />
        </div>
      </Grid>
    </Grid>
  )
}

{
  /* <div className="">
<p>総計画(時) ：{totalPlanTime}</p>
<p>総学習（時）：{totalDoneTime}</p>
<p>達成率（％）：{Math.floor((totalDoneTime / totalPlanTime) * 100 + 0.5)}</p>
<p>最大値:</p>
<p>最小値:</p>
<p>平均値:</p>
<p>近似値</p>
<p>標準偏差</p>
</div> */
}
// <div className="">
//           <DatePicker
//             selected={pieStartDate}
//             onChange={(e) => {
//               setPieStartDate(e)
//               dispatch(setPieGraph(e, pieAggregationType, location.href.split('/')[4]))
//             }}
//             dateFormat="yyyy年MM月dd日 "
//             maxDate={new Date()}
//             minDate={new Date(2020, 3)}
//             locale="ja"
//           />
//           <select
//             className="ui dropdown"
//             name="dropdown"
//             value={pieAggregationType}
//             onChange={(e) => {
//               setPieAggregationType(e.target.value)
//               dispatch(setPieGraph(pieStartDate, e.target.value, location.href.split('/')[4]))
//             }}
//           >
//             <option value="year">年で集計</option>
//             <option value="6months">6ヶ月で集計</option>
//             <option value="3months">３ヶ月で集計</option>
//             <option value="month">1ヶ月で集計</option>
//             <option value="week" selected>
//               １週間で集計
//             </option>
//             <option value="day">1日で集計</option>
//           </select>
//         </div>
//         <div className="">
//           <IconButton style={{ background: '#3f51b5' }}>
//             <ZoomOutMapIcon />
//           </IconButton>
//         </div>
