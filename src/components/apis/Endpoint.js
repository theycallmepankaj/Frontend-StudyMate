export const  BASE_URL = "http://localhost:3000"
export default {
    SIGN_UP: BASE_URL+"/user",
    SIGN_IN: BASE_URL+"/user/authenticate",
    USER_FATCH: BASE_URL+"/user",
    GET_ASSIGNMENT: BASE_URL+"/student/assignments",
    ASK_QUESTIONS: BASE_URL+"/student/doubts",
    UPDATE_FILE: BASE_URL+"/user/profile",  //use for PATCH for update 
    CREATE_PROFILE: BASE_URL+"/user/profile", // use for Post for create profile
    FILE_BASE_URL: BASE_URL + "/public/profile",
    UPLOAD_PROFILE: BASE_URL + "/user/profile",
    GET_DOUBTS: BASE_URL + "/student/doubts",
    GET_NOTES: BASE_URL + "/student/getallnote",
    GET_STU_DOUBTS: BASE_URL + "/teacher/doubts",
    CREATE_ASSIGNMENT: BASE_URL + "/teacher/assignments",
    LOGOUT:BASE_URL+"/user/logout",
    SUBMIT_ASSIGNMENT:BASE_URL+"/student",
    UPLOAD_NOTES:BASE_URL+"/teacher/notes",
    POST_ANNOUNCEMENT:BASE_URL+"/teacher/announcements",
    GET_ANNOUNCEMENT:BASE_URL+"/student/announcements",
    DOUBT_RESPONSE:BASE_URL+"/teacher/doubtResponse",
    DELETE_DOUBT:BASE_URL+"/student",
    DELETE_ANNOUNCEMENT:BASE_URL+"/teacher",
    TEACHER_ASSIGNMENT_STATS: "http://localhost:3000/teacher/submissions-stats",
    DELETE_ASSIGNMENT: "http://localhost:3000/teacher/assigment"
}