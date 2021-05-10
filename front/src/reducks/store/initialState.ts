export const initialState ={
  user:{
    id: null,
    name:"",
    email:"",
    avatar:"",
    admin:false,
    client:null,
    token:null,
    uid:"",
    actived:false,
    followings:[],
    followers:[],
  },
  learns:{
    nextTasks:[],
    previousTasks:[],
    searchTasks:[]
  },
  draftLearns:{
    nextTasks:[],
    previousTasks:[],
    searchTasks:[]
  }
}
