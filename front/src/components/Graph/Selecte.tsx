import React from 'react'
import 'chart.piecelabel.js'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'
import { makeStyles } from '@material-ui/core/styles'
registerLocale('ja', ja)
import '../../assets/date.css'

const useStyles = makeStyles((theme) => ({
  select: {
    height: '30px',
    marginTop: '20px',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}))

type Props = {
  startDate: Date
  aggregationType: string
  onChangeDate: (e: any) => void
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClick: (e: any) => void
}

export const Selecte = (props: Props) => {
  const { startDate, aggregationType, onChangeDate, onChangeSelect, onClick } = props
  const classes = useStyles()
  return (
    <div
      className=""
      style={{
        // padding:"20px 0"
        padding: '40px 0',
      }}
    >
      <div className="" style={{ textAlign: 'center', width: '100%' }}>
        <div className="">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            dateFormat="yyyy年MM月dd日 "
            maxDate={new Date()}
            minDate={new Date(2020, 3)}
            locale="ja"
          />
        </div>
        <div className="">
          <select
            className={classes.select}
            name="dropdown"
            value={aggregationType}
            onChange={onChangeSelect}
            // style={{marginTop:"20px"}}
          >
            <option value="year">年で集計</option>
            <option value="6months">6ヶ月で集計</option>
            <option value="3months">３ヶ月で集計</option>
            <option value="month">1ヶ月で集計</option>
            <option value="week" selected>
              １週間で集計
            </option>
            <option value="day">1日で集計</option>
          </select>
        </div>
      </div>
    </div>
  )
}
