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
  },
  learns:{
    nextTasks:[],
    previousTask:[],
    searchTasks:[]
  },
  draftLearns:{
    nextTasks:[],
    previousTask:[],
    searchTasks:[]
  }
}
