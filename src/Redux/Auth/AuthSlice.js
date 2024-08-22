import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isStudent:localStorage.getItem('isStudent')?localStorage.getItem('isStudent'):false,
    isTeacher:localStorage.getItem('isTeacher')?localStorage.getItem('isTeacher'):false,
    classes:[],
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
    user:localStorage.getItem('user')?localStorage.getItem('user'):null,
    isVerified:localStorage.getItem('isVerified')?localStorage.getItem('isVerified'):false
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       loginTeacher:(state,action)=>{
            localStorage.clear();
            localStorage.setItem('isTeacher',true);
            localStorage.setItem('isStudent',false);
            localStorage.setItem('classes',action.payload.classes);
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user',action.payload.user);
            localStorage.setItem('isVerified',action.payload.isVerified);
            state.isTeacher=true;
            state.isStudent=false;
            state.classes=action.payload.classes;
            state.token=action.payload.token;
            state.user=action.payload.user;
            state.isVerified=action.payload.isVerified;
       },
       registerTeacher:(state,action)=>{
        localStorage.clear();
            localStorage.setItem('isTeacher',true);
            localStorage.setItem('isStudent',false);
            localStorage.setItem('classes',action.payload.classes);
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user',action.payload.user);
            localStorage.setItem('isVerified',action.payload.isVerified);
            state.isTeacher=true;
            state.isStudent=false;
            state.classes=action.payload.classes;
            state.token=action.payload.token;
            state.user=action.payload.user;
            state.isVerified=action.payload.isVerified;
       },
      loginStudent:(state,action)=>{
        localStorage.clear();
                localStorage.setItem('isTeacher',false);
                localStorage.setItem('isStudent',true);
                localStorage.setItem('classes',action.payload.classes);
                localStorage.setItem('token',action.payload.token);
                localStorage.setItem('user',action.payload.user);
                localStorage.setItem('isVerified',action.payload.isVerified);
                state.isTeacher=false;
                state.isStudent=true;
                state.classes=action.payload.classes;
                state.token=action.payload.token;
                state.user=action.payload.user;
                state.isVerified=action.payload.isVerified;
         },
      registerStudent:(state,action)=>{
        localStorage.clear();
                    localStorage.setItem('isTeacher',false);
                    localStorage.setItem('isStudent',true);
                    localStorage.setItem('classes',action.payload.classes);
                    localStorage.setItem('token',action.payload.token);
                    localStorage.setItem('user',action.payload.user);
                    localStorage.setItem('isVerified',action.payload.isVerified);
                    state.isTeacher=false;
                    state.isStudent=true;
                    state.classes=action.payload.classes;
                    state.token=action.payload.token;
                    state.user=action.payload.user;
                    state.isVerified=action.payload.isVerified;
            },
      logout:(state)=>{
                localStorage.clear();
                state.isTeacher=false;
                state.isStudent=false;
                state.classes=null;
                state.token=null;
                state.user=null;
            },
      updateClasses:(state,action)=>{
        localStorage.setItem('classes',action.payload);
        state.classes=action.payload;
      }
    },

});

export const {loginTeacher,registerTeacher,loginStudent,registerStudent,logout} = AuthSlice.actions;
export default AuthSlice.reducer;